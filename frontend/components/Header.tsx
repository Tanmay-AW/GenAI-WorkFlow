
import React from 'react';

interface HeaderProps {
    stackName?: string;
    isEditorView: boolean;
    onSave: () => void;
    onLogoClick: () => void;
}

const Logo = () => (
    <div className="flex items-center space-x-2">
        <div className="bg-green-500 p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.005 18h2.242a3 3 0 002.864-2.288l1.414-4.242a3 3 0 00-2.243-3.693l-4.242-1.414A3 3 0 009.88 9.88l-1.414 4.242A3 3 0 0010.75 17h-2.242a3 3 0 00-2.864 2.288l-1.414 4.242a3 3 0 002.243 3.693l4.242 1.414A3 3 0 0015.12 20.12l1.414-4.242A3 3 0 0013.25 13h2.242a3 3 0 002.864-2.288L18 6" />
            </svg>
        </div>
        <span className="font-bold text-xl text-gray-800">GenAI Stack</span>
    </div>
);

export const Header: React.FC<HeaderProps> = ({ stackName, isEditorView, onSave, onLogoClick }) => {
    return (
        <header className="flex items-center justify-between p-3 border-b bg-white z-10">
            <div className="flex items-center space-x-4">
                <button onClick={onLogoClick} className="cursor-pointer">
                    <Logo />
                </button>
                {isEditorView && stackName && (
                    <>
                        <span className="text-gray-300">/</span>
                        <h1 className="text-lg font-semibold text-gray-700">{stackName}</h1>
                    </>
                )}
            </div>
            <div className="flex items-center space-x-4">
                {isEditorView && (
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                        Save
                    </button>
                )}
                <div className="h-9 w-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    S
                </div>
            </div>
        </header>
    );
};
