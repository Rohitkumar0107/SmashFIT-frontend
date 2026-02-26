import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Activity, Trophy } from 'lucide-react';
import api from '../../services/api'; // 👈 Tera axios instance zinda ho gaya

const LeaderboardWidget = () => {
  const navigate = useNavigate();
  const [topPlayers, setTopPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        setLoading(true);
        // Real API Call
        const response = await api.get('/leaderboard/top');
        
        if (response.data.success) {
          // Top 5 players aa rahe hain, agar dashboard widget mein sirf 3 dikhane hain toh .slice(0, 3) kar dena
          setTopPlayers(response.data.data.slice(0, 5)); 
        }
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPlayers();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <h2 className="text-lg font-black text-slate-800 mb-4 uppercase tracking-tight flex items-center gap-2">
        <Trophy className="text-yellow-500" size={20} /> Top Ranked
      </h2>
      
      <div className="space-y-3 min-h-[150px]">
        {loading ? (
          // ⏳ Skeleton Loader
          <div className="space-y-3">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-12 bg-slate-100 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : topPlayers.length > 0 ? (
          // 🏆 Top Players List
          topPlayers.map((player, index) => (
            <div 
              key={player.id} 
              onClick={() => navigate(`/player/${player.id}`)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-black w-4 text-center ${player.global_rank === 1 ? 'text-yellow-500' : player.global_rank === 2 ? 'text-slate-400' : player.global_rank === 3 ? 'text-amber-700' : 'text-slate-500'}`}>
                  #{player.global_rank || index + 1}
                </span>
                
                {/* Avatar with Initials */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm ${
                  player.global_rank === 1 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  {player.full_name ? player.full_name.charAt(0).toUpperCase() : '?'}
                </div>
                
                <div>
                  <p className="text-sm font-black text-slate-700 uppercase group-hover:text-blue-700 transition-colors truncate max-w-[100px] sm:max-w-[120px]">
                    {player.full_name}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                    {player.tier}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-black text-blue-600">{player.total_points}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">PTS</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-slate-500 font-bold text-sm">No rankings available</div>
        )}
      </div>

      <button 
        onClick={() => navigate('/leaderboard')}
        className="w-full mt-4 py-2.5 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all flex items-center justify-center gap-1 border border-blue-100"
      >
        Full Standings <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default LeaderboardWidget;