import React from 'react';
import { Trophy } from 'lucide-react';
import { formatPlayers, formatDate } from '../../utils/formatters';

const CompletedCard = ({ match }: any) => {
  const isAWinner = match.winner_side === 'Side_A';
  const winnerName = isAWinner ? formatPlayers(match.side_a_players) : formatPlayers(match.side_b_players);
  const loserName = isAWinner ? formatPlayers(match.side_b_players) : formatPlayers(match.side_a_players);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-300 shadow-sm hover:border-green-300 transition-all cursor-pointer">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center border border-green-200">
            <Trophy size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{match.category} • {match.round_name}</p>
            <p className="text-sm font-black text-slate-900 mt-0.5">{formatDate(match.ended_at || match.scheduled_at)}</p>
          </div>
        </div>
        <div className="text-right">
           <p className="text-xs font-black text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">{match.final_score || 'Score N/A'}</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="font-black text-sm text-slate-900 flex items-center gap-2">
            {winnerName} <span className="text-[9px] bg-green-500 text-white px-1.5 py-0.5 rounded uppercase">Winner</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm text-slate-500">{loserName}</span>
        </div>
      </div>
    </div>
  );
};

export default CompletedCard;