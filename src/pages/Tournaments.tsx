import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Filter } from 'lucide-react';
import api from '../services/api';

// Components Import kiye hain humne
import TabNavigation from '../components/ui/TabNavigation';
import EmptyState from '../components/ui/EmptyState';
import TournamentCard from '../components/tournaments/TournamentCard';
import SearchInput from '../components/ui/SearchInput';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const Tournaments = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tournaments');
        if (response.data.success) {
          setTournaments(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tournaments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  // useMemo for performance optimization
  const filteredTournaments = useMemo(() => {
    return tournaments.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 'ALL') return matchesSearch;
      if (activeTab === 'LIVE') return matchesSearch && t.status === 'LIVE';
      if (activeTab === 'UPCOMING') return matchesSearch && t.status === 'REGISTRATION_OPEN';
      if (activeTab === 'COMPLETED') return matchesSearch && t.status === 'COMPLETED';
      return matchesSearch;
    });
  }, [tournaments, searchQuery, activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-900 rounded-[2rem] p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-[50%] h-[200%] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight italic flex items-center gap-3">
            <Trophy className="text-yellow-400" size={36} /> TOURNAMENTS
          </h1>
          <p className="text-slate-400 font-bold text-sm mt-2">Compete, climb the ranks, and win glory.</p>
        </div>

        <div className="relative z-10 w-full md:w-96">
          {/* Naya SearchInput Component lagaya yahan */}
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search tournaments..." 
            variant="dark" 
          />
        </div>
      </div>

      {/* TABS & FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <TabNavigation 
          tabs={['ALL', 'LIVE', 'UPCOMING', 'COMPLETED']} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 w-full sm:w-auto shadow-sm">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* TOURNAMENT GRID & LOADING STATE */}
      {loading ? (
        <SkeletonLoader text="Loading Tournaments..." minHeight="min-h-[40vh]" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((t) => (
              <TournamentCard key={t.id} tournament={t} onClick={() => navigate(`/tournaments/${t.id}`)} />
            ))
          ) : (
            <EmptyState 
              icon={<Trophy size={48} />} 
              title="No tournaments found" 
              subtitle="Try changing your search or filters." 
            />
          )}
        </div>
      )}

    </div>
  );
};

export default Tournaments;