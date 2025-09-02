
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { generateContentStream } from '../services/geminiService';
// FIX: Import LlmData to allow for type casting of node data
import type { Stack, CustomNode, NodeType, LlmData } from '../types';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    stack: Stack;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        U
    </div>
);

const AiIcon = () => (
    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 7H7v6h6V7z" />
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
        </svg>
    </div>
);

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, stack }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: `user-${Date.now()}`, text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const aiMessageId = `ai-${Date.now()}`;
        setMessages(prev => [...prev, { id: aiMessageId, text: '', sender: 'ai' }]);

        // Simulate workflow execution
        const userQueryNode = stack.nodes.find(n => n.type === 'userQuery');
        const llmNode = stack.nodes.find(n => n.type === 'llm');
        
        if (!userQueryNode || !llmNode) {
            setMessages(prev => prev.map(m => m.id === aiMessageId ? {...m, text: "Error: Workflow is not configured correctly. Ensure you have a User Query and an LLM node."} : m));
            setIsLoading(false);
            return;
        }

        // FIX: Cast llmNode.data to LlmData to safely access the 'prompt' property. The 'data' property is a union type and needs to be narrowed.
        const promptTemplate = (llmNode.data as LlmData).prompt || "Answer the following question: {query}";
        const finalPrompt = promptTemplate.replace("{query}", input);
        
        try {
            const stream = generateContentStream(finalPrompt);
            for await (const chunk of stream) {
                setMessages(prev =>
                    prev.map(m => (m.id === aiMessageId ? { ...m, text: m.text + chunk } : m))
                );
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setMessages(prev => prev.map(m => m.id === aiMessageId ? {...m, text: `Error: ${errorMessage}`} : m));
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[70vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <AiIcon />
                        <h2 className="text-lg font-semibold text-gray-800">GenAI Stack Chat</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex-grow p-6 overflow-y-auto space-y-6">
                    {messages.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            <p>Start a conversation to test your stack.</p>
                        </div>
                    ) : (
                        messages.map(message => (
                            <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                {message.sender === 'ai' && <AiIcon />}
                                <div className={`max-w-md p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                                    <p className="whitespace-pre-wrap">{message.text}{isLoading && message.id.startsWith('ai') && message.text.length === 0 ? '...' : ''}</p>
                                </div>
                                {message.sender === 'user' && <UserIcon />}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300" disabled={isLoading || !input.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
