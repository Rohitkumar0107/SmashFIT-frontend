// src/components/cards/DashboardMatchCard.tsx
// import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const formatPlayers = (players: any[]) => {
  if (!players || players.length === 0) return "TBD";
  return players.map((p: any) => p.name.split(' ')[0]).join(' / '); 
};

const DashboardMatchCard = ({ match, onClick }: { match: any, onClick: () => void }) => {
  const isLive = match.status === 'Live';
  const scores = match.scores && match.scores.length > 0 ? match.scores[match.scores.length - 1] : { side_a_score: 0, side_b_score: 0 };

  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer border rounded-xl p-5 relative overflow-hidden transition-all hover:scale-[1.02] ${
        isLive ? 'border-blue-200 bg-blue-50/50 hover:bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="absolute top-0 right-0 p-3">
        {isLive ? (
          <span className="flex items-center gap-1.5 text-[9px] font-black text-red-600 bg-red-100 px-2 py-1 rounded-full uppercase tracking-widest border border-red-200">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span> LIVE
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded-full uppercase tracking-widest border border-slate-200">
            <Calendar size={10} /> UPCOMING
          </span>
        )}
      </div>

      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 pr-16 truncate">
        {match.court_name || 'TBD'} • {match.category}
      </p>

      <div className="flex items-center justify-between">
        <div className="text-center flex-1">
          <p className="font-black text-sm text-slate-800 uppercase truncate px-1">{formatPlayers(match.side_a_players)}</p>
          {isLive ? (
            <p className="text-xl font-black text-blue-600 mt-1">{scores.side_a_score}</p>
          ) : (
             <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Side A</p>
          )}
        </div>
        
        <div className="px-2 text-slate-300 font-black italic text-sm">VS</div>
        
        <div className="text-center flex-1">
          <p className="font-black text-sm text-slate-800 uppercase truncate px-1">{formatPlayers(match.side_b_players)}</p>
          {isLive ? (
            <p className="text-xl font-black text-slate-800 mt-1">{scores.side_b_score}</p>
          ) : (
            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Side B</p>
          )}
        </div>
      </div>
      
      {!isLive && match.scheduled_at && (
         <div className="mt-4 pt-3 border-t border-slate-100 flex justify-center items-center gap-1 text-[11px] font-black text-slate-500 uppercase tracking-widest">
            <Clock size={12} className="text-blue-500" /> 
            {new Date(match.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
         </div>
      )}
    </div>
  );
};

export default DashboardMatchCard;