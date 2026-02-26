import { useState, useEffect, useRef } from 'react';
import { Bell, Settings, User, LogOut, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  // States for toggling popups
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Refs for "Click Outside to Close" logic
  const notifRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Agar click notification popup ke bahaar hua hai, toh use band karo
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      // Agar click settings popup ke bahaar hua hai, toh use band karo
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl border border-slate-200 shadow-sm mb-8 relative z-50">
      
      {/* App Logo / Title */}
      <div 
        className="text-2xl font-black text-slate-900 tracking-tighter italic cursor-pointer flex items-center gap-2"
        onClick={() => navigate('/')}
      >
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-lg">S</span>
        SmashFIT
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        
        {/* 🔔 NOTIFICATIONS BUTTON & POPUP */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsSettingsOpen(false); // Doosra band kar do
            }}
            className={`p-2.5 rounded-xl transition-all relative ${isNotifOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            <Bell size={20} />
            {/* Red Dot for unread */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* NOTIFICATION DROPDOWN */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Notifications</h3>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-200 transition-colors">Mark all read</span>
              </div>
              
              <div className="max-h-72 overflow-y-auto">
                {/* Notification Items */}
                <NotifItem title="Match Starting!" desc="Your Singles match is on Court 1." time="Just now" unread />
                <NotifItem title="Rank Up!" desc="You moved to #1 in Leaderboard." time="2h ago" />
                <NotifItem title="New Tournament" desc="Registrations open for Summer Cup." time="1d ago" />
              </div>
            </div>
          )}
        </div>

        {/* ⚙️ SETTINGS / PROFILE BUTTON & POPUP */}
        <div className="relative" ref={settingsRef}>
          <button 
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setIsNotifOpen(false); // Doosra band kar do
            }}
            className={`flex items-center gap-2 p-1.5 pr-4 rounded-xl transition-all border ${isSettingsOpen ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">
              R
            </div>
            <span className="text-sm font-bold text-slate-700 hidden sm:block">Rohit</span>
          </button>

          {/* SETTINGS DROPDOWN */}
          {isSettingsOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="p-4 border-b border-slate-100">
                <p className="text-sm font-black text-slate-900">Rohit Kumar</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Pro Player • Rank #1</p>
              </div>
              
              <div className="p-2 space-y-1">
                <DropdownItem icon={<User size={16} />} label="My Profile" onClick={() => navigate('/player/1')} />
                <DropdownItem icon={<Settings size={16} />} label="Account Settings" onClick={() => console.log('Settings clicked')} />
              </div>

              <div className="p-2 border-t border-slate-100">
                <DropdownItem icon={<LogOut size={16} />} label="Log Out" danger onClick={() => console.log('Logout clicked')} />
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

// Sub-component for Notification Row
const NotifItem = ({ title, desc, time, unread = false }: any) => (
  <div className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 ${unread ? 'bg-blue-50/30' : ''}`}>
    <div className="mt-1">
      {unread ? <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5" /> : <CheckCircle2 size={12} className="text-slate-300 mt-1" />}
    </div>
    <div>
      <p className={`text-sm font-black ${unread ? 'text-slate-900' : 'text-slate-600'}`}>{title}</p>
      <p className="text-xs font-bold text-slate-500 mt-0.5 leading-snug">{desc}</p>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{time}</p>
    </div>
  </div>
);

// Sub-component for Settings Menu Item
const DropdownItem = ({ icon, label, danger = false, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
      danger 
        ? 'text-red-600 hover:bg-red-50' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    {icon} {label}
  </button>
);

export default Header;