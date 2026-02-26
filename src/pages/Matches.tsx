import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Search } from 'lucide-react';
import api from '../services/api'; 

// Components
import TabNavigation from '../components/ui/TabNavigation';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import LiveCard from '../components/matches/LiveCard';
import UpcomingCard from '../components/matches/UpcomingCard';
import CompletedCard from '../components/matches/CompletedCard';
import CancelledCard from '../components/matches/CancelledCard';

const Matches = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'Live');
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  // 📡 Fetch Matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await api.get('/matches/all'); 
        if (response.data.success) {
          setMatches(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/matches/${id}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(location.pathname, { replace: true, state: { tab } });
  };

  const filteredMatches = useMemo(() => {
    return matches.filter(m => m.status === activeTab);
  }, [matches, activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">MATCH CENTER</h1>
          <p className="text-slate-700 font-bold text-sm mt-1">Real-time tournament updates</p>
        </div>

        <TabNavigation 
          tabs={['Live', 'Upcoming', 'Completed', 'Cancelled']}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      </div>

      {/* MATCHES GRID */}
      {loading ? (
        <SkeletonLoader text="Loading Matches..." />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <div 
                key={match.id}
                onClick={() => handleCardClick(match.id)} 
                className="cursor-pointer"
              >
                {match.status === 'Live' && <LiveCard match={match} />}
                {match.status === 'Upcoming' && <UpcomingCard match={match} />}
                {match.status === 'Completed' && <CompletedCard match={match} />}
                {match.status === 'Cancelled' && <CancelledCard match={match} />}
              </div>
            ))
          ) : (
            <EmptyState 
              icon={<Search size={48} />} 
              title="No matches found" 
              subtitle={`There are no ${activeTab.toLowerCase()} matches right now.`} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Matches;