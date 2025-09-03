from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models import ChatLog

router = APIRouter()

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.post("/log")
async def log_chat(workflow_id: int, user_query: str, response: str, db: AsyncSession = Depends(get_db)):
    log = ChatLog(workflow_id=workflow_id, user_query=user_query, response=response)
    db.add(log)
    await db.commit()
    await db.refresh(log)
    return {"id": log.id}