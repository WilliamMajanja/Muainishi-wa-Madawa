
import React, { useState, useRef } from 'react';
// Fix: Corrected import paths for root-level component.
import type { AnalysisMode } from './types';
import { SearchIcon } from './components/icons/SearchIcon';
import { UploadIcon } from './components/icons/UploadIcon';

interface DrugInputProps {
  onAnalyze: (input: { type: 'text'; value: string } | { type: 'image'; value: string; mimeType: string }) => void;
  isLoading: boolean;
}

export const DrugInput: React.FC<DrugInputProps> = ({ onAnalyze, isLoading }) => {
  const [mode, setMode] = useState<AnalysisMode>('text');
  const [textValue, setTextValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isLoading) return;

    if (mode === 'text' && textValue) {
      onAnalyze({ type: 'text', value: textValue });
    } else if (mode === 'image' && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        onAnalyze({ type: 'image', value: base64String, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const isSubmitDisabled = isLoading || (mode === 'text' && !textValue.trim()) || (mode === 'image' && !file);

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50 animate-slide-in-up">
      <div className="flex justify-center mb-6">
        <div className="bg-brand-light p-1 rounded-full flex space-x-1">
          <button
            onClick={() => setMode('text')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'text' ? 'bg-white text-brand-primary shadow' : 'text-brand-secondary hover:bg-white/50'}`}
          >
            By Name
          </button>
          <button
            onClick={() => setMode('image')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${mode === 'image' ? 'bg-white text-brand-primary shadow' : 'text-brand-secondary hover:bg-white/50'}`}
          >
            By Image
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {mode === 'text' ? (
          <div className="relative">
            <input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="e.g., Aspirin, Paracetamol"
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-accent focus:outline-none transition"
              disabled={isLoading}
            />
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        ) : (
          <div>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-brand-primary transition"
              onClick={() => fileInputRef.current?.click()}>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
              />
              {filePreview ? (
                <img src={filePreview} alt="Preview" className="mx-auto h-24 rounded-lg" />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                    <UploadIcon className="h-10 w-10 mb-2" />
                    <p className="font-semibold">Click to upload an image</p>
                    <p className="text-xs">PNG, JPG, or WEBP</p>
                </div>
              )}
            </div>
             {file && <p className="text-center text-sm mt-2 text-gray-600">Selected: {file.name}</p>}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full mt-6 bg-brand-primary text-white font-bold py-3 rounded-full hover:bg-brand-secondary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Drug'}
        </button>
      </form>
    </div>
  );
};
