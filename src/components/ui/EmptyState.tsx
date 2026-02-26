import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
      <div className="flex justify-center mb-4 text-slate-300">
        {icon}
      </div>
      <p className="text-slate-500 font-black uppercase tracking-widest text-lg">{title}</p>
      <p className="text-slate-400 font-bold text-sm mt-1">{subtitle}</p>
    </div>
  );
};

export default EmptyState;