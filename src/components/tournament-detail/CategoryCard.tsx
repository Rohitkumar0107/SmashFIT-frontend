import React from 'react';

interface CategoryCardProps {
  category: any;
  isRegistrationOpen: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category: cat, isRegistrationOpen }) => {
  const isFull = cat.filled >= cat.slots;
  const fillPercentage = (cat.filled / cat.slots) * 100;

  return (
    <div className={`bg-white rounded-3xl p-6 border transition-all ${isFull ? 'border-slate-200 opacity-75' : 'border-blue-100 hover:border-blue-300 shadow-sm hover:shadow-md'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{cat.name}</h4>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            {cat.type} • Entry: {cat.fee}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className={`text-2xl font-black ${isFull ? 'text-red-500' : 'text-blue-600'}`}>
            {cat.filled}<span className="text-sm text-slate-400">/{cat.slots}</span>
          </p>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Slots Filled</p>
        </div>
      </div>
      
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${isFull ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${fillPercentage}%` }}
        ></div>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          disabled={isFull || !isRegistrationOpen}
          className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
            isFull || !isRegistrationOpen 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-slate-900 text-white hover:bg-blue-600 shadow-md'
          }`}
        >
          {isFull ? 'Category Full' : 'Select Category'}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;