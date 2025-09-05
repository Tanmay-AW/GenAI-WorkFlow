from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models import Document
import shutil
import os
from utils.pdf_extract import extract_text_from_pdf

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.post("/upload")
async def upload_document(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text immediately
    extracted_text = extract_text_from_pdf(file_path)

    doc = Document(filename=file.filename, metadata={"text": extracted_text})
    db.add(doc)
    await db.commit()
    await db.refresh(doc)
    return {"id": doc.id, "filename": file.filename}
