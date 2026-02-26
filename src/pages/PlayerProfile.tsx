import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import api from '../services/api';

// Shared & Feature Components
import SkeletonLoader from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import PlayerHero from '../components/player-profile/PlayerHero';
import PlayerStats from '../components/player-profile/PlayerStats';
import RecentMatches from '../components/player-profile/RecentMatches';

const PlayerProfile = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlayerProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/players/${playerId}`);
        if (response.data.success) {
          setPlayer(response.data.data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch player profile", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (playerId && playerId !== 'undefined') {
      fetchPlayerProfile();
    }
  }, [playerId]);

  if (loading) {
    return <SkeletonLoader text="Loading Profile..." minHeight="min-h-[60vh]" />;
  }

  if (error || !player) {
    return (
      <EmptyState 
        icon={<AlertCircle size={48} />} 
        title="Player Not Found" 
        subtitle="The player profile you are looking for does not exist." 
      />
    );
  }

  // Helper for dates
  const joinDateFormatted = new Date(player.join_date).toLocaleDateString([], { month: 'short', year: 'numeric' });

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      
      {/* HEADER WITH BACK BUTTON */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black uppercase tracking-tight transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* 1. HERO SECTION */}
      <PlayerHero player={player} joinDateFormatted={joinDateFormatted} />

      {/* 2. STATS GRID */}
      <PlayerStats player={player} />

      {/* 3. RECENT MATCH HISTORY */}
      <RecentMatches matches={player.recent_matches} />

    </div>
  );
};

export default PlayerProfile;