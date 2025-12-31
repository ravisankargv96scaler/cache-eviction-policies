import React from 'react';
import { TabConfig, TabId } from '../types';

interface NavProps {
  tabs: TabConfig[];
  activeTab: TabId;
  onChange: (id: TabId) => void;
}

export const TabNavigation: React.FC<NavProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-xl overflow-x-auto no-scrollbar">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-1 md:space-x-2 py-3 min-w-max">
          {tabs.map((tab) => {
             const isActive = activeTab === tab.id;
             return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`
                  relative px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}
                `}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[13px] w-1 h-1 bg-blue-500 rounded-full md:hidden"></span>
                )}
              </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};