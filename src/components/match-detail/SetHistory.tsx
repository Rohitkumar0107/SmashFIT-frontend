import React from 'react';
import { Activity } from 'lucide-react';

interface SetHistoryProps {
  scores: any[];
  isUpcoming: boolean;
}

const SetHistory: React.FC<SetHistoryProps> = ({ scores, isUpcoming }) => {
  return (
    <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-blue-600" size={20} />
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Set History</h3>
      </div>
      
      {scores && scores.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {scores.map((set: any) => (
            <div key={set.id} className={`min-w-[100px] p-4 rounded-2xl border-2 text-center ${set.is_completed ? 'border-slate-100 bg-slate-50' : 'border-blue-500 bg-blue-50'}`}>
              <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Set {set.set_number}</p>
              <p className="text-xl font-black text-slate-800">{set.side_a_score} - {set.side_b_score}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-slate-400 font-bold italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          {isUpcoming ? "Sets will appear here once the match starts." : "No sets recorded yet."}
        </div>
      )}
    </div>
  );
};

export default SetHistory;