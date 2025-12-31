import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Block } from './Block';
import { CacheItem } from '../types';
import { ArrowRight, RefreshCw } from 'lucide-react';

export const TabFIFO: React.FC = () => {
  const [items, setItems] = useState<CacheItem[]>([]);
  const [nextValChar, setNextValChar] = useState(65); // ASCII 'A'

  const insertItem = () => {
    const val = String.fromCharCode(nextValChar);
    const newItem: CacheItem = { id: `fifo-${val}-${Date.now()}`, value: val, type: 'new' };

    setItems(prev => {
      // If full, mark first as evicting first (visual trick requires state management complexity, 
      // but for React simplified, we just replace. To show animation, we rely on Layout animations).
      // Actually, to show "red and disappear", we normally need a two-step process.
      // For simplicity in this demo, the leaving item is removed immediately from DOM, 
      // but AnimatePresence handles the exit animation.
      
      let newArr = [...prev];
      if (newArr.length >= 3) {
        // The one leaving is index 0
        newArr.shift(); 
      }
      return [...newArr, newItem];
    });

    setNextValChar(prev => prev + 1);
    
    // Normalize color after entry
    setTimeout(() => {
       setItems(current => current.map(i => i.value === val ? { ...i, type: 'default' } : i));
    }, 800);
  };

  const reset = () => {
      setItems([]);
      setNextValChar(65);
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto p-4">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700 w-full">
        <h3 className="text-xl font-bold mb-4 text-blue-400">FIFO (First-In, First-Out)</h3>
        <p className="text-slate-300 mb-6">
          Like a grocery store queue. The item that has been in the cache the longest is the first to go.
        </p>

        <div className="flex justify-between w-full px-8 text-xs font-mono text-slate-500 mb-2">
            <span>FRONT (Oldest)</span>
            <span>BACK (Newest)</span>
        </div>

        {/* Cache Container */}
        <div className="relative bg-slate-900/50 p-8 rounded-2xl border-2 border-dashed border-slate-600 flex justify-start gap-4 min-h-[180px] items-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <Block 
                key={item.id} 
                item={item} 
              />
            ))}
          </AnimatePresence>
           {items.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-slate-600">Queue Empty</div>}
        </div>

        {/* Controls */}
        <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={insertItem}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Insert Item '{String.fromCharCode(nextValChar)}' <ArrowRight size={18} />
            </button>
            <button
                onClick={reset}
                className="p-3 rounded-lg bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600"
            >
                <RefreshCw size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};