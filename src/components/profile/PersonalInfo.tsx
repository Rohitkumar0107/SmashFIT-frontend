import React from 'react';
import { Edit3, Mail } from 'lucide-react';

interface PersonalInfoProps {
  user: {
    email: string;
  };
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-800">Personal Info</h2>
        <button
          aria-label="Edit personal info"
          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
        >
          <Edit3 size={18} />
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
            <Mail size={16} />
          </div>
          <div>
            <p className="font-medium text-slate-800">{user.email}</p>
            <p className="text-xs text-slate-500">Email Address</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;