import React from 'react';
import { MapPin, Users, Clock } from 'lucide-react';

interface ScoreboardCardProps {
  match: any;
  isLive: boolean;
  isUpcoming: boolean;
  currentSet: { side_a_score: number; side_b_score: number };
}

const ScoreboardCard: React.FC<ScoreboardCardProps> = ({ match, isLive, isUpcoming, currentSet }) => {
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden text-white border-4 border-slate-800">
      {/* Background Decoration */}
      <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[200%] bg-blue-600/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[200%] bg-purple-600/10 blur-[100px] rounded-full"></div>

      {/* Match Meta Info */}
      <div className="relative text-center mb-10">
        <h2 className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-2">{match.tournament_name}</h2>
        <div className="flex items-center justify-center gap-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1"><MapPin size={14}/> {match.court_name}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Users size={14}/> {match.category} - {match.round_name}</span>
        </div>
      </div>

      {/* The Battle Area */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* SIDE A */}
        <PlayerSide 
          players={match.side_a_players} 
          isServing={match.serving_side === 'Side_A' && isLive} 
          isWinner={match.winner_side === 'Side_A'}
        />

        {/* CENTRAL SCORE / VS */}
        <div className="flex flex-col items-center justify-center min-w-[150px]">
          {isUpcoming ? (
            <div className="text-center">
              <div className="text-5xl font-black text-slate-600 italic tracking-tighter mb-2">VS</div>
              <div className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                <Clock size={16} className="text-blue-400"/>
                {new Date(match.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <span className={`text-7xl font-black tabular-nums tracking-tighter ${currentSet.side_a_score > currentSet.side_b_score ? 'text-white' : 'text-slate-400'}`}>
                {currentSet.side_a_score}
              </span>
              <span className="text-3xl text-slate-600 font-black">-</span>
              <span className={`text-7xl font-black tabular-nums tracking-tighter ${currentSet.side_b_score > currentSet.side_a_score ? 'text-white' : 'text-slate-400'}`}>
                {currentSet.side_b_score}
              </span>
            </div>
          )}
        </div>

        {/* SIDE B */}
        <PlayerSide 
          players={match.side_b_players} 
          isServing={match.serving_side === 'Side_B' && isLive}
          isWinner={match.winner_side === 'Side_B'}
          reverse={true} 
        />
      </div>
    </div>
  );
};

// Internal Sub-Component strictly for the Scoreboard
const PlayerSide = ({ players, isServing, isWinner, reverse = false }: { players: any[], isServing: boolean, isWinner: boolean, reverse?: boolean }) => {
  if (!players || players.length === 0) return <div className="flex-1 text-center text-slate-500 font-bold">TBD</div>;

  return (
    <div className={`flex flex-1 ${reverse ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'} items-center gap-6 text-center ${reverse ? 'md:text-right' : 'md:text-left'}`}>
      
      {/* Avatars */}
      <div className="flex justify-center -space-x-4 relative">
        {players.map((p: any, index: number) => (
          <img 
            key={p.id}
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`} 
            alt={p.name}
            className={`w-20 h-20 rounded-full border-4 border-slate-900 bg-slate-800 shadow-xl relative ${index === 0 ? 'z-10' : 'z-0'}`}
          />
        ))}
        {/* Serving Indicator */}
        {isServing && (
          <div className={`absolute -bottom-2 ${reverse ? '-left-2' : '-right-2'} w-6 h-6 bg-blue-500 rounded-full border-4 border-slate-900 z-20 flex items-center justify-center`}>
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
          </div>
        )}
      </div>

      {/* Names */}
      <div>
        {players.map((p: any) => (
          <h3 key={p.id} className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none mb-1">
            {p.name}
          </h3>
        ))}
        {isWinner && <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mt-2">Winner</p>}
      </div>
      
    </div>
  );
};

export default ScoreboardCard;