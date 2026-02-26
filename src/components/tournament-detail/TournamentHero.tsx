import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Trophy } from 'lucide-react';

interface TournamentHeroProps {
  tournament: any;
  isRegistrationOpen: boolean;
}

const TournamentHero: React.FC<TournamentHeroProps> = ({ tournament: t, isRegistrationOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[40vh] min-h-[300px] md:h-[50vh] w-full md:rounded-[3rem] overflow-hidden shadow-2xl mb-8 -mx-4 md:mx-0 w-[calc(100%+2rem)] md:w-full bg-slate-900">
      <img src={t.banner} alt={t.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <button 
          onClick={() => navigate('/tournaments')}
          className="w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <button className="w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all">
          <Share2 size={18} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md border ${
            isRegistrationOpen ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' : 'bg-red-500/20 text-red-300 border-red-500/50'
          }`}>
            {isRegistrationOpen ? 'Registration Open' : 'Registration Closed'}
          </span>
          {t.prizePool && (
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 text-xs font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5">
              <Trophy size={12} /> {t.prizePool} Prize
            </span>
          )}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2 leading-tight">
          {t.name}
        </h1>
        <p className="text-slate-300 font-bold text-sm md:text-base flex items-center gap-2">
          By <span className="text-white">{t.organizer}</span>
        </p>
      </div>
    </div>
  );
};

export default TournamentHero;