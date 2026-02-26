// import React from 'react';

const StatsCard = ({ title, value, icon, trend, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all ${
      onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-300 hover:-translate-y-1' : ''
    }`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black text-slate-800 mt-1">{value}</h3>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">{icon}</div>
    </div>
    <p className="text-[10px] font-bold text-slate-500 mt-3 flex items-center gap-1 uppercase tracking-wider">
      {trend}
    </p>
  </div>
);

export default StatsCard;