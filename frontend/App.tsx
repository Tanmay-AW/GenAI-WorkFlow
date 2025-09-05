import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Editor } from './components/Editor';
import type { Stack } from './types';
import { INITIAL_STACKS } from './constants';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  EDITOR = 'EDITOR',
}

function App() {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [stacks, setStacks] = useState<Stack[]>(INITIAL_STACKS);
  const [activeStack, setActiveStack] = useState<Stack | null>(null);

  const handleCreateNewStack = useCallback(() => {
	const newStack: Stack = {
	  id: `stack-${Date.now()}`,
	  name: 'Untitled Stack',
	  description: 'A new generative AI app',
	  nodes: [],
	  edges: [],
	};
	setActiveStack(newStack);
	setView(AppView.EDITOR);
  }, []);

  const handleEditStack = useCallback((stackId: string) => {
	const stackToEdit = stacks.find(s => s.id === stackId);
	if (stackToEdit) {
	  setActiveStack(stackToEdit);
	  setView(AppView.EDITOR);
	}
  }, [stacks]);

  const handleSaveStack = useCallback((updatedStack: Stack) => {
	setStacks(prevStacks => {
	  const exists = prevStacks.some(s => s.id === updatedStack.id);
	  if (exists) {
		return prevStacks.map(s => s.id === updatedStack.id ? updatedStack : s);
	  }
	  return [...prevStacks, updatedStack];
	});
	setView(AppView.DASHBOARD);
  }, []);

  const navigateToDashboard = useCallback(() => {
	setActiveStack(null);
	setView(AppView.DASHBOARD);
  }, []);

  return (
	<div className="flex flex-col h-screen">
	  <Header
		stackName={activeStack?.name}
		isEditorView={view === AppView.EDITOR}
		onSave={() => activeStack && handleSaveStack(activeStack)}
		onLogoClick={navigateToDashboard}
	  />
	  <main className="flex-grow bg-gray-50">
		{view === AppView.DASHBOARD && (
		  <Dashboard
			stacks={stacks}
			onNewStack={handleCreateNewStack}
			onEditStack={handleEditStack}
		  />
		)}
		{view === AppView.EDITOR && activeStack && (
		  <Editor
			stack={activeStack}
			onStackChange={setActiveStack}
		  />
		)}
	  </main>
	</div>
  );
}

export default App;