import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Block } from './Block';
import { CacheItem } from '../types';
import { RotateCcw } from 'lucide-react';

const INITIAL_STATE: CacheItem[] = [
  { id: 'lfu-a', value: 'A', count: 5, type: 'default' },
  { id: 'lfu-b', value: 'B', count: 2, type: 'default' },
  { id: 'lfu-c', value: 'C', count: 1, type: 'default' },
];

export const TabLFU: React.FC = () => {
  const [items, setItems] = useState<CacheItem[]>(INITIAL_STATE);

  const accessItem = (val: string) => {
    // Check if exists
    const existingIndex = items.findIndex(i => i.value === val);

    if (existingIndex !== -1) {
      // Update count
      setItems(prev => {
        const newArr = [...prev];
        const item = newArr[existingIndex];
        newArr[existingIndex] = { ...item, count: (item.count || 0) + 1, type: 'hot' };
        return newArr;
      });
      // Reset color shortly after
      setTimeout(() => {
         setItems(prev => prev.map(i => i.value === val ? { ...i, type: 'default' } : i));
      }, 600);
      return;
    }

    // Insert New
    if (items.length >= 3) {
       // Find min count
       const min = Math.min(...items.map(i => i.count || 0));
       const candidateIndex = items.findIndex(i => i.count === min);
       
       // Visualize Eviction first
       setItems(prev => prev.map((item, idx) => idx === candidateIndex ? { ...item, type: 'evicting' } : item));

       setTimeout(() => {
           setItems(prev => {
               const filtered = prev.filter((_, idx) => idx !== candidateIndex);
               return [...filtered, { id: `lfu-${val}-${Date.now()}`, value: val, count: 1, type: 'new' }];
           });
       }, 800);
    } else {
        setItems(prev => [...prev, { id: `lfu-${val}-${Date.now()}`, value: val, count: 1, type: 'new' }]);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto p-4">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700 w-full">
        <h3 className="text-xl font-bold mb-4 text-blue-400">LFU (Least Frequently Used)</h3>
        <p className="text-slate-300 mb-6">
          We count how many times an item is accessed. When full, the item with the LOWEST count is kicked out. 
          Good for items that are popular over long periods.
        </p>

        {/* Cache Container */}
        <div className="relative bg-slate-900/50 p-8 rounded-2xl border-2 border-dashed border-slate-600 flex justify-center gap-4 min-h-[180px] items-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <Block 
                key={item.id} 
                item={item} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <button onClick={() => accessItem('B')} className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg">
                Access B
            </button>
             <button onClick={() => accessItem('D')} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg">
                Insert D (New)
            </button>
            <button onClick={() => accessItem('A')} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg">
                Access A
            </button>
            <button onClick={() => setItems(INITIAL_STATE)} className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                <RotateCcw size={16}/> Reset
            </button>
        </div>
      </div>
    </div>
  );
};