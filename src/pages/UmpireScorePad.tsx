import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, CheckCircle, AlertTriangle } from 'lucide-react';
import { matchService } from '../services/match.service';
import SkeletonLoader from '../components/ui/SkeletonLoader';

const UmpireScorePad = () => {
    const { matchId } = useParams();
    const navigate = useNavigate();
    const [match, setMatch] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Local score states
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchMatch = async () => {
            if (!matchId || matchId === 'undefined') return;
            try {
                setLoading(true);
                const response = await matchService.getMatchById(matchId);
                if (response.success) {
                    setMatch(response.data);
                    // Initialize scores
                    const scores = response.data.scores || [];
                    if (scores.length > 0) {
                        const lastSetIdx = scores.length - 1;
                        setScoreA(scores[lastSetIdx].side_a_score || 0);
                        setScoreB(scores[lastSetIdx].side_b_score || 0);
                        setCurrentSet(scores[lastSetIdx].set_number || 1);
                    }
                }
            } catch (err) {
                console.error("Failed to load match for umpiring", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMatch();
    }, [matchId]);

    const handleScoreChange = async (side: 'A' | 'B', delta: number) => {
        if (!matchId) return;

        // Optimistic update
        if (side === 'A') setScoreA(prev => Math.max(0, prev + delta));
        if (side === 'B') setScoreB(prev => Math.max(0, prev + delta));

        setUpdating(true);
        try {
            const payload = {
                set_number: currentSet,
                side_a_score: side === 'A' ? Math.max(0, scoreA + delta) : scoreA,
                side_b_score: side === 'B' ? Math.max(0, scoreB + delta) : scoreB,
                // side_a_won: determine this logically if needed
            };
            await matchService.updateMatchScore(matchId, payload);
        } catch (err) {
            console.error("Score update failed", err);
            // Revert optimism if needed
        } finally {
            setUpdating(false);
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        if (!matchId) return;
        setUpdating(true);
        try {
            await matchService.updateMatchStatus(matchId, { status: newStatus });
            setMatch({ ...match, status: newStatus });
        } catch (err) {
            console.error("Status update failed", err);
        } finally {
            setUpdating(false);
        }
    };

    const handleNextSet = () => {
        setCurrentSet(prev => prev + 1);
        setScoreA(0);
        setScoreB(0);
    };

    if (loading) return <SkeletonLoader text="Loading Umpire Console..." minHeight="min-h-[80vh]" />;
    if (!match) return <div className="text-center py-20 text-xl font-bold">Match not found</div>;

    const sideAName = match.side_a?.participants?.map((p: any) => p.full_name).join(' / ') || 'Player 1';
    const sideBName = match.side_b?.participants?.map((p: any) => p.full_name).join(' / ') || 'Player 2';

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in pb-10">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-2">
                        <ArrowLeft size={18} /> Back
                    </button>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Umpire Console</h1>
                    <p className="text-slate-500 font-semibold mt-1">Court 1 • Match #{match?.match_number || (matchId ? matchId.substring(0, 4) : '---')}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleStatusChange("Live")}
                        disabled={match.status === "Live"}
                    >
                        Start Match
                    </button>
                    <button
                        onClick={() => handleStatusChange("Completed")}
                        className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg font-bold"
                    >
                        Finish
                    </button>
                </div>
            </div>

            {/* Main Scoring Area */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">

                {/* Connection status */}
                <div className="absolute top-4 right-6 flex items-center gap-2 text-emerald-400 text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {updating ? "Syncing..." : "Live Sync"}
                </div>

                <div className="text-center mb-10">
                    <span className="bg-white/10 text-white px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-sm">
                        Set {currentSet}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-800/50 rounded-2xl p-6">

                    {/* TEAM A */}
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-2xl text-white font-black text-center h-16 flex items-center">{sideAName}</h2>

                        <div className="bg-slate-950 w-full aspect-square max-w-[200px] rounded-3xl flex items-center justify-center border-4 border-slate-800">
                            <span className="text-8xl font-black text-white">{scoreA}</span>
                        </div>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => handleScoreChange('A', -1)}
                                className="flex-1 h-16 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-2xl flex items-center justify-center transition-all active:scale-95"
                            >
                                <Minus size={32} />
                            </button>
                            <button
                                onClick={() => handleScoreChange('A', 1)}
                                className="flex-[2] h-16 bg-blue-600 text-white hover:bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                            >
                                <Plus size={32} />
                            </button>
                        </div>
                    </div>

                    {/* TEAM B */}
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-2xl text-white font-black text-center h-16 flex items-center">{sideBName}</h2>

                        <div className="bg-slate-950 w-full aspect-square max-w-[200px] rounded-3xl flex items-center justify-center border-4 border-slate-800">
                            <span className="text-8xl font-black text-white">{scoreB}</span>
                        </div>

                        <div className="flex gap-4 w-full">
                            <button
                                onClick={() => handleScoreChange('B', -1)}
                                className="flex-1 h-16 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-2xl flex items-center justify-center transition-all active:scale-95"
                            >
                                <Minus size={32} />
                            </button>
                            <button
                                onClick={() => handleScoreChange('B', 1)}
                                className="flex-[2] h-16 bg-blue-600 text-white hover:bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                            >
                                <Plus size={32} />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleNextSet}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-all"
                    >
                        <CheckCircle size={20} /> Next Set
                    </button>
                </div>

            </div>

            {/* Admin actions */}
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                <h3 className="text-orange-900 font-bold mb-4 flex gap-2 items-center"><AlertTriangle size={20} /> Match Disputes & Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <button className="px-5 py-2.5 bg-white border border-orange-200 text-orange-900 font-bold rounded-lg shadow-sm hover:bg-orange-100">Raise Dispute</button>
                    <button className="px-5 py-2.5 bg-white border border-red-200 text-red-700 font-bold rounded-lg shadow-sm hover:bg-red-50">Cancel Match</button>
                </div>
            </div>

        </div>
    );
};

export default UmpireScorePad;
