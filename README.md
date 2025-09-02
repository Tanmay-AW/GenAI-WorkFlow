# Intelligent Workflow Builder

A No-Code/Low-Code web application that enables users to visually create and interact with intelligent workflows. The application allows users to configure a flow of components that handle user input, extract knowledge from documents, interact with language models, and return answers through a chat interface.

## Features

- Drag-and-drop interface for building workflows
- Four core components: User Query, KnowledgeBase, LLM Engine, and Output
- Document processing and embedding generation
- Integration with OpenAI GPT and Gemini models
- Web search capabilities via SerpAPI or Brave
- Chat interface for interacting with workflows

## Tech Stack

- **Frontend**: React.js with React Flow for drag-and-drop functionality
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Vector Store**: ChromaDB
- **Embedding Models**: OpenAI Embeddings, Gemini embeddings
- **LLMs**: OpenAI GPT, Gemini
- **Web Search**: SerpAPI, Brave
- **Text Extraction**: PyMuPDF

## Project Structure

```
├── frontend/                # React frontend application
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── store/          # State management
│   │   ├── styles/         # CSS styles
│   │   └── utils/          # Utility functions
│   ├── package.json        # Frontend dependencies
│   └── README.md           # Frontend documentation
├── backend/                # FastAPI backend application
│   ├── app/                # Application code
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── db/             # Database models and connections
│   │   ├── services/       # Business logic services
│   │   └── utils/          # Utility functions
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend documentation
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Main project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- PostgreSQL
- Docker (optional)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a .env file with the following variables:
   ```
   DATABASE_URL=postgresql://postgres:password@localhost/workflow_builder
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_api_key
   SERPAPI_API_KEY=your_serpapi_api_key
   ```

6. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

5. Set up environment variables (create a .env file in the backend directory):
   ```
   DATABASE_URL=postgresql://username:password@localhost/dbname
   OPENAI_API_KEY=your_openai_api_key
   SERPAPI_API_KEY=your_serpapi_api_key
   ```

6. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Database Setup

1. Create a PostgreSQL database:
   ```bash
   createdb dbname
   ```

2. The backend will handle migrations automatically on startup.

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Use the Component Library Panel to drag components onto the workspace
3. Connect components to create a workflow
4. Configure each component using the Configuration Panel
5. Click "Build Stack" to validate and prepare the workflow
6. Click "Chat with Stack" to open the chat interface and start asking questions

## Architecture

### Frontend Components

- **Component Library Panel**: Lists available components
- **Workspace Panel**: Canvas for building workflows
- **Component Configuration Panel**: Dynamic configuration options
- **Execution Controls**: Build and chat with the workflow

### Backend Services

- **Document Processing**: Extracts text from documents
- **Embedding Generation**: Creates vector embeddings
- **Vector Storage**: Stores and retrieves embeddings
- **LLM Integration**: Communicates with language models
- **Web Search**: Retrieves information from the web
- **Workflow Orchestration**: Manages the flow of data between components

## License

MIT