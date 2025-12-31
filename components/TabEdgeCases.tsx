import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Block } from './Block';
import { CacheItem } from '../types';
import { Play } from 'lucide-react';

export const TabEdgeCases: React.FC = () => {
  const [lifoItems, setLifoItems] = useState<CacheItem[]>([
      {id: '1', value: 'A', type: 'default'},
      {id: '2', value: 'B', type: 'default'},
      {id: '3', value: 'C', type: 'default'}
  ]);
  
  const [mruItems, setMruItems] = useState<CacheItem[]>([
      {id: 'm1', value: 'A', type: 'default'},
      {id: 'm2', value: 'B', type: 'default'},
      {id: 'm3', value: 'C', type: 'hot'} // C was just used
  ]);

  const [simulated, setSimulated] = useState(false);

  const runSimulation = () => {
      if (simulated) {
          // Reset
          setLifoItems([
            {id: '1', value: 'A', type: 'default'},
            {id: '2', value: 'B', type: 'default'},
            {id: '3', value: 'C', type: 'default'}
          ]);
          setMruItems([
            {id: 'm1', value: 'A', type: 'default'},
            {id: 'm2', value: 'B', type: 'default'},
            {id: 'm3', value: 'C', type: 'hot'}
          ]);
          setSimulated(false);
          return;
      }

      setSimulated(true);

      // LIFO Logic: Last In (C) is First Out.
      setLifoItems(prev => {
          const popped = prev.slice(0, 2); // Keep A, B
          return [...popped, {id: '4', value: 'D', type: 'new'}];
      });

      // MRU Logic: C was "Most Recently Used", so it goes first.
      setMruItems(prev => {
          const withoutC = prev.filter(i => i.value !== 'C'); // Remove C
          return [...withoutC, {id: 'm4', value: 'D', type: 'new'}];
      });
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-5xl mx-auto p-4">
        <h3 className="text-2xl font-bold text-blue-400">Edge Cases: Stack vs. MRU</h3>
        
        <div className="grid md:grid-cols-2 gap-8 w-full">
            {/* LIFO Panel */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="bg-purple-500 w-3 h-3 rounded-full"></span>
                    LIFO (Last-In First-Out)
                </h4>
                <p className="text-sm text-slate-400 mb-4 h-10">
                    Behaves like a stack. The newest item added (C) is the first to be evicted when D arrives.
                </p>
                <div className="flex justify-center gap-2 bg-slate-900/50 p-4 rounded-xl min-h-[140px] items-center">
                    <AnimatePresence mode="popLayout">
                        {lifoItems.map(i => <Block key={i.id} item={i} />)}
                    </AnimatePresence>
                </div>
            </div>

            {/* MRU Panel */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="bg-indigo-500 w-3 h-3 rounded-full"></span>
                    MRU (Most Recently Used)
                </h4>
                <p className="text-sm text-slate-400 mb-4 h-10">
                    Evicts the item most recently accessed. C was hot, so C gets cut first. Useful for cyclic scans.
                </p>
                <div className="flex justify-center gap-2 bg-slate-900/50 p-4 rounded-xl min-h-[140px] items-center">
                    <AnimatePresence mode="popLayout">
                         {mruItems.map(i => <Block key={i.id} item={i} />)}
                    </AnimatePresence>
                </div>
            </div>
        </div>

        <button 
            onClick={runSimulation}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
        >
            {simulated ? "Reset Simulation" : "Simulate: Insert 'D'"} <Play size={20} fill="currentColor" />
        </button>
    </div>
  );
};