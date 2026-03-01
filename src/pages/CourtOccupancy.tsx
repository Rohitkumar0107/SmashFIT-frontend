import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search, Plus, Filter, Play } from "lucide-react";
import { venueService } from "../services/venue.service";
import SkeletonLoader from "../components/ui/SkeletonLoader";

const CourtOccupancy = () => {
    const { id: tournamentId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [courts, setCourts] = useState<any[]>([]);

    useEffect(() => {
        const fetchOccupancy = async () => {
            if (!tournamentId) return;
            try {
                setLoading(true);
                // Get court occupancy dashboard data
                const response = await venueService.getCourtOccupancy(tournamentId);
                if (response.success && response.data) {
                    setCourts(response.data.courts || []);
                } else {
                    // Fallback UI State if no backend yet initialized:
                    setCourts([
                        { id: "1", name: "Court 1", status: "Live", current_match: { match_number: "M12", p1: "Raj / Sneha", p2: "Amit / Pooja", time_elapsed: "45m" } },
                        { id: "2", name: "Court 2", status: "Available", current_match: null },
                        { id: "3", name: "Court 3", status: "Live", current_match: { match_number: "M14", p1: "Kiran R.", p2: "Deepak S.", time_elapsed: "12m" } },
                        { id: "4", name: "Court 4", status: "Maintenance", current_match: null },
                    ]);
                }
            } catch (err) {
                console.error("Court occupancy load failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOccupancy();
    }, [tournamentId]);

    if (loading) return <SkeletonLoader text="Loading Courts..." minHeight="min-h-[70vh]" />;

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-2 transition-colors"
                    >
                        <ArrowLeft size={18} /> Back
                    </button>
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                        <MapPin className="text-blue-500" /> Court Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1 font-semibold">Real-time occupancy & assignment matrix</p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                        <Filter size={18} /> Filter
                    </button>
                    <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all transform active:scale-95 shadow-sm">
                        <Plus size={18} /> Add Court
                    </button>
                </div>
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Courts", value: courts.length || 0, color: "bg-blue-50 text-blue-700" },
                    { label: "Live Matches", value: courts.filter(c => c.status === 'Live').length || 0, color: "bg-emerald-50 text-emerald-700" },
                    { label: "Available", value: courts.filter(c => c.status === 'Available').length || 0, color: "bg-slate-100 text-slate-700" },
                    { label: "Maintenance", value: courts.filter(c => c.status === 'Maintenance').length || 0, color: "bg-red-50 text-red-700" },
                ].map((stat, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border border-white border-opacity-50 shadow-sm ${stat.color}`}>
                        <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">{stat.label}</p>
                        <p className="text-3xl font-black">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* COURTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courts.length > 0 ? courts.map((court, idx) => (
                    <div key={idx} className={`rounded-3xl border overflow-hidden shadow-sm transition-all hover:shadow-md
            ${court.status === 'Live' ? 'border-emerald-200 bg-white' :
                            court.status === 'Available' ? 'border-slate-200 bg-slate-50' :
                                'border-red-200 bg-red-50/50'}
          `}>

                        {/* Court Header */}
                        <div className={`p-4 flex justify-between items-center border-b ${court.status === 'Live' ? 'bg-emerald-50/50 border-emerald-100' : 'border-slate-100'
                            }`}>
                            <h3 className="font-black text-xl text-slate-900">{court.name}</h3>
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5
                ${court.status === 'Live' ? 'bg-emerald-100 text-emerald-700' :
                                    court.status === 'Available' ? 'bg-slate-200 text-slate-700' :
                                        'bg-red-100 text-red-700'}
              `}>
                                {court.status === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                                {court.status}
                            </span>
                        </div>

                        {/* Content Area */}
                        <div className="p-5">
                            {court.status === 'Live' && court.current_match ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
                                        <span>Match #{court.current_match.match_number}</span>
                                        <span className="flex items-center gap-1 text-emerald-600"><Play size={10} className="fill-current" /> {court.current_match.time_elapsed}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-bold text-slate-800 text-sm truncate">
                                            {court.current_match.p1}
                                        </div>
                                        <div className="text-center text-xs font-black text-slate-400 italic">VS</div>
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-bold text-slate-800 text-sm truncate">
                                            {court.current_match.p2}
                                        </div>
                                    </div>
                                    <button onClick={() => navigate(`/umpire/${court.current_match.id || 'upcoming'}`)} className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl shadow-sm transition-colors text-sm">
                                        View Umpire Pad
                                    </button>
                                </div>
                            ) : court.status === 'Available' ? (
                                <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                                    <p className="text-slate-500 font-medium">Ready for next match</p>
                                    <button className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 font-bold px-4 py-2 rounded-xl transition-colors text-sm">
                                        Assign Match
                                    </button>
                                </div>
                            ) : (
                                <div className="py-10 text-center">
                                    <p className="text-red-500 font-bold opacity-80">Requires maintenance</p>
                                </div>
                            )}
                        </div>

                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center bg-white border border-dashed border-slate-300 rounded-3xl">
                        <Search size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Courts Found</h3>
                        <p className="text-slate-500">You haven't defined any courts for this tournament yet.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default CourtOccupancy;
