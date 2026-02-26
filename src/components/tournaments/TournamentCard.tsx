import React from 'react';
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react';

interface TournamentCardProps {
  tournament: any;
  onClick: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament, onClick }) => {
  let badgeColor = "bg-slate-100 text-slate-700 border-slate-200";
  let statusText = tournament.status;
  let isLive = false;

  if (tournament.status === 'LIVE' || tournament.status === 'ONGOING') {
    badgeColor = "bg-red-500 text-white border-red-600 shadow-md shadow-red-500/20";
    statusText = "Live Now";
    isLive = true;
  } else if (tournament.status === 'REGISTRATION_OPEN') {
    badgeColor = "bg-blue-500 text-white border-blue-600 shadow-md shadow-blue-500/20";
    statusText = "Registering";
  } else if (tournament.status === 'COMPLETED') {
    badgeColor = "bg-slate-800 text-slate-300 border-slate-700";
    statusText = "Completed";
  }

  const formattedDate = new Date(tournament.startDate).toLocaleDateString([], { 
    day: 'numeric', month: 'short', year: 'numeric' 
  });

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="h-48 relative overflow-hidden bg-slate-100">
        <img 
          src={tournament.banner} 
          alt={tournament.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
        
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 backdrop-blur-md ${badgeColor}`}>
          {isLive && <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute"></span>}
          {isLive && <span className="w-1.5 h-1.5 bg-white rounded-full relative"></span>}
          {statusText}
        </div>

        <div className="absolute bottom-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-xl text-xs font-black shadow-lg">
          {tournament.prizePool || 'Glory & Honor'}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
          {tournament.name}
        </h3>
        
        <div className="space-y-2.5 mb-6 flex-grow">
          <div className="flex items-start gap-3 text-slate-600">
            <Calendar size={16} className="mt-0.5 text-blue-500" />
            <span className="text-sm font-bold">{formattedDate}</span>
          </div>
          <div className="flex items-start gap-3 text-slate-600">
            <MapPin size={16} className="mt-0.5 text-blue-500 flex-shrink-0" />
            <span className="text-sm font-bold line-clamp-1">{tournament.location}</span>
          </div>
          <div className="flex items-start gap-3 text-slate-600">
            <Users size={16} className="mt-0.5 text-blue-500" />
            <span className="text-sm font-bold">{tournament.participants || 0} Participants</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">View Details</span>
          <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
            <ChevronRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;