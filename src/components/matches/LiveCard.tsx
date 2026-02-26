import React from 'react';
import { MapPin } from 'lucide-react';
import { formatPlayers } from '../../utils/formatters';

const LiveCard = ({ match }: any) => {
  const isServingA = match.serving_side === 'Side_A';
  const isServingB = match.serving_side === 'Side_B';
  const scores = match.scores && match.scores.length > 0 ? match.scores : [{ side_a_score: 0, side_b_score: 0 }]; 

  const avatarA = (match.side_a_players || [])[0]?.name || 'PlayerA';
  const avatarB = (match.side_b_players || [])[0]?.name || 'PlayerB';

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-xl relative transition-transform hover:-translate-y-1 hover:border-blue-400">
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-200 text-[10px] font-black uppercase">
        <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span> Live
      </div>

      <div className="mb-8">
        <h4 className="text-blue-700 font-black text-[11px] uppercase tracking-[0.2em]">{match.tournament_name || 'Tournament'}</h4>
        <div className="flex items-center gap-2 mt-1 text-slate-700">
          <MapPin size={12} className="text-slate-500" />
          <span className="text-[10px] font-black uppercase">{match.court_name || 'TBD'} • {match.category}</span>
        </div>
      </div>

      <div className="flex items-center">
        {/* Side A */}
        <div className="flex-1 text-center">
          <div className={`w-16 h-16 mx-auto rounded-full border-4 ${isServingA ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'} bg-slate-100 mb-3 overflow-hidden shadow-sm`}>
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarA}`} alt="" />
          </div>
          <p className="font-black text-slate-900 uppercase tracking-tighter text-sm line-clamp-1">{formatPlayers(match.side_a_players)}</p>
          <div className="flex justify-center gap-1 mt-2">
            {scores.map((s: any, i: number) => (
              <span key={i} className={`text-xs font-black w-6 h-6 flex items-center justify-center rounded ${i === scores.length - 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {s.side_a_score}
              </span>
            ))}
          </div>
        </div>

        <div className="px-4 text-2xl font-black text-slate-300 italic">VS</div>

        {/* Side B */}
        <div className="flex-1 text-center">
          <div className={`w-16 h-16 mx-auto rounded-full border-4 ${isServingB ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'} bg-slate-100 mb-3 overflow-hidden shadow-sm`}>
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarB}`} alt="" />
          </div>
          <p className="font-black text-slate-900 uppercase tracking-tighter text-sm line-clamp-1">{formatPlayers(match.side_b_players)}</p>
          <div className="flex justify-center gap-1 mt-2">
            {scores.map((s: any, i: number) => (
              <span key={i} className={`text-xs font-black w-6 h-6 flex items-center justify-center rounded ${i === scores.length - 1 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {s.side_b_score}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCard;