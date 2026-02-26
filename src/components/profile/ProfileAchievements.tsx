import React from 'react';
import { Activity, Trophy, Medal } from 'lucide-react';

const ProfileAchievements = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Activity size={20} className="text-blue-600" /> About Me
      </h2>
      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        Passionate badminton player and organizer. I love managing tournaments and competing in men's singles. Building SmashFIT to revolutionize how local tournaments are managed and experienced. Always up for a quick weekend match!
      </p>

      <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
        Achievements
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all cursor-default">
          <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0">
            <Trophy size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Summer Smash 2025</p>
            <p className="text-xs font-medium text-slate-500">Tournament Winner</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all cursor-default">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Medal size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">SmashFIT Founder</p>
            <p className="text-xs font-medium text-slate-500">Early Adopter Badge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAchievements;
