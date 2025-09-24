import React from 'react';

const SkeletonCard: React.FC = () => (
    <div className="bg-white/50 p-6 rounded-xl shadow-sm border border-gray-200/50">
        <div className="h-6 w-1/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
        </div>
    </div>
);


export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
        <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-200/50">
            <div className="h-8 w-1/2 bg-gray-200 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkeletonCard />
            <SkeletonCard />
        </div>
        <SkeletonCard />
        <SkeletonCard />
    </div>
  );
};
