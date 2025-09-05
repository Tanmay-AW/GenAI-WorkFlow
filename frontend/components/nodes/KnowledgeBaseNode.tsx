import React from 'react';
import type { NodeProps } from 'reactflow';
import { CustomNodeWrapper } from './CustomNodeWrapper';
import type { KnowledgeBaseData } from '../../types';

const KnowledgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

export const KnowledgeBaseNode: React.FC<NodeProps<KnowledgeBaseData & { onChange: (id: string, data: Partial<KnowledgeBaseData>) => void; }>> = ({ id, data }) => {
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
                ✕
              </button>
            </div>
          ) : (
            <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <input type="file" id={`file-upload-${id}`} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <label htmlFor={`file-upload-${id}`} className="cursor-pointer">
                <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
      </div>
    </CustomNodeWrapper>
  );
};
