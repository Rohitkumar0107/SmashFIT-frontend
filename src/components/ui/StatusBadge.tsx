import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string; // Optional extra styling ke liye
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  let badgeColor = "bg-slate-100 text-slate-700 border-slate-200";
  let statusText = status;
  let isLive = false;

  if (status === 'LIVE' || status === 'ONGOING') {
    badgeColor = "bg-red-500 text-white border-red-600 shadow-md shadow-red-500/20";
    statusText = "Live Now";
    isLive = true;
  } else if (status === 'REGISTRATION_OPEN') {
    badgeColor = "bg-blue-500 text-white border-blue-600 shadow-md shadow-blue-500/20";
    statusText = "Registering";
  } else if (status === 'COMPLETED') {
    badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
    statusText = "Completed";
  }

  return (
    <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 backdrop-blur-md w-max ${badgeColor} ${className}`}>
      {isLive && <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute"></span>}
      {isLive && <span className="w-1.5 h-1.5 bg-white rounded-full relative"></span>}
      {statusText}
    </div>
  );
};

export default StatusBadge;