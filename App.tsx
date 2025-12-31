import React, { useState } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { TabProblem } from './components/TabProblem';
import { TabFIFO } from './components/TabFIFO';
import { TabLRU } from './components/TabLRU';
import { TabLFU } from './components/TabLFU';
import { TabEdgeCases } from './components/TabEdgeCases';
import { TabQuiz } from './components/TabQuiz';
import { TabConfig, TabId } from './types';
import { Cpu } from 'lucide-react';

const TABS: TabConfig[] = [
  { id: 'problem', label: '1. The Problem', title: 'Why do we need policies?', description: 'Cache is fast but small. When it fills up, we have a hard decision to make.' },
  { id: 'fifo', label: '2. FIFO', title: 'First-In, First-Out', description: 'The simplest approach. Oldest data gets evicted first, regardless of importance.' },
  { id: 'lru', label: '3. LRU', title: 'Least Recently Used', description: 'The gold standard. Keeps items you are actually using. Discards the neglected ones.' },
  { id: 'lfu', label: '4. LFU', title: 'Least Frequently Used', description: 'Counts usage. Good for stable data, but can be tricky with changing patterns.' },
  { id: 'edge', label: '5. Edge Cases', title: 'MRU & LIFO', description: 'Specialized policies for specific access patterns like cyclic scans or stacks.' },
  { id: 'quiz', label: '6. Quiz', title: 'Test Your Knowledge', description: 'See if you can identify the right policy for the job.' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('problem');

  const activeConfig = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                <Cpu size={32} className="text-white" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Cache Eviction Visualizer
                </h1>
                <p className="text-slate-400 text-sm">Interactive System Design Learning</p>
            </div>
        </div>
      </header>

      {/* Navigation */}
      <TabNavigation tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2">{activeConfig.title}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">{activeConfig.description}</p>
        </div>

        <div className="min-h-[400px]">
            {activeTab === 'problem' && <TabProblem />}
            {activeTab === 'fifo' && <TabFIFO />}
            {activeTab === 'lru' && <TabLRU />}
            {activeTab === 'lfu' && <TabLFU />}
            {activeTab === 'edge' && <TabEdgeCases />}
            {activeTab === 'quiz' && <TabQuiz />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-600 text-sm">
        <p>Built with React, Tailwind & Framer Motion</p>
      </footer>
    </div>
  );
};

export default App;