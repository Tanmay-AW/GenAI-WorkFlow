# AI Workflow Builder (Assignment Submission)

## Overview
This project is a workflow builder inspired by tools like Make.com.  
It allows users to:
- Create stacks (nodes)
- Upload documents
- Query LLMs
- Manage workflows in the backend

The UI is being built in React + TypeScript, and the backend uses FastAPI + PostgreSQL + SQLAlchemy.

---

## ✅ Current Progress
- **Backend**
  - Workflow creation and retrieval (`/workflow/create`, `/workflow/{id}`)
  - LLM query endpoint (`/llm/query`)
  - Document upload and text extraction from PDFs
- **Frontend**
  - Dashboard with stack creation
  - “Run Pipeline” button integrated (frontend wiring to backend API)
  - UI components for stacks and workflows

---

## 🔄 Work in Progress
- Final pipeline runner logic (sequential node execution like Make.com)
- UI polish: centralized pipeline run button, workflow visualization
- Enhanced error handling and status messages

---

## 🚀 Next Steps
- Connect frontend Run Pipeline button to backend `/pipeline/run`
- Implement dynamic pipeline runner (based on JSON definition of nodes)
- Final design polish (Figma alignment, responsive UI)

---

## How to Run

### In Bash terminal

**For Backend**

cd backend
uvicorn main:app --reload

**For Frontend**

cd frontend
npm install
npm start
