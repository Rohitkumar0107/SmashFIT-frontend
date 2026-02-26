// import React from 'react';
import { Clock } from 'lucide-react';
import { formatPlayers, formatTime, formatDate } from '../../utils/formatters';

const UpcomingCard = ({ match }: any) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-300 shadow-sm border-l-[6px] border-l-blue-600 hover:shadow-md transition-all hover:border-blue-200">
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 rounded-2xl text-blue-700 border border-blue-100"><Clock size={20} /></div>
        <div>
          <p className="text-sm font-black text-slate-900">{formatTime(match.scheduled_at)}</p>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{formatDate(match.scheduled_at)}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-black text-slate-500 uppercase leading-none mb-1 tracking-tighter">Court</p>
        <p className="text-sm font-black text-blue-700">{match.court_name || 'TBD'}</p>
      </div>
    </div>
    <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex items-center justify-between font-black text-slate-800 text-sm">
      <span className="flex-1 text-center truncate px-1">{formatPlayers(match.side_a_players)}</span>
      <span className="text-[10px] text-slate-400 mx-2">VS</span>
      <span className="flex-1 text-center truncate px-1">{formatPlayers(match.side_b_players)}</span>
    </div>
  </div>
);

export default UpcomingCard;