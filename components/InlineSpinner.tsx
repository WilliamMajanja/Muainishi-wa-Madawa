import React from 'react';

export const InlineSpinner: React.FC<{className?: string}> = ({className = ''}) => {
  return (
    <div className={`inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}></div>
  );
};
