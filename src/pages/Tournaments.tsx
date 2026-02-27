import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, MapPin, Search, Loader2, Users, ArrowRight } from 'lucide-react';
import { tournamentService } from '../services/tournament.service';

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const data = await tournamentService.getAll();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  // Helper to format date nicely (e.g., "10 Apr 2026")
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const filteredTournaments = tournaments.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.location && t.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto py-8 animate-in fade-in duration-500">
      
      {/* 🌟 Premium Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2 sm:gap-3">
            Upcoming Tournaments
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 font-medium mt-1.5 sm:mt-2">Find and register for the best badminton events around you.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80 z-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} className="sm:w-5 sm:h-5" />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 sm:py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 🚀 State Handling */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20">
          <Loader2 className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600 animate-spin mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-slate-500 font-bold tracking-wide">Loading amazing events...</p>
        </div>
      ) : filteredTournaments.length > 0 ? (
        
        /* 🏟️ Tournaments Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredTournaments.map((tournament) => (
            <Link 
              to={`/tournaments/${tournament.id}`} 
              key={tournament.id}
              className="group flex flex-col bg-white rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 border border-slate-200/60 transition-all duration-300 overflow-hidden"
            >
              {/* Banner Image Area */}
              <div className="h-32 sm:h-40 md:h-48 w-full bg-slate-100 relative overflow-hidden">
                {tournament.banner_url ? (
                  <img src={tournament.banner_url} alt={tournament.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                )}
                
                {/* Format Badge (e.g., KNOCKOUT) */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/20">
                  <span className="text-[10px] font-black tracking-widest text-slate-800 uppercase">
                    {tournament.tournament_type || 'OPEN'}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-1 relative">
                
                {/* Organization Logo (Overlapping) */}
                <div className="absolute -top-8 right-6 w-14 h-14 bg-white rounded-xl shadow-md border border-slate-100 p-1 flex items-center justify-center overflow-hidden">
                  {tournament.org_logo ? (
                    <img src={tournament.org_logo} alt={tournament.organization_name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Trophy className="text-blue-500 w-6 h-6" />
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-1 pr-12 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {tournament.name}
                </h3>
                
                <p className="text-sm font-bold text-blue-600 mb-4 truncate">
                  By {tournament.organization_name || 'SmashFIT Organizer'}
                </p>

                <div className="space-y-2.5 mt-auto">
                  <div className="flex items-center gap-2.5 text-slate-600 text-sm font-medium">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Calendar size={16} className="text-blue-500" />
                    </div>
                    <span>{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2.5 text-slate-600 text-sm font-medium">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-indigo-500" />
                    </div>
                    <span className="truncate">{tournament.location}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
                    <span>Deadline:</span> {formatDate(tournament.registration_deadline)}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* 📭 Empty State */
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Trophy className="text-slate-300 w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-800">No Tournaments Found</h3>
          <p className="text-slate-500 font-medium mt-2">
            {searchQuery ? `We couldn't find any match for "${searchQuery}".` : "There are no live tournaments right now. Check back later!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TournamentsPage;