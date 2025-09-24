import React from 'react';
import type { HistoryEntry, DrugInfo } from '../types';
import { HistoryIcon } from './icons/HistoryIcon';
import { TrashIcon } from './icons/TrashIcon';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (drugInfo: DrugInfo) => void;
  onClear: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 animate-slide-in-up h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
            <HistoryIcon className="h-6 w-6 text-brand-primary mr-2" />
            <h2 className="text-xl font-bold text-brand-secondary">History</h2>
        </div>
        {history.length > 0 && (
             <button 
                onClick={onClear}
                className="text-sm text-red-600 hover:text-red-800 font-semibold transition-colors flex items-center"
                aria-label="Clear history"
            >
                <TrashIcon className="h-4 w-4 mr-1" />
                Clear
            </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-center">
          <p className="text-brand-secondary/70">Your analysis history will appear here.</p>
        </div>
      ) : (
        <div className="overflow-y-auto -mr-3 pr-3 max-h-[60vh] lg:max-h-full">
            <ul className="space-y-2">
                {history.map((entry) => (
                <li key={entry.timestamp}>
                    <button
                    onClick={() => onSelect(entry.drugInfo)}
                    className="w-full text-left p-3 rounded-lg hover:bg-brand-light transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    >
                    <p className="font-semibold text-brand-secondary group-hover:text-brand-primary">{entry.drugInfo.name}</p>
                    <p className="text-xs text-brand-secondary/60">
                        {new Date(entry.timestamp).toLocaleString(undefined, {
                            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                    </p>
                    </button>
                </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};
