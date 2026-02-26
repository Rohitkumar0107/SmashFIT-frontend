import React from 'react';
import { Target, Swords, Activity, Flame } from 'lucide-react';

interface PlayerStatsProps {
  player: any;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatBox label="Win Rate" value={`${player.win_rate || 0}%`} icon={<Target className="text-purple-500" />} />
      <StatBox label="Matches" value={player.matches_played || 0} icon={<Swords className="text-blue-500" />} />
      <StatBox label="Win/Loss" value={`${player.wins || 0} - ${player.losses || 0}`} icon={<Activity className="text-green-500" />} />
      <StatBox label="Current Streak" value={`${player.current_streak || 0} 🔥`} icon={<Flame className="text-orange-500" />} highlight={player.current_streak > 2} />
    </div>
  );
};

// Internal Sub-component
const StatBox = ({ label, value, icon, highlight = false }: any) => (
  <div className={`bg-white p-5 rounded-2xl border ${highlight ? 'border-orange-200 shadow-md shadow-orange-100' : 'border-slate-200 shadow-sm transition-transform hover:-translate-y-1'}`}>
    <div className="flex justify-between items-start mb-2">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <div className="p-1.5 bg-slate-50 rounded-lg">{icon}</div>
    </div>
    <h3 className="text-2xl font-black text-slate-800">{value}</h3>
  </div>
);

export default PlayerStats;