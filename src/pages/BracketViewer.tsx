import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, GitMerge, Loader2, Trophy } from "lucide-react";
import { bracketService } from "../services/bracket.service";

const BracketViewer = () => {
    const { id: tournamentId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bracketData, setBracketData] = useState<any>(null);

    useEffect(() => {
        const fetchBrackets = async () => {
            if (!tournamentId) return;
            try {
                setLoading(true);
                const data = await bracketService.getBracketVisualData(tournamentId);
                setBracketData(data.data || { rounds: [] }); // Assume the backend returns a rounds array
            } catch (err) {
                console.error("Failed to load brackets", err);
                setBracketData({ rounds: [] });
            } finally {
                setLoading(false);
            }
        };
        fetchBrackets();
    }, [tournamentId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-bold mt-4">Generating Tournament Brackets...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[100vw] overflow-x-auto min-h-[80vh] bg-slate-50 p-4 md:p-8">

            {/* Header */}
            <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-2 transition-colors"
                    >
                        <ArrowLeft size={18} /> Back to Tournament
                    </button>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
                        <GitMerge className="text-blue-500 hidden sm:block" /> Tournament Draw
                    </h1>
                </div>
            </div>

            {/* Bracket Area (Simplified Visual Representation) */}
            <div className="max-w-7xl mx-auto flex gap-12 sm:gap-24 overflow-x-auto pb-10">

                {bracketData?.rounds?.length > 0 ? (
                    bracketData.rounds.map((round: any, roundIndex: number) => (
                        <div key={roundIndex} className="flex flex-col justify-around min-w-[250px] sm:min-w-[300px]">

                            {/* Round Title */}
                            <h3 className="text-center font-black text-slate-500 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">
                                {round.name || `Round ${roundIndex + 1}`}
                            </h3>

                            {/* Matchups in this round */}
                            {round.matches.map((match: any, matchIndex: number) => (
                                <div key={matchIndex} className="relative mb-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">

                                    {/* Connectors (Simulated with simple CSS if needed, skipped for pure Tailwind UI block) */}

                                    {/* Top Player/Team */}
                                    <div className={`p-3 border-b border-slate-100 flex justify-between items-center ${match.winner_id === match.top_seed?.id ? 'bg-blue-50' : ''}`}>
                                        <span className="font-bold text-slate-800 truncate">{match.top_seed?.name || "TBD"}</span>
                                        <span className="font-black text-slate-900 bg-slate-100 px-2 rounded">{match.top_score || "-"}</span>
                                    </div>

                                    {/* Bottom Player/Team */}
                                    <div className={`p-3 flex justify-between items-center ${match.winner_id === match.bottom_seed?.id ? 'bg-blue-50' : ''}`}>
                                        <span className="font-bold text-slate-800 truncate">{match.bottom_seed?.name || "TBD"}</span>
                                        <span className="font-black text-slate-900 bg-slate-100 px-2 rounded">{match.bottom_score || "-"}</span>
                                    </div>

                                    {/* Match Info Strip */}
                                    <div className="bg-slate-900 text-white text-[10px] uppercase font-bold text-center px-2 py-1 flex justify-between items-center">
                                        <span>M# {match.match_number || "---"}</span>
                                        <span className={match.status === 'Live' ? 'text-emerald-400' : 'text-slate-400'}>{match.status || 'Upcoming'}</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="w-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed border-slate-300">
                        <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                            <Trophy size={40} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Draw Not Released</h2>
                        <p className="text-slate-500 text-center max-w-md">The tournament brackets and seedings have not been generated yet. Please check back later after registrations close.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default BracketViewer;
