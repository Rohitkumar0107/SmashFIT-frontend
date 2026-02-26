import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../services/api';

// Shared & Feature Components
import SkeletonLoader from '../components/ui/SkeletonLoader';
import StatusBadge from '../components/ui/StatusBadge';
import ScoreboardCard from '../components/match-detail/ScoreboardCard';
import SetHistory from '../components/match-detail/SetHistory';
import MatchInfoBox from '../components/match-detail/MatchInfoBox';

const MatchDetail = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      if (!matchId || matchId === 'undefined') return;
      
      try {
        setLoading(true);
        const response = await api.get(`/matches/${matchId}`);
        if (response.data.success) {
          setMatch(response.data.data);
        }
      } catch (error) {
        console.error("Match detail fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatchDetails();
  }, [matchId]);

  if (loading) {
    return <SkeletonLoader text="Loading Match Data..." minHeight="min-h-[60vh]" />;
  }

  if (!match) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-slate-800">Match Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-bold hover:underline">Go Back</button>
      </div>
    );
  }

  // --- Helpers ---
  const isUpcoming = match.status === 'Upcoming';
  const isLive = match.status === 'Live';
  
  // Get current score (Last set in the array, or 0-0 if no scores)
  const currentSet = match.scores && match.scores.length > 0 
    ? match.scores[match.scores.length - 1] 
    : { side_a_score: 0, side_b_score: 0 };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* 1. TOP NAVIGATION & BADGES */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black uppercase tracking-tight transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Humara apna common StatusBadge use kar rahe hain (status ko uppercase bhejkar) */}
        <StatusBadge status={match.status.toUpperCase()} />
      </div>

      {/* 2. MAIN SCOREBOARD CARD */}
      <ScoreboardCard 
        match={match} 
        isLive={isLive} 
        isUpcoming={isUpcoming} 
        currentSet={currentSet} 
      />

      {/* 3. SET-BY-SET HISTORY & EXTRA DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SetHistory scores={match.scores} isUpcoming={isUpcoming} />
        <MatchInfoBox match={match} />
      </div>
      
    </div>
  );
};

export default MatchDetail;