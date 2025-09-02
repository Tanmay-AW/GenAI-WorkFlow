
import React from 'react';
import type { Stack } from '../types';

interface StackCardProps {
    stack: Stack;
    onEdit: (id: string) => void;
}

const StackCard: React.FC<StackCardProps> = ({ stack, onEdit }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col justify-between">
        <div>
            <h3 className="font-semibold text-gray-800">{stack.name}</h3>
            <p className="text-gray-500 text-sm mt-1">{stack.description}</p>
        </div>
        <button 
            onClick={() => onEdit(stack.id)}
            className="mt-4 text-sm font-medium text-gray-600 hover:text-gray-900 self-start flex items-center group"
        >
            Edit Stack
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </button>
    </div>
);

const NewStackCard: React.FC<{ onNewStack: () => void }> = ({ onNewStack }) => (
    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-gray-800">Create New Stack</h2>
        <p className="text-gray-500 mt-2 max-w-xs">
            Start building your generative AI apps with our essential tools and frameworks
        </p>
        <button
            onClick={onNewStack}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium flex items-center"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Stack
        </button>
    </div>
);

interface DashboardProps {
    stacks: Stack[];
    onNewStack: () => void;
    onEditStack: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stacks, onNewStack, onEditStack }) => {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Stacks</h1>
                <button
                    onClick={onNewStack}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium flex items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Stack
                </button>
            </div>
            {stacks.length === 0 ? (
                <div className="flex justify-center items-center mt-20">
                    <NewStackCard onNewStack={onNewStack} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stacks.map(stack => (
                        <StackCard key={stack.id} stack={stack} onEdit={onEditStack} />
                    ))}
                </div>
            )}
        </div>
    );
};
