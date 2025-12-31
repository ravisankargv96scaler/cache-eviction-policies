import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Block } from './Block';
import { CacheItem } from '../types';
import { MousePointerClick, RotateCcw } from 'lucide-react';

export const TabLRU: React.FC = () => {
  const [items, setItems] = useState<CacheItem[]>([]);

  // Helper to visually update item status
  const updateStatus = (id: string, status: CacheItem['type']) => {
      setItems(prev => prev.map(i => i.id === id ? { ...i, type: status } : i));
  };

  const accessItem = (val: string) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.value === val);
      
      // CASE 1: HIT (Item exists)
      if (existingIndex !== -1) {
        const item = prev[existingIndex];
        // Move to end (Hot)
        const others = prev.filter(i => i.id !== item.id);
        
        // Reset others to cold/default, make this one hot
        const cooledOthers = others.map(i => ({...i, type: 'cold' as const}));
        return [...cooledOthers, { ...item, type: 'hot' }];
      }

      // CASE 2: MISS (New Item)
      const newItem: CacheItem = { id: `lru-${val}-${Date.now()}`, value: val, type: 'new' };
      
      let newArr = [...prev];
      if (newArr.length >= 3) {
        // Remove first (LRU)
        newArr.shift();
      }
      
      // Cool down existing items, add new one
      const cooledArr = newArr.map(i => ({...i, type: 'cold' as const}));
      return [...cooledArr, newItem];
    });
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto p-4">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700 w-full">
        <h3 className="text-xl font-bold mb-4 text-blue-400">LRU (Least Recently Used)</h3>
        <p className="text-slate-300 mb-6">
          The industry standard. If you use it, you keep it. Used items move to the "Most Recent" spot. Unused items drift to the left and eventually fall off.
        </p>

        <div className="flex justify-between w-full px-8 text-xs font-mono text-slate-500 mb-2">
            <span>LEAST RECENT (Cold)</span>
            <span>MOST RECENT (Hot)</span>
        </div>

        {/* Cache Container */}
        <div className="relative bg-slate-900/50 p-8 rounded-2xl border-2 border-dashed border-slate-600 flex justify-start gap-4 min-h-[180px] items-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <Block 
                key={item.id} 
                item={item} 
              />
            ))}
          </AnimatePresence>
           {items.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-slate-600">Cache Empty</div>}
        </div>

        {/* Controls */}
        <div className="grid grid-cols-4 gap-4 mt-8">
            {['A', 'B', 'C', 'D'].map(val => (
                <button
                    key={val}
                    onClick={() => accessItem(val)}
                    className="flex flex-col items-center justify-center gap-2 bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-200 font-bold py-3 px-2 rounded-lg transition-colors active:scale-95"
                >
                    <span className="text-sm font-normal opacity-75">Access</span>
                    <span className="text-xl">{val}</span>
                </button>
            ))}
             <button
                onClick={() => setItems([])}
                className="col-span-4 mt-2 flex justify-center items-center gap-2 text-sm text-slate-500 hover:text-white"
            >
                <RotateCcw size={14} /> Reset Cache
            </button>
        </div>
      </div>
    </div>
  );
};