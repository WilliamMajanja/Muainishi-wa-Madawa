
import React from 'react';
import { PillIcon } from './icons/PillIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-md">
            <PillIcon className="h-12 w-12 text-brand-primary" />
        </div>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-brand-secondary">
        Muainishi wa Madawa
      </h1>
      <p className="mt-2 text-lg text-brand-secondary/80">
        Pharmaceutical Classification & Analysis
      </p>
    </header>
  );
};
