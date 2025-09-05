from fastapi import APIRouter
from pydantic import BaseModel
from utils.gemini import run_gemini_query

router = APIRouter()

class LLMQueryRequest(BaseModel):
	query: str
	context: str = ""
	prompt: str = ""

@router.post("/query")
async def llm_query(request: LLMQueryRequest):
	result = await run_gemini_query(query=request.query, context=request.context, prompt=request.prompt)
	return {"response": result}