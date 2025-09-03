import os
import httpx

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

async def run_gemini_query(query: str, context: str = "", prompt: str = ""):
    # Example Gemini 1.5 API call (update as per your endpoint spec)
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
    data = {
        "contents": [
            {"role": "user", "parts": [{"text": prompt + "\n" + context + "\n" + query}]}
        ],
        "generationConfig": {"temperature": 0.7}
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=data, headers=headers)
        resp.raise_for_status()
        result = resp.json()
        return result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")