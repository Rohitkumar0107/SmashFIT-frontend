import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, MapPin, Trophy, Users, AlertCircle, 
  Loader2, CheckCircle2, Clock, Activity
} from 'lucide-react';
import { tournamentService } from '../services/tournament.service';

const TournamentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [tournament, setTournament] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Registration States
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [regMessage, setRegMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await tournamentService.getById(id);
        setTournament(data);
      } catch (err: any) {
        setError('Failed to load tournament details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const handleRegister = async (categoryId: string) => {
    try {
      setRegisteringId(categoryId);
      setRegMessage({ type: '', text: '' });
      
      await tournamentService.register(categoryId);
      
      setRegMessage({ type: 'success', text: 'Successfully registered for the event!' });
      
      // Optimitiscally update slots
      setTournament((prev: any) => ({
        ...prev,
        categories: prev.categories.map((cat: any) => 
          cat.id === categoryId ? { ...cat, current_slots: cat.current_slots + 1 } : cat
        )
      }));

    } catch (err: any) {
      setRegMessage({ type: 'error', text: err.response?.data?.message || err.message || 'Registration failed.' });
    } finally {
      setRegisteringId(null);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA'; // 👈 Safefall for missing dates
    return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]"><Loader2 className="w-12 h-12 text-blue-600 animate-spin" /></div>
  );

  if (error || !tournament) return (
    <div className="text-center mt-20"><h2 className="text-2xl font-bold text-red-500">Tournament not found</h2></div>
  );

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-12 px-4">
      
      {/* 🔙 Back Button */}
      <button onClick={() => navigate('/tournaments')} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-6 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-200 transition-all">
        <ArrowLeft size={18} /> Back to Tournaments
      </button>

      {/* 🌟 Top Banner Section */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="h-40 sm:h-56 md:h-64 lg:h-80 w-full bg-slate-100 relative">
          {tournament.banner_url ? (
            <img src={tournament.banner_url} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          )}
          {/* Status Badge */}
          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/20">
            <span className={`text-xs font-black tracking-widest uppercase flex items-center gap-2 ${tournament.status === 'COMPLETED' ? 'text-green-600' : 'text-blue-600'}`}>
              <Activity size={16}/> {tournament.status || 'UPCOMING'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-black text-slate-900 mb-2 sm:mb-3 md:mb-4 tracking-tight">{tournament.name}</h1>
          <p className="text-base sm:text-lg text-blue-600 font-bold mb-4 sm:mb-6 md:mb-8">Hosted by {tournament.organization_name || 'SmashFIT Academy'}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 md:p-5 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0"><Calendar size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /></div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Dates</p>
                <p className="font-bold text-xs sm:text-sm md:text-base text-slate-800">{formatDate(tournament.start_date)} <br className="hidden sm:inline" /> {formatDate(tournament.end_date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 md:p-5 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0"><MapPin size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /></div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Location</p>
                <p className="font-bold text-xs sm:text-sm md:text-base text-slate-800 truncate pr-2">{tournament.location || 'Location TBA'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 bg-slate-50 p-3 sm:p-4 md:p-5 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0"><Trophy size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /></div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5 sm:mb-1">Format</p>
                <p className="font-bold text-xs sm:text-sm md:text-base text-slate-800">{tournament.tournament_type} <br className="hidden sm:inline" /> <span className="text-slate-500 font-medium text-[10px] sm:text-xs">{tournament.shuttle_type || 'FEATHER'} Shuttle</span></p>
              </div>
            </div>
          </div>

          {tournament.description && (
            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">About the Event</h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-slate-50 p-4 sm:p-6 md:p-8 rounded-[2rem] border border-slate-100">
                {tournament.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 🏸 Categories & Registration Section (Fixed Structure) */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-4 sm:p-6 md:p-8 lg:p-10">
        
        {/* Header inside the container */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-3 md:gap-4 border-b border-slate-100 pb-4 md:pb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2 sm:gap-3">
            <Users className="text-blue-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" size={28} />
            Playable Categories
          </h2>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl w-fit">
            <Clock size={16} className="w-3 h-3 sm:w-4 sm:h-4" /> Deadline: {formatDate(tournament.registration_deadline)}
          </div>
        </div>

        {/* Global Action Message */}
        {regMessage.text && (
          <div className={`mb-6 md:mb-8 p-3 sm:p-4 rounded-xl border font-bold flex items-center gap-2 sm:gap-3 shadow-sm text-xs sm:text-sm ${regMessage.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
            {regMessage.type === 'error' ? <AlertCircle size={20} className="sm:w-6 sm:h-6 shrink-0" /> : <CheckCircle2 size={20} className="sm:w-6 sm:h-6 shrink-0" />}
            {regMessage.text}
          </div>
        )}

        {/* Category Cards */}
        {tournament.categories && tournament.categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {tournament.categories.map((cat: any) => {
              const currentSlots = Number(cat.current_slots) || 0;
              const maxSlots = Number(cat.max_slots) || 0;
              const isFull = currentSlots >= maxSlots;
              
              return (
                <div key={cat.id} className={`rounded-2xl p-4 sm:p-5 md:p-6 border transition-all relative overflow-hidden ${isFull ? 'bg-slate-50 border-slate-200' : 'bg-white border-blue-100 hover:border-blue-300 shadow-sm hover:shadow-md'}`}>
                  {isFull && <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-red-500"></div>}
                  {!isFull && <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-blue-500"></div>}
                  
                  <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-6 mt-1 sm:mt-2">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-800 mb-0.5 sm:mb-1">{cat.category_name}</h3>
                      <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">{cat.match_type}</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-xl font-black text-sm sm:text-lg md:text-xl flex items-center shadow-sm">
                      ₹{cat.entry_fee}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 bg-slate-100/50 p-3 sm:p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-600 font-bold text-xs sm:text-sm">
                      <Users size={16} className={`${isFull ? 'text-red-500' : 'text-blue-500'} w-4 h-4 sm:w-5 sm:h-5`} />
                      <span>Slots Filled</span>
                    </div>
                    <div className="font-black text-sm sm:text-base md:text-lg text-slate-800">
                      <span className={isFull ? 'text-red-500' : 'text-blue-600'}>{currentSlots}</span> 
                      <span className="text-slate-400 mx-1">/</span> 
                      {maxSlots}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleRegister(cat.id)}
                    disabled={isFull || registeringId === cat.id}
                    className={`w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 transition-all shadow-sm ${
                      isFull 
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20 hover:shadow-lg active:scale-95'
                    }`}
                  >
                    {registeringId === cat.id ? <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" /> : null}
                    {isFull ? 'SOLD OUT' : 'Register Now'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-bold">No categories added for this tournament yet.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default TournamentDetailPage;