import React from 'react';
import { Calendar } from 'lucide-react';

interface MatchInfoBoxProps {
  match: any;
}

const MatchInfoBox: React.FC<MatchInfoBoxProps> = ({ match }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-blue-600" size={20} />
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Details</h3>
      </div>
      <div className="space-y-4">
        <InfoRow label="Date" value={new Date(match.scheduled_at).toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })} />
        <InfoRow label="Time" value={new Date(match.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
        <InfoRow label="Format" value={match.match_type} />
        <InfoRow label="Match ID" value={`#${match.id.split('-')[0].toUpperCase()}`} />
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    <span className="text-sm font-black text-slate-800">{value}</span>
  </div>
);

export default MatchInfoBox;