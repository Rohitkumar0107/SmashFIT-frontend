import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

interface TournamentSidebarProps {
  tournament: any;
  startDate: string;
  deadlineDate: string;
  isRegistrationOpen: boolean;
}

const TournamentSidebar: React.FC<TournamentSidebarProps> = ({ tournament: t, startDate, deadlineDate, isRegistrationOpen }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
        Event Details
      </h3>
      
      <div className="space-y-6 mb-8">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Start Date</p>
            <p className="text-sm font-black text-slate-800 mt-0.5">{startDate}</p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Venue</p>
            <p className="text-sm font-black text-slate-800 mt-0.5 leading-tight">{t.location}</p>
            <a href="#" className="text-xs font-bold text-blue-600 hover:underline mt-1 inline-block">View on Map</a>
          </div>
        </div>

        {deadlineDate !== 'TBA' && (
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Registration Closes</p>
              <p className="text-sm font-black text-slate-800 mt-0.5">{deadlineDate}</p>
            </div>
          </div>
        )}
      </div>

      <button 
        disabled={!isRegistrationOpen}
        className={`w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 ${
          isRegistrationOpen 
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25' 
            : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none hover:translate-y-0'
        }`}
      >
        {isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
      </button>
      
      <p className="text-center text-[10px] font-bold text-slate-400 mt-4 uppercase tracking-widest">
        Secure payments handled by Razorpay
      </p>
    </div>
  );
};

export default TournamentSidebar;