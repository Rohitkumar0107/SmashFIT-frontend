// import React from 'react';

const ActivityItem = ({ text, time }: any) => (
  <div className="flex items-start gap-3">
    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 ring-4 ring-blue-50"></div>
    <div>
      <p className="text-xs font-black text-slate-700 leading-tight uppercase">{text}</p>
      <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">{time}</p>
    </div>
  </div>
);

export default ActivityItem;