import React from 'react';
import { Trophy, ShieldCheck, Calendar } from 'lucide-react';

interface PlayerHeroProps {
  player: any;
  joinDateFormatted: string;
}

const PlayerHero: React.FC<PlayerHeroProps> = ({ player, joinDateFormatted }) => {
  return (
    <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl relative overflow-hidden text-white border-4 border-slate-800">
      <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] bg-blue-600/20 blur-[100px] rounded-full"></div>
      
      <div className="relative flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        
        {/* Avatar Area */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 overflow-hidden shadow-2xl relative z-10 flex items-center justify-center">
            <img 
              src={player.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.full_name}`} 
              alt={player.full_name} 
              className="w-full h-full object-cover" 
            />
          </div>
          {player.global_rank && player.global_rank <= 3 && (
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 border-slate-900 z-20 shadow-lg flex items-center gap-1">
              <Trophy size={12} /> Rank #{player.global_rank}
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="flex-1">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">{player.full_name}</h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
            {player.tier && (
              <span className="flex items-center gap-1 text-blue-400">
                <ShieldCheck size={16} /> {player.tier}
              </span>
            )}
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar size={16} /> Joined {joinDateFormatted}</span>
          </div>
          {player.bio && <p className="mt-3 text-slate-300 italic">"{player.bio}"</p>}
        </div>

        {/* Points Badge */}
        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl text-center min-w-[120px] backdrop-blur-sm">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Points</p>
          <p className="text-3xl font-black text-blue-400">{player.total_points || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerHero;