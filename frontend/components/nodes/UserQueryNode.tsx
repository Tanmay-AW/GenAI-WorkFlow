// frontend/components/nodes/UserQueryNode.tsx
import React from 'react';
import type { NodeProps } from 'reactflow';
import { CustomNodeWrapper } from './CustomNodeWrapper';
import type { UserQueryData } from '../../types';

const InputIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

export const UserQueryNode: React.FC<NodeProps<UserQueryData & { onChange: (id: string, data: Partial<UserQueryData>) => void; }>> = ({ id, data }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    data.onChange(id, { query: e.target.value });
  };

  return (
    <CustomNodeWrapper title="User Query" icon={<InputIcon />} hasInput={false}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">Enter your query</label>
        <textarea
          value={data.query || ""}
          onChange={handleChange}
          rows={3}
          placeholder="e.g. Summarize the uploaded PDF"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>
    </CustomNodeWrapper>
  );
};
