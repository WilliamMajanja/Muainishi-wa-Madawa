import React, { useEffect } from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-lg flex items-center animate-fade-in-down">
      <CheckIcon className="h-5 w-5 mr-2" />
      <span>{message}</span>
    </div>
  );
};
