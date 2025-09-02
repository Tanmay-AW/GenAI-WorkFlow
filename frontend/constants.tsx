
import React from 'react';
import type { Stack } from '../types';
import { NodeType } from '../types';

export const INITIAL_STACKS: Stack[] = [
    {
        id: 'stack-1',
        name: 'Chat With AI',
        description: 'Chat with a smart AI',
        nodes: [],
        edges: [],
    },
    {
        id: 'stack-2',
        name: 'Content Writer',
        description: 'Helps you write content',
        nodes: [],
        edges: [],
    },
    {
        id: 'stack-3',
        name: 'Content Summarizer',
        description: 'Helps you summarize content',
        nodes: [],
        edges: [],
    },
    {
        id: 'stack-4',
        name: 'Information Finder',
        description: 'Helps you find relevant information',
        nodes: [],
        edges: [],
    },
];

const InputIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const LlmIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 00-.547-1.806zM15 4.5a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const KnowledgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

const OutputIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" />
    </svg>
);

export const COMPONENT_DEFINITIONS = [
    { type: NodeType.USER_QUERY, label: 'User Query', icon: <InputIcon /> },
    { type: NodeType.LLM, label: 'LLM (Gemini)', icon: <LlmIcon /> },
    { type: NodeType.KNOWLEDGE_BASE, label: 'Knowledge Base', icon: <KnowledgeIcon /> },
    { type: NodeType.OUTPUT, label: 'Output', icon: <OutputIcon /> },
];
