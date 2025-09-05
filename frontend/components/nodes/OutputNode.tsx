import React from 'react';
import type { NodeProps } from 'reactflow';
import { CustomNodeWrapper } from './CustomNodeWrapper';
import type { OutputData } from '../../types';

const OutputIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H3" />
  </svg>
);

export const OutputNode: React.FC<NodeProps<OutputData>> = ({ data }) => {
  return (
    <CustomNodeWrapper title="Output" icon={<OutputIcon />} hasOutput={false}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 block">Output Text</label>
        <p className="text-sm text-gray-600 p-2 bg-gray-100 rounded-md min-h-[60px] whitespace-pre-wrap">
          {data.outputText || "No output yet..."}
        </p>
      </div>
    </CustomNodeWrapper>
  );
};
