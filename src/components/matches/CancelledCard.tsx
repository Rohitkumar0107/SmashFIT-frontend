// import React from 'react';
import { XCircle } from 'lucide-react';
import { formatPlayers } from '../../utils/formatters';

const CancelledCard = ({ match }: any) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm opacity-75 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-slate-100 rounded-lg text-slate-500"><XCircle size={20} /></div>
      <p className="text-sm font-black text-slate-600 uppercase">Match Cancelled</p>
    </div>
    <div className="flex justify-between items-center font-bold text-slate-500 text-sm">
      <span className="truncate w-1/3">{formatPlayers(match.side_a_players)}</span>
      <span className="text-xs">VS</span>
      <span className="truncate w-1/3 text-right">{formatPlayers(match.side_b_players)}</span>
    </div>
  </div>
);

export default CancelledCard;