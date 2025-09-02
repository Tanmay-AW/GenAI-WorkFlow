
import React, { useState } from 'react';
import type { NodeProps } from 'reactflow';
import { CustomNodeWrapper } from './CustomNodeWrapper';
import type { KnowledgeBaseData } from '../../types';

const KnowledgeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

// FIX: Correct the type definition for NodeProps. The generic type should be the data type itself, not an object wrapping it. This makes properties on `data` accessible.
export const KnowledgeBaseNode: React.FC<NodeProps<KnowledgeBaseData & { onChange: (id: string, data: Partial<KnowledgeBaseData>) => void; }>> = ({ id, data }) => {
    const [showApiKey, setShowApiKey] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            data.onChange(id, { fileName: event.target.files[0].name });
        }
    };
    
    return (
        <CustomNodeWrapper title="Knowledge Base" icon={<KnowledgeIcon />}>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">File for Knowledge Base</label>
                    {data.fileName ? (
                         <div className="flex items-center justify-between bg-green-50 text-green-800 p-2 rounded-md border border-green-200">
                             <span className="text-sm font-medium">{data.fileName}</span>
                             <button onClick={() => data.onChange(id, { fileName: null })} className="text-green-600 hover:text-green-800">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                             </button>
                         </div>
                    ) : (
                        <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                            <input type="file" id={`file-upload-${id}`} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                            <label htmlFor={`file-upload-${id}`} className="cursor-pointer">
                                <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <span className="mt-1 block text-sm font-medium text-blue-600 hover:text-blue-500">Upload File</span>
                            </label>
                        </div>
                    )}
                </div>
                 <div>
                    <label htmlFor={`embedding-model-${id}`} className="text-sm font-medium text-gray-700 block mb-1">Embedding Model</label>
                    <select
                        id={`embedding-model-${id}`}
                        value={data.embeddingModel}
                        onChange={(e) => data.onChange(id, { embeddingModel: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option>text-embedding-3-large</option>
                        <option>text-embedding-3-small</option>
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
            </div>
        </CustomNodeWrapper>
    );
};
