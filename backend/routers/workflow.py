from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models import Workflow, Document
from utils.gemini import run_gemini_query

router = APIRouter()

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.post("/run")
async def run_workflow(query: str, workflow_id: int, db: AsyncSession = Depends(get_db)):
    # 1. Load workflow definition
    wf = await db.get(Workflow, workflow_id)
    if wf is None:
        return {"error": "Workflow not found"}

    # 2. Fetch last uploaded document
    result = await db.execute("SELECT metadata FROM documents ORDER BY id DESC LIMIT 1")
    row = result.first()
    context = row[0].get("text") if row else ""

    # 3. Run LLM with query + context
    response = await run_gemini_query(query=query, context=context, prompt=wf.definition.get("prompt", ""))

    return {
        "query": query,
        "context_length": len(context),
        "response": response
    }
