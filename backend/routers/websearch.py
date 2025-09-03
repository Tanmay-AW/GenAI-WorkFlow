from fastapi import APIRouter
from utils.serpapi import search_web

router = APIRouter()

@router.post("/search")
async def web_search(query: str):
    result = await search_web(query)
    return {"results": result}