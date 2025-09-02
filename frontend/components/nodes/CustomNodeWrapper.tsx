
import React from 'react';
import { Handle, Position } from 'reactflow';
import { cn } from '../../lib/utils';

interface CustomNodeWrapperProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    hasInput?: boolean;
    hasOutput?: boolean;
    className?: string;
}

export const CustomNodeWrapper: React.FC<CustomNodeWrapperProps> = ({
    title,
    icon,
    children,
    hasInput = true,
    hasOutput = true,
    className
}) => {
    return (
        <div className={cn("bg-white border-2 border-gray-300 rounded-lg shadow-md w-80", className)}>
            {hasInput && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className="!bg-blue-500"
                    style={{ width: '10px', height: '10px' }}
                />
            )}
            <div className="flex items-center p-3 border-b border-gray-200">
                {icon}
                <h3 className="font-semibold text-gray-700 ml-2">{title}</h3>
                <div className="ml-auto text-gray-400 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
            </div>
            <div className="p-4 bg-gray-50/50">
                {children}
            </div>
            {hasOutput && (
                <Handle
                    type="source"
                    position={Position.Right}
                    className="!bg-green-500"
                    style={{ width: '10px', height: '10px' }}
                />
            )}
        </div>
    );
};
