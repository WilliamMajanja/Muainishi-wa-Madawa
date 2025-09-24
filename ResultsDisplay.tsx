
import React from 'react';
// Fix: Corrected import paths for root-level component.
import type { DrugInfo } from './types';
import { LinkIcon } from './components/icons/LinkIcon';
import { ClassificationIcon } from './components/icons/ClassificationIcon';
import { UsesIcon } from './components/icons/UsesIcon';
import { SideEffectsIcon } from './components/icons/SideEffectsIcon';

interface ResultsDisplayProps {
  data: DrugInfo;
}

const ResultCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white/50 p-6 rounded-xl shadow-sm border border-gray-200/50">
        <div className="flex items-center mb-3">
            <div className="text-brand-primary">{icon}</div>
            <h3 className="text-lg font-semibold text-brand-primary ml-2">{title}</h3>
        </div>
        <div className="text-brand-secondary/90 space-y-2 text-sm md:text-base">{children}</div>
    </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-slide-in-up">
      <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-200/50">
        <h2 className="text-3xl font-bold text-brand-secondary">{data.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultCard title="Classification" icon={<ClassificationIcon className="h-6 w-6" />}>
            <p>{data.classification}</p>
        </ResultCard>

        <ResultCard title="Common Uses" icon={<UsesIcon className="h-6 w-6" />}>
          <ul className="list-disc list-inside">
            {data.uses.split('\n').map((item, index) => item.trim() && <li key={index}>{item.replace(/^- /, '')}</li>)}
          </ul>
        </ResultCard>
      </div>

      <ResultCard title="Potential Side Effects" icon={<SideEffectsIcon className="h-6 w-6" />}>
        <ul className="list-disc list-inside">
          {data.sideEffects.split('\n').map((item, index) => item.trim() && <li key={index}>{item.replace(/^- /, '')}</li>)}
        </ul>
      </ResultCard>

      {data.sources && data.sources.length > 0 && (
        <ResultCard title="Sources" icon={<LinkIcon className="h-6 w-6" />}>
            <ul className="space-y-2">
                {data.sources.map((source, index) => (
                    <li key={index}>
                        <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center text-brand-primary hover:text-brand-accent hover:underline transition-colors group"
                        >
                           <LinkIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                           <span className="truncate">{source.title || source.uri}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </ResultCard>
      )}
    </div>
  );
};
