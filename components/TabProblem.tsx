import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Block } from './Block';
import { CacheItem } from '../types';
import { AlertTriangle, Plus } from 'lucide-react';

export const TabProblem: React.FC = () => {
  const [items, setItems] = useState<CacheItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addItem = (val: string) => {
    if (items.length >= 3) {
      setError("CACHE FULL! Eviction policy needed.");
      setTimeout(() => setError(null), 2000);
      return;
    }
    const newItem: CacheItem = { id: Date.now().toString(), value: val, type: 'new' };
    setItems(prev => [...prev, newItem]);
    
    // Reset type to default after animation
    setTimeout(() => {
        setItems(prev => prev.map(i => i.id === newItem.id ? { ...i, type: 'default' } : i));
    }, 500);
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto p-4">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700 w-full">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Simulation: The Overflow</h3>
        <p className="text-slate-300 mb-6">
          Try to add more than 3 items to the cache. See what happens when we run out of space without a plan.
        </p>

        {/* Cache Container */}
        <div className="relative bg-slate-900/50 p-8 rounded-2xl border-2 border-dashed border-slate-600 flex justify-center gap-4 min-h-[180px] items-center overflow-hidden">
          <div className="absolute top-2 right-4 text-xs font-mono text-slate-500">
            CAPACITY: 3
          </div>
          
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <Block key={item.id} item={item} />
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="text-slate-600 font-mono text-sm">Cache is Empty</div>
          )}
        </div>

        {/* Error Message */}
        <div className="h-12 mt-4 flex items-center justify-center">
            <AnimatePresence>
                {error && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-red-400 bg-red-900/30 px-4 py-2 rounded-lg border border-red-500/50"
                    >
                        <AlertTriangle size={18} />
                        <span className="font-bold">{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {['A', 'B', 'C', 'D'].map((val) => (
            <button
              key={val}
              onClick={() => addItem(val)}
              className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-95 disabled:opacity-50"
              disabled={!!error}
            >
              <Plus size={16} /> Add {val}
            </button>
          ))}
          <button 
             onClick={() => setItems([])}
             className="col-span-4 mt-2 text-xs text-slate-500 hover:text-white underline"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};