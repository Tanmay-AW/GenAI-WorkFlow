
import React, { DragEvent } from 'react';
import { COMPONENT_DEFINITIONS } from '../constants';
import type { NodeType } from '../types';

interface DraggableItemProps {
    type: NodeType;
    label: string;
    icon: React.ReactNode;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type, label, icon }) => {
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            onDragStart={(event) => onDragStart(event, type)}
            draggable
            className="flex items-center p-3 mb-2 bg-white border border-gray-200 rounded-md cursor-grab hover:shadow-md hover:border-blue-400 transition-all"
        >
            {icon}
            <span className="font-medium text-gray-700">{label}</span>
            <div className="ml-auto text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
        </div>
    );
};

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-72 bg-gray-100 p-4 border-r border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Components</h2>
            <div>
                {COMPONENT_DEFINITIONS.map(def => (
                    <DraggableItem key={def.type} type={def.type} label={def.label} icon={def.icon} />
                ))}
            </div>
        </aside>
    );
};
