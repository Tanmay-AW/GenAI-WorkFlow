import os
import httpx

SERPAPI_KEY = os.getenv("SERPAPI_KEY")

async def search_web(query: str):
    url = f"https://serpapi.com/search"
    params = {
        "q": query,
        "api_key": SERPAPI_KEY
    }
    async with httpx.AsyncClient() as client:
        resp = await client.get(url, params=params)
        resp.raise_for_status()
        return resp.json()