import React from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

interface TournamentRulesProps {
  description: string;
  rules: string[];
}

const TournamentRules: React.FC<TournamentRulesProps> = ({ description, rules }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-300">
      
      {/* About Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
          <ShieldAlert className="text-blue-500" size={20} /> About Tournament
        </h3>
        <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      </div>

      {/* Rules Section (Only render if rules exist) */}
      {rules && rules.length > 0 && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={20} /> Rules & Regulations
          </h3>
          <ul className="space-y-3">
            {rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default TournamentRules;