import React from 'react';
import type { NodeProps } from 'reactflow';
import { CustomNodeWrapper } from './CustomNodeWrapper';
import type { LlmData } from '../../types';

const LlmIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806.547a2 2 0 00.547-1.806zM15 4.5a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const LLMNode: React.FC<NodeProps<LlmData & { onChange: (id: string, data: Partial<LlmData>) => void; }>> = ({ id, data }) => {
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
            <option value="gemini-1.5-flash">Gemini 1.5 Flash (active)</option>
            <option value="gpt-4o-mini">GPT 4o-Mini (demo)</option>
            <option value="gpt-4">GPT 4 (demo)</option>
          </select>
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
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>
    </CustomNodeWrapper>
  );
};
