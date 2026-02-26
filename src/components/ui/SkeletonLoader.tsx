import React from 'react';
import { Activity } from 'lucide-react';

interface SkeletonLoaderProps {
  text?: string;
  minHeight?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  text = "Loading...", 
  minHeight = "min-h-[40vh]" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${minHeight}`}>
      <Activity className="animate-spin text-blue-600 mb-4" size={40} />
      <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">{text}</p>
    </div>
  );
};

export default SkeletonLoader;