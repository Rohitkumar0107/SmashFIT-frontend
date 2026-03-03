import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, Trophy, Users, Search, Activity, ChevronRight, Star, Bell } from 'lucide-react';
import { tournamentService } from '../services/tournament.service';
import { matchService } from '../services/match.service';

export default function DashboardNew() {
    const [tournaments, setTournaments] = useState<any[]>([]);
    const [liveMatches, setLiveMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch tournaments
                const fetchedTournaments = await tournamentService.getAll();
                setTournaments(fetchedTournaments.slice(0, 3));

                // Fetch real matches and filter for Live ones
                const matchRes = await matchService.getAllMatches();
                if (matchRes.success && matchRes.data) {
                    const live = matchRes.data.filter((m: any) => m.status?.toUpperCase() === 'LIVE');
                    setLiveMatches(live.slice(0, 4)); // Get top 4 live matches
                }

            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const followingDummy = [
        { name: 'Sarah Jenkins', status: 'Playing Now', court: 'Crt 2', color: 'text-green-600', bg: 'bg-green-50 border-green-200' },
        { name: 'Mike Peters', status: 'Next @ 2:00 PM', court: 'Crt 5', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' },
        { name: 'Alex Wong', status: 'Finished (Won)', court: '-', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
        { name: 'Emma Davis', status: 'Eliminated', court: '-', color: 'text-slate-500', bg: 'bg-slate-100 border-slate-200' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* 1. Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                        Live <span className="text-blue-600">Spectator</span> Feed
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Catch all the action live as it happens.</p>
                </div>
            </header>

            {/* 2. Hero Section: Live Action */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-red-500 animate-pulse" />
                        Live Center Court
                    </h2>
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center transition-colors">
                        View Bracket <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {loading ? (
                        <div className="col-span-full flex justify-center items-center h-48">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : liveMatches && liveMatches.length > 0 ? (
                        liveMatches.map((match: any) => (
                            <div key={match.id} className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-300 transition-all shadow-sm flex flex-col justify-between">

                                <div className="flex justify-between items-center mb-6">
                                    <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-black rounded-full border border-red-200 flex items-center gap-1.5 uppercase tracking-wide truncate max-w-[50%]">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
                                        {match.court ? `Court ${match.court}` : 'LIVE'} • {match.round_name || 'Match'}
                                    </span>
                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider truncate max-w-[45%] text-right">{match.tournament_name || 'Tournament'}</span>
                                </div>

                                <div className="flex justify-between items-center flex-grow">
                                    {/* Player 1 */}
                                    <div className="flex flex-col items-center flex-1 w-1/3">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-4 border-white shadow-sm overflow-hidden mb-3">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.side_a_players?.[0]?.name || 'P1'}`} alt="Player 1" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-black text-slate-800 text-sm sm:text-base text-center line-clamp-2">{match.side_a_players?.[0]?.name || 'TBD'}</span>
                                    </div>

                                    {/* Score & VS */}
                                    <div className="flex flex-col items-center px-2 sm:px-4 w-1/3 shrink-0">
                                        <div className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tighter whitespace-nowrap">
                                            <span className="text-blue-600">{match.scores?.[0]?.side_a_score || 0}</span> - {match.scores?.[0]?.side_b_score || 0}
                                        </div>
                                        <div className="text-slate-400 font-black italic text-sm mt-1">VS</div>
                                    </div>

                                    {/* Player 2 */}
                                    <div className="flex flex-col items-center flex-1 w-1/3">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-4 border-white shadow-sm overflow-hidden mb-3">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${match.side_b_players?.[0]?.name || 'P2'}`} alt="Player 2" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-black text-slate-800 text-sm sm:text-base text-center line-clamp-2">{match.side_b_players?.[0]?.name || 'TBD'}</span>
                                    </div>
                                </div>

                                <Link to={`/matches/${match.id}`} className="mt-8">
                                    <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/20 flex justify-center items-center gap-2">
                                        <Play className="w-4 h-4 fill-white shrink-0" /> Watch Live & Details
                                    </button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 relative flex flex-col items-center justify-center text-center shadow-sm h-[300px]">
                            <Activity className="w-12 h-12 text-slate-300 mb-4" />
                            <h3 className="font-black text-slate-800 text-lg mb-2">No Live Matches</h3>
                            <p className="text-sm font-bold text-slate-500 max-w-xs">There are no matches happening right now. Check back later!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 3. My Players (Favorites) */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> Following Players
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {followingDummy.map((player, i) => (
                        <div key={i} className={`border rounded-xl p-4 transition-all hover:shadow-md cursor-pointer ${player.bg}`}>
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 mb-3 overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} alt={player.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-sm text-slate-800 truncate mb-1">{player.name}</h3>
                            <div className="flex justify-between items-end">
                                <span className={`text-[10px] font-black uppercase tracking-wider ${player.color}`}>{player.status}</span>
                                {player.court !== '-' && <span className="text-xs text-slate-500 font-bold">{player.court}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Upcoming Tournaments */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-purple-500" /> Featured Tournaments
                    </h2>
                </div>

                {loading ? (
                    <div className="flex justify-center my-10"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {tournaments && tournaments.length > 0 ? tournaments.map((tourney, i) => (
                            <div key={tourney.id || i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-purple-300 transition-all shadow-sm hover:shadow-md group flex flex-col">
                                <div className="h-32 bg-slate-100 relative overflow-hidden">
                                    {/* Nice placeholder gradient since we don't have images yet */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-100 z-10"></div>
                                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] z-10"></div>
                                    <span className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-white shadow-sm text-[10px] font-black uppercase tracking-widest rounded-md text-slate-700 border border-slate-200">
                                        {tourney.status || 'Upcoming'}
                                    </span>
                                    {/* Icon center */}
                                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Trophy className="w-6 h-6 text-purple-500" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-black text-lg text-slate-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 leading-tight">
                                        {tourney.name}
                                    </h3>
                                    <div className="flex flex-col gap-2 text-xs font-bold text-slate-500 mb-6 mt-1 flex-1">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {tourney.start_date ? new Date(tourney.start_date).toLocaleDateString() : 'Dates TBD'}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-slate-400" />
                                            Open Registration
                                        </span>
                                    </div>
                                    <Link to={`/tournaments/${tourney.id}`} className="mt-auto">
                                        <button className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-sm font-bold transition-colors">
                                            View Event Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-1 md:col-span-3 border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                                <Trophy className="w-10 h-10 text-slate-300 mb-3" />
                                <p className="text-slate-500 font-bold">No featured tournaments right now.</p>
                                <p className="text-slate-400 text-sm mt-1">Check back later for exciting events.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

        </div>
    );
}
