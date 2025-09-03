from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models import Workflow

router = APIRouter()

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.post("/create")
async def create_workflow(name: str, definition: dict, db: AsyncSession = Depends(get_db)):
    wf = Workflow(name=name, definition=definition)
    db.add(wf)
    await db.commit()
    await db.refresh(wf)
    return {"id": wf.id, "name": wf.name}

@router.get("/{workflow_id}")
async def get_workflow(workflow_id: int, db: AsyncSession = Depends(get_db)):
    wf = await db.get(Workflow, workflow_id)
    if wf is None:
        return {"error": "Workflow not found"}
    return {"id": wf.id, "name": wf.name, "definition": wf.definition}