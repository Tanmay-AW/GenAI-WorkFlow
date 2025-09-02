
import React, { useState } from 'react';
import type { NodeProps } from 'reactflow';
import { CustomNodeWrapper } from './CustomNodeWrapper';
import type { LlmData } from '../../types';

const LlmIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 00-.547-1.806zM15 4.5a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


// FIX: Correct the type definition for NodeProps. The generic type should be the data type itself, not an object wrapping it. This makes properties on `data` accessible.
export const LLMNode: React.FC<NodeProps<LlmData & { onChange: (id: string, data: Partial<LlmData>) => void; }>> = ({ id, data }) => {
    const [showApiKey, setShowApiKey] = useState(false);
    const [showSerpApiKey, setShowSerpApiKey] = useState(false);

    return (
        <CustomNodeWrapper title="LLM (Gemini)" icon={<LlmIcon />}>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Model</label>
                    <select
                        value={data.model}
                        onChange={(e) => data.onChange(id, { model: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                        <option value="gpt-4o-mini">GPT 4o-Mini</option>
                        <option value="gpt-4">GPT 4</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">API Key</label>
                     <div className="relative">
                        <input
                            type={showApiKey ? 'text' : 'password'}
                            value={data.apiKey}
                            onChange={(e) => data.onChange(id, { apiKey: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                         <button onClick={() => setShowApiKey(!showApiKey)} className="absolute inset-y-0 right-0 px-3 text-gray-500">
                             {showApiKey ? 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                             }
                        </button>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Prompt</label>
                    <textarea
                        value={data.prompt}
                        onChange={(e) => data.onChange(id, { prompt: e.target.value })}
                        rows={4}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="e.g. You are a helpful PDF assistant..."
                    />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Temperature</label>
                    <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="1"
                        value={data.temperature}
                        onChange={(e) => data.onChange(id, { temperature: parseFloat(e.target.value) })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">WebSearch Tool</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={data.useWebSearch} onChange={(e) => data.onChange(id, { useWebSearch: e.target.checked })} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                {data.useWebSearch && (
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">SERP API</label>
                         <div className="relative">
                            <input
                                type={showSerpApiKey ? 'text' : 'password'}
                                value={data.serpApiKey}
                                onChange={(e) => data.onChange(id, { serpApiKey: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                             <button onClick={() => setShowSerpApiKey(!showSerpApiKey)} className="absolute inset-y-0 right-0 px-3 text-gray-500">
                                {showSerpApiKey ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                }
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </CustomNodeWrapper>
    );
};
