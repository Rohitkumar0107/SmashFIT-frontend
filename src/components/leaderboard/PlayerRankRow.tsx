import React from 'react';
import { Flame } from 'lucide-react';

interface PlayerRankRowProps {
  player: any;
  index: number;
  activeView: 'global' | 'tournament';
  onClick: () => void;
}

const PlayerRankRow: React.FC<PlayerRankRowProps> = ({ player, index, activeView, onClick }) => {
  // Database se aayi rank use karo varna index fallback
  const rankNumber = player.global_rank || index + 1;
  const isFirst = index === 0;

  return (
    <div 
      onClick={onClick} 
      className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50 transition-colors cursor-pointer group border-b border-slate-50 last:border-b-0"
    >
      
      {/* Rank Column */}
      <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center">
        <span className={`text-xl md:text-2xl font-black ${isFirst ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-700' : 'text-slate-700'}`}>
          #{rankNumber}
        </span>
      </div>

      {/* Player Profile Column */}
      <div className="col-span-6 sm:col-span-5 flex items-center gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden flex-shrink-0">
          <img src={player.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.full_name}`} alt={player.full_name} />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors truncate">
            {player.full_name}
          </h3>
          {isFirst && <span className="text-[10px] font-black bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded uppercase tracking-widest border border-yellow-200 mt-0.5 inline-block">Rank #1</span>}
        </div>
      </div>

      {/* Dynamic Stats Column */}
      {activeView === 'global' ? (
        <>
          <div className="col-span-4 sm:col-span-2 text-center font-black text-slate-700">{player.win_rate || 0}%</div>
          <div className="hidden sm:flex sm:col-span-2 justify-center items-center gap-1 font-bold text-slate-500">
            {Number(player.current_streak) > 2 && <Flame size={14} className="text-orange-500" />} {player.current_streak || 0}
          </div>
          <div className="hidden sm:block sm:col-span-2 text-right pr-4 font-black text-blue-600 text-lg">{player.total_points || 0}</div>
        </>
      ) : (
        <>
          <div className="col-span-4 sm:col-span-2 text-center font-black text-slate-700">{player.won || 0} - {player.lost || 0}</div>
          <div className="hidden sm:block sm:col-span-2 text-center font-bold text-slate-500">{player.played || 0}</div>
          <div className="hidden sm:block sm:col-span-2 text-right pr-4 font-black text-blue-600 text-lg">{player.points || 0}</div>
        </>
      )}
    </div>
  );
};

export default PlayerRankRow;