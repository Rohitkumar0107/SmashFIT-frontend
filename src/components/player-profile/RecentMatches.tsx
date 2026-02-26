import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

interface RecentMatchesProps {
  matches: any[];
}

const RecentMatches: React.FC<RecentMatchesProps> = ({ matches }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
      <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-2">
        <Activity className="text-blue-600" size={20} /> Recent Matches
      </h3>
      
      {matches && matches.length > 0 ? (
        <div className="space-y-4">
          {matches.map((match: any) => (
            <div 
              key={match.id} 
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group cursor-pointer" 
              onClick={() => navigate(`/matches/${match.id}`)}
            >
              <div className="flex items-center gap-4">
                {/* W/L Badge */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow-sm ${
                  match.result === 'W' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {match.result}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800 uppercase group-hover:text-blue-700 transition-colors">vs {match.opponent_name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    {match.category.replace('_', ' ')} • {new Date(match.match_date).toLocaleDateString([], { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-black text-slate-700">{match.score}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-500 font-bold">No recent matches played yet.</p>
        </div>
      )}
      
      {matches && matches.length > 0 && (
        <button className="w-full mt-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest rounded-xl transition-colors">
          View Full History
        </button>
      )}
    </div>
  );
};

export default RecentMatches;