import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Activity, Clock, Crown } from 'lucide-react';
import api from '../services/api';

// Components
import StatsCard from '../components/cards/StatsCard';
import MatchCenter from '../components/dashboard/MatchCenter';
import TournamentBracket from '../components/dashboard/TournamentBracket';
import LeaderboardWidget from '../components/leaderboard/LeaderboardWidget';
import ActivityFeedWidget from '../components/dashboard/ActivityFeedWidget';
import SkeletonLoader from '../components/ui/SkeletonLoader'; // 🧩 Apna UI component

const Dashboard = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardMatches = async () => {
      try {
        setLoading(true);
        const response = await api.get('/matches/all');
        console.log('dashboard matches response', response.data);
        if (response.data.success) {
          setMatches(response.data.data || []);
        } else {
          setMatches([]);
        }
      } catch (error) {
        console.error("Dashboard match fetch error:", error);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardMatches();
  }, []);

  // 💡 Pro Tip: useMemo se ye filters baar-baar nahi chalenge har render pe
  const { liveCount, upcomingCount, completedCount } = useMemo(() => {
    // normalise status so we don't depend on casing from API
    const norm = (s: string) => s?.toUpperCase();
    return {
      liveCount: matches.filter(m => norm(m.status) === 'LIVE').length,
      upcomingCount: matches.filter(m => norm(m.status) === 'UPCOMING').length,
      completedCount: matches.filter(m => norm(m.status) === 'COMPLETED').length,
    };
  }, [matches]);

  if (loading) {
    return <SkeletonLoader text="Loading Arena Dashboard..." minHeight="min-h-[80vh]" />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      
      {/* 1. TOP QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard 
          title="Live Matches" 
          value={liveCount} 
          icon={<Activity className="text-green-500" />} 
          trend="Right now" 
          onClick={() => navigate('/matches', { state: { tab: 'Live' } })}
        />
        <StatsCard 
          title="Upcoming" 
          value={upcomingCount} 
          icon={<Clock className="text-blue-500" />} 
          trend="Scheduled" 
          onClick={() => navigate('/matches', { state: { tab: 'Upcoming' } })}
        />
        <StatsCard 
          title="Completed" 
          value={completedCount} 
          icon={<Trophy className="text-orange-500" />} 
          trend="Tournament History" 
          onClick={() => navigate('/matches', { state: { tab: 'Completed' } })}
        />
        <StatsCard 
          title="Current MVP" 
          value="Rohit K." 
          icon={<Crown className="text-yellow-500" />} 
          trend="Rank #1 Player" 
          onClick={() => navigate('/leaderboard')} 
        />
      </div>

      {/* 2. MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <MatchCenter matches={matches} loading={loading} />
          <TournamentBracket />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <LeaderboardWidget />
          <ActivityFeedWidget />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;