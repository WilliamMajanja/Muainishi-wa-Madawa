import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DrugInput } from './components/DrugInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { HistoryPanel } from './components/HistoryPanel';
import { SkeletonLoader } from './components/SkeletonLoader';
import { analyzeDrugByName, analyzeDrugByImage } from './services/geminiService';
import type { DrugInfo, HistoryEntry } from './types';

function App() {
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const storedHistory = localStorage.getItem('drugAnalysisHistory');
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('drugAnalysisHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const handleAnalyze = async (input: { type: 'text'; value: string } | { type: 'image'; value: string; mimeType: string }) => {
    setIsLoading(true);
    setError(null);
    setDrugInfo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      let result: DrugInfo;
      if (input.type === 'text') {
        result = await analyzeDrugByName(input.value);
      } else {
        result = await analyzeDrugByImage(input.value, input.mimeType);
      }
      setDrugInfo(result);
      
      const newEntry: HistoryEntry = { drugInfo: result, timestamp: new Date().toISOString() };
      setHistory(prevHistory => {
        const filteredHistory = prevHistory.filter(h => h.drugInfo.name.toLowerCase() !== result.name.toLowerCase());
        return [newEntry, ...filteredHistory].slice(0, 20); // Keep history to 20 items
      });

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectFromHistory = (selectedDrugInfo: DrugInfo) => {
    setDrugInfo(selectedDrugInfo);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-brand-light font-sans text-brand-secondary">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9D6FF,transparent)]"></div>
      </div>
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <DrugInput onAnalyze={handleAnalyze} isLoading={isLoading} />
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative animate-fade-in" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {isLoading && <SkeletonLoader />}

            {drugInfo && !isLoading && <ResultsDisplay data={drugInfo} />}
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-8">
            <HistoryPanel 
              history={history} 
              onSelect={handleSelectFromHistory} 
              onClear={handleClearHistory} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
