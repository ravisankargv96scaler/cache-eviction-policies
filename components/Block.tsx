import React from 'react';
import { motion } from 'framer-motion';
import { CacheItem } from '../types';

interface BlockProps {
  item: CacheItem;
  label?: string;
  subLabel?: string;
}

export const Block: React.FC<BlockProps> = ({ item, label, subLabel }) => {
  const getColors = (type: CacheItem['type']) => {
    switch (type) {
      case 'hot': return 'bg-orange-500 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.5)]';
      case 'cold': return 'bg-slate-600 border-slate-500 text-slate-300';
      case 'new': return 'bg-green-600 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]';
      case 'evicting': return 'bg-red-600 border-red-500 animate-pulse';
      default: return 'bg-blue-600 border-blue-500';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -20 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`
        relative w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 
        flex flex-col items-center justify-center 
        shadow-lg ${getColors(item.type)}
      `}
    >
      {label && (
        <span className="absolute -top-8 text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
      )}
      
      <span className="text-3xl md:text-4xl font-mono font-bold text-white drop-shadow-md">
        {item.value}
      </span>

      {(item.count !== undefined) && (
        <div className="absolute -bottom-3 bg-white text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
          Cnt: {item.count}
        </div>
      )}

      {subLabel && (
        <span className="absolute -bottom-8 text-xs text-slate-500">
          {subLabel}
        </span>
      )}
    </motion.div>
  );
};