import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import documents, workflow, llm, websearch, chat

app = FastAPI(title="GenAI Workflow Backend")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL for production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include modular routers
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
app.include_router(workflow.router, prefix="/workflow", tags=["Workflow"])
app.include_router(llm.router, prefix="/llm", tags=["LLM"])
app.include_router(websearch.router, prefix="/websearch", tags=["WebSearch"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)