import React from 'react';
import { Edit3, ShieldCheck } from 'lucide-react';

interface ProfileHeroProps {
  user: {
    full_name: string;
    picture?: string;
    role?: string;
  };
  onLogout: () => void;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ user, onLogout }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Cover Banner */}
      <div className="h-32 md:h-40 bg-gradient-to-r from-blue-600 to-indigo-500 w-full relative">
        <button
          aria-label="Edit banner"
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-2"
        >
          <Edit3 size={16} /> Edit Banner
        </button>
      </div>

      {/* Profile Info Section */}
      <div className="px-6 md:px-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between -mt-12 md:-mt-16 mb-4 gap-4">
          
          {/* Avatar & Name */}
          <div className="flex items-end gap-5">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-md z-10 flex-shrink-0">
              <img
                src={user.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pb-2">
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
                {user.full_name}
              </h1>
              <p className="text-sm font-medium text-blue-600 flex items-center gap-1 mt-1 capitalize">
                <ShieldCheck size={16} /> {user.role || 'Player'}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;