import React, { useState, useCallback, useRef, DragEvent } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, Background, Controls, MiniMap, useNodesState, useEdgesState, Connection, Edge, Node } from 'reactflow';
import { Sidebar } from './Sidebar';
import { ChatModal } from './ChatModal';
import { UserQueryNode } from './nodes/UserQueryNode';
import { LLMNode } from './nodes/LLMNode';
import { KnowledgeBaseNode } from './nodes/KnowledgeBaseNode';
import { OutputNode } from './nodes/OutputNode';
import type { Stack, CustomNode, NodeType as CustomNodeType } from '../types';
import { produce } from 'immer';

const nodeTypes = {
    userQuery: UserQueryNode,
    llm: LLMNode,
    knowledgeBase: KnowledgeBaseNode,
    output: OutputNode,
};

const initialNodeData = {
    userQuery: { query: '' },
    knowledgeBase: { fileName: null, embeddingModel: 'text-embedding-3-large', apiKey: '' },
    llm: { model: 'gemini-2.5-flash', apiKey: '', prompt: 'You are a helpful AI assistant.', temperature: 0.75, useWebSearch: false, serpApiKey: '' },
    output: { outputText: 'Output will be generated based on query' },
};

interface EditorProps {
    stack: Stack;
    onStackChange: (stack: Stack) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ stack, onStackChange }) => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(stack.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(stack.edges);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    
    const updateParentStack = useCallback((newNodes, newEdges) => {
        const nextState = produce(stack, draft => {
            draft.nodes = newNodes;
            draft.edges = newEdges;
        });
        onStackChange(nextState);
    }, [stack, onStackChange]);

    const onConnect = useCallback((params: Connection | Edge) => {
        const newEdge = addEdge(params, edges);
        setEdges(newEdge);
        updateParentStack(nodes, newEdge);
    }, [nodes, edges, setEdges, updateParentStack]);

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event: DragEvent) => {
        event.preventDefault();

        if (!reactFlowWrapper.current || !reactFlowInstance) return;

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow') as CustomNodeType;

        if (typeof type === 'undefined' || !type) return;

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode: CustomNode = {
            id: `${type}-${Date.now()}`,
            type,
            position,
            data: initialNodeData[type],
        };
        
        const newNodes = nodes.concat(newNode);
        setNodes(newNodes);
        updateParentStack(newNodes, edges);
    }, [reactFlowInstance, nodes, edges, setNodes, updateParentStack]);

    const onNodeDataChange = useCallback((nodeId: string, data: any) => {
        const newNodes = nodes.map(n => n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n);
        setNodes(newNodes);
        updateParentStack(newNodes, edges);
    }, [nodes, edges, setNodes, updateParentStack]);
    
    const memoizedNodes = React.useMemo(() => {
        return nodes.map(node => ({
            ...node,
            data: {
                ...node.data,
                onChange: onNodeDataChange,
            }
        }));
    }, [nodes, onNodeDataChange]);

    return (
        <div className="flex h-full" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={memoizedNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
            <button
                onClick={() => setIsChatOpen(true)}
                className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition-colors"
            >
                Chat with Stack
            </button>
            {isChatOpen && (
                <ChatModal
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    stack={stack}
                />
            )}
        </div>
    );
};

export const Editor: React.FC<EditorProps> = ({ stack, onStackChange }) => {
    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="flex-grow h-full relative">
                <ReactFlowProvider>
                    <EditorComponent stack={stack} onStackChange={onStackChange} />
                </ReactFlowProvider>
            </div>
        </div>
    );
};