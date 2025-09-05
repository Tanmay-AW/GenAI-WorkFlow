import os
import httpx

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

async def run_gemini_query(query: str, context: str = "", prompt: str = "") -> str:
    if not GEMINI_API_KEY:
        raise RuntimeError("Missing GEMINI_API_KEY environment variable")

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        "gemini-1.5-flash:generateContent"
        f"?key={GEMINI_API_KEY}"
    )

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": f"{prompt}\n{context}\n{query}".strip()}
                ],
            }
        ],
        "generationConfig": {"temperature": 0.7},
    }

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(url, json=payload)
        try:
            resp.raise_for_status()
        except httpx.HTTPStatusError as e:
            raise RuntimeError(f"Gemini API error {resp.status_code}: {resp.text}") from e

        data = resp.json()

    try:
        return data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        raise RuntimeError(f"Unexpected Gemini response format: {data}")
