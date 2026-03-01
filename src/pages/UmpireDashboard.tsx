import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, ArrowRight } from "lucide-react";
import { matchService } from "../services/match.service";
import SkeletonLoader from "../components/ui/SkeletonLoader";

const UmpireDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [liveMatches, setLiveMatches] = useState<any[]>([]);

    useEffect(() => {
        const fetchLive = async () => {
            try {
                setLoading(true);
                const response = await matchService.getAllMatches();
                if (response.success) {
                    const live = (response.data || []).filter((m: any) => m.status?.toUpperCase() === "LIVE");
                    setLiveMatches(live);
                }
            } catch {
                setLiveMatches([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLive();
    }, []);

    if (loading) return <SkeletonLoader text="Loading Umpire Dashboard..." minHeight="min-h-[60vh]" />;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">
            <div className="border-b border-slate-200 pb-4">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                    <ClipboardCheck className="text-emerald-500" /> Umpire Dashboard
                </h1>
                <p className="text-slate-500 mt-1 font-semibold text-sm">Select a live match to start scoring.</p>
            </div>

            {liveMatches.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 sm:p-16 text-center">
                    <ClipboardCheck size={48} className="mx-auto text-slate-300 mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No Live Matches</h2>
                    <p className="text-slate-500 mb-6">There are no matches currently in progress. Check back when a match goes live.</p>
                    <button onClick={() => navigate("/matches")} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
                        View All Matches
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {liveMatches.map((match) => (
                        <button
                            key={match.id}
                            onClick={() => navigate(`/umpire/${match.id}`)}
                            className="w-full bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex items-center justify-between hover:shadow-md hover:border-emerald-200 transition-all text-left group"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                    <ClipboardCheck size={22} />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-slate-900 truncate text-sm sm:text-base">
                                        {match.side_a_name || "Player A"} vs {match.side_b_name || "Player B"}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                                        {match.tournament_name || "Tournament"} • Court {match.court_number || "—"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="hidden sm:inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                                    LIVE
                                </span>
                                <ArrowRight size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UmpireDashboard;
