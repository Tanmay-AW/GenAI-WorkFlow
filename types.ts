
import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';

export enum NodeType {
    USER_QUERY = 'userQuery',
    LLM = 'llm',
    KNOWLEDGE_BASE = 'knowledgeBase',
    OUTPUT = 'output',
}

export interface UserQueryData {
    query: string;
}

export interface KnowledgeBaseData {
    fileName: string | null;
    embeddingModel: string;
    apiKey: string;
}

export interface LlmData {
    model: string;
    apiKey: string;
    prompt: string;
    temperature: number;
    useWebSearch: boolean;
    serpApiKey: string;
}

export interface OutputData {
    outputText: string;
}

export type CustomNodeData = UserQueryData | KnowledgeBaseData | LlmData | OutputData;
export type CustomNode = Node<CustomNodeData, NodeType>;

export interface Stack {
    id: string;
    name: string;
    description: string;
    nodes: CustomNode[];
    edges: Edge[];
}

export interface StoreState {
    nodes: CustomNode[];
    edges: Edge[];
    setNodes: (nodes: CustomNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (node: CustomNode) => void;
    updateNodeData: <T extends CustomNodeData>(nodeId: string, data: Partial<T>) => void;
}
