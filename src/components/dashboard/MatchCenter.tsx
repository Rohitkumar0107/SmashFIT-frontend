import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords } from 'lucide-react';
import DashboardMatchCard from '../cards/DashboardMatchCard';

const MatchCenter = ({ matches, loading }: { matches: any[], loading: boolean }) => {
  const navigate = useNavigate();
  const [matchTab, setMatchTab] = useState('Live'); 

  const filteredMatches = matches.filter(m => m.status === matchTab).slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
          <Swords size={20} className="text-blue-600" /> Match Center
        </h2>
        
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-black tracking-wider">
          <button 
            onClick={() => setMatchTab('Live')}
            className={`px-4 py-2 rounded-lg transition-all ${matchTab === 'Live' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            LIVE
          </button>
          <button 
            onClick={() => setMatchTab('Upcoming')}
            className={`px-4 py-2 rounded-lg transition-all ${matchTab === 'Upcoming' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            UPCOMING
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <>
            <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
            <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
          </>
        ) : filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <DashboardMatchCard 
              key={match.id} 
              match={match} 
              onClick={() => navigate(`/matches/${match.id}`)} 
            />
          ))
        ) : (
          <div className="col-span-full border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center border-dashed bg-slate-50">
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No {matchTab} Matches</p>
            <p className="text-xs font-bold text-slate-400 mt-1">Check back later for updates</p>
          </div>
        )}
      </div>
      
      {!loading && matches.length > 0 && (
          <button 
            onClick={() => navigate('/matches')}
            className="w-full mt-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-widest rounded-xl transition-colors"
          >
            View All Matches
          </button>
      )}
    </div>
  );
};

export default MatchCenter;