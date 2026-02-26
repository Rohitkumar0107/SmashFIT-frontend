import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Globe, Medal, ChevronDown, Search } from 'lucide-react';
import api from '../services/api';

// 🧩 Apne naye Shared & Feature Components
import SearchInput from '../components/ui/SearchInput';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import PlayerRankRow from '../components/leaderboard/PlayerRankRow';

// --- DUMMY DATA FOR TOURNAMENT (Isiki API aage banayenge) ---
const TOURNAMENT_STANDINGS = [
  { id: 1, full_name: 'Rohit Kumar', played: 5, won: 5, lost: 0, points: 15 },
  { id: 2, full_name: 'Aryan Singh', played: 5, won: 4, lost: 1, points: 12 },
  { id: 3, full_name: 'Arjun P.', played: 4, won: 3, lost: 1, points: 9 },
  { id: 4, full_name: 'Sagar M.', played: 4, won: 2, lost: 2, points: 6 },
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'global' | 'tournament'>('global');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Real API Data State
  const [globalRankings, setGlobalRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 📡 Fetch Global Rankings
  useEffect(() => {
    const fetchGlobalLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await api.get('/leaderboard/global');
        if (response.data.success) {
          setGlobalRankings(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch global leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalLeaderboard();
  }, []);

  // 🔍 Search Filter Logic
  const filteredGlobalRankings = globalRankings.filter(player => 
    player.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTournamentStandings = TOURNAMENT_STANDINGS.filter(player => 
    player.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to get active list
  const activeDataList = activeView === 'global' ? filteredGlobalRankings : filteredTournamentStandings;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      
      {/* 1. HEADER & TOGGLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">
            <Trophy className="text-yellow-500" size={32} /> LEADERBOARD
          </h1>
          <p className="text-slate-600 font-bold text-sm mt-1">
            {activeView === 'global' ? 'Overall SmashFIT World Rankings' : 'Current Tournament Standings'}
          </p>
        </div>

        {/* View Toggle (Global vs Tournament) */}
        <div className="flex bg-slate-200/70 p-1.5 rounded-2xl shadow-inner border border-slate-300">
          <button
            onClick={() => setActiveView('global')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeView === 'global' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe size={16} /> Global
          </button>
          <button
            onClick={() => setActiveView('tournament')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeView === 'tournament' ? 'bg-white text-blue-700 shadow-md' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Medal size={16} /> Tournament
          </button>
        </div>
      </div>

      {/* 2. CONTROLS (Search & Filters) */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Reusable Search Component */}
        <SearchInput 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search player..." 
          variant="light" 
        />

        {/* Tournament Dropdown */}
        {activeView === 'tournament' && (
          <div className="w-full sm:w-auto flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
            <span className="text-sm font-black text-slate-700">Winter Open 2026</span>
            <ChevronDown size={16} className="text-slate-500" />
          </div>
        )}
      </div>

      {/* 3. THE LEADERBOARD TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-5 bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest">
          <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
          <div className="col-span-6 sm:col-span-5">Player</div>
          
          {activeView === 'global' ? (
            <>
              <div className="col-span-4 sm:col-span-2 text-center">Win Rate</div>
              <div className="hidden sm:block sm:col-span-2 text-center">Streak</div>
              <div className="hidden sm:block sm:col-span-2 text-right pr-4">Total Points</div>
            </>
          ) : (
            <>
              <div className="col-span-4 sm:col-span-2 text-center">W - L</div>
              <div className="hidden sm:block sm:col-span-2 text-center">Played</div>
              <div className="hidden sm:block sm:col-span-2 text-right pr-4">Pts</div>
            </>
          )}
        </div>

        {/* Loader, Empty State, or Table Rows */}
        {loading && activeView === 'global' ? (
          <SkeletonLoader text="Loading Ranks..." minHeight="min-h-[300px]" />
        ) : activeDataList.length === 0 ? (
          <EmptyState 
            icon={<Search size={48} />} 
            title="No players found" 
            subtitle={`No results matching "${searchQuery}"`} 
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {activeDataList.map((player, index) => (
              <PlayerRankRow 
                key={player.id} 
                player={player} 
                index={index} 
                activeView={activeView} 
                onClick={() => navigate(`/player/${player.id}`)} 
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Leaderboard;