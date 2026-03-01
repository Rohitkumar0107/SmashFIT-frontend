import { useState, useEffect } from "react";
import { Users, Plus, Loader2 } from "lucide-react";
import { teamService } from "../services/team.service";
import SkeletonLoader from "../components/ui/SkeletonLoader";

const Teams = () => {
    const [loading, setLoading] = useState(false); // Can be tied to a fetch endpoint later
    const [teams, setTeams] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newTeam, setNewTeam] = useState({ name: "", type: "Doubles" });
    const [creating, setCreating] = useState(false);

    // We are waiting for a GET /api/teams endpoint from backend to be fully mapped,
    // but for now, we'll just show an empty state or allow creation
    useEffect(() => {
        // Simulated fetch
        setLoading(false);
    }, []);

    const handleCreateTeam = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            const created = await teamService.createTeam(newTeam);
            setTeams([...teams, created]);
            setShowModal(false);
            setNewTeam({ name: "", type: "Doubles" });
        } catch (error) {
            console.error("Failed to create team", error);
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return <SkeletonLoader text="Loading Teams..." minHeight="min-h-[60vh]" />;
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">My Teams</h1>
                    <p className="text-slate-500">Manage your doubles and mixed teams for tournaments.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all transform active:scale-95"
                >
                    <Plus size={18} /> Create Team
                </button>
            </div>

            {teams.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
                        <Users size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">No Teams Yet</h2>
                    <p className="text-slate-500 max-w-md mx-auto">You haven't created or joined any teams. Create a team to register for doubles tournaments.</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold"
                    >
                        Create Your First Team
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-xl uppercase">
                                    {team.name ? team.name.substring(0, 2) : "TM"}
                                </div>
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                                    {team.type}
                                </span>
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-slate-900">{team.name}</h3>
                            <p className="text-sm text-slate-500 mt-1">2 Members</p>
                            <button className="mt-4 w-full py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold transition-colors">
                                Manage Roster
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* CREATE MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">Create New Team</h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">&times;</button>
                        </div>

                        <form onSubmit={handleCreateTeam} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Team Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Smashers CC"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newTeam.name}
                                    onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Team Type</label>
                                <select
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newTeam.type}
                                    onChange={(e) => setNewTeam({ ...newTeam, type: e.target.value })}
                                >
                                    <option>Doubles (Men)</option>
                                    <option>Doubles (Women)</option>
                                    <option>Mixed Doubles</option>
                                    <option>Team Event (Multiple Matches)</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={creating || !newTeam.name}
                                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                                >
                                    {creating && <Loader2 className="w-5 h-5 animate-spin" />}
                                    Create Team
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Teams;
