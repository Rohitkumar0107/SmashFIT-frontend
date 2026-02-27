import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Swords, Trophy, BarChart3,
  Search, Bell, Settings, CheckCircle2, User, LogOut, Menu, X, Building
} from 'lucide-react';
import { authService } from '../services/auth.service';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: 'Loading...',
    role: 'Loading...',
    profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fallback'
  });

  // ================= 1. POPOVER STATES & REFS =================
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // ================= 2. CLICK OUTSIDE TO CLOSE LOGIC =================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ================= 3. AUTH LOAD LOGIC =================
  useEffect(() => {
    const load = async () => {
      try {
        const data = await authService.getProfile();
        if (data && data.user) {
          const u = data.user;
          setUser({
            fullName: u.full_name,
            role: u.role || 'Player',
            profilePic: u.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.full_name}`
          });
        }
      } catch (err) {
        console.error('Failed to load profile in layout', err);
        setUser({
          fullName: 'Guest User',
          role: 'Player',
          profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest'
        });
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('logout failed', err);
    }
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Matches', path: '/matches', icon: Swords },
    { name: 'Tournaments', path: '/tournaments', icon: Trophy },
    { name: 'Organizations', path: '/organizations', icon: Building },
    { name: 'Leaderboard', path: '/leaderboard', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-[#e3e7eb] font-sans">

      {/* ================= SIDEBAR & OVERLAY ================= */}
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-64 bg-white/95 backdrop-blur-md border-r border-slate-200 flex flex-col fixed inset-y-0 left-0 shadow-lg md:shadow-sm z-50
        transition-transform duration-300 ease-in-out md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 flex-shrink-0 cursor-pointer" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}>
          <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-800 tracking-tighter italic">
            Smash<span className="text-blue-600">FIT</span>
          </h1>
          {/* Close button for mobile sidebar */}
          <button className="md:hidden text-slate-500 hover:text-slate-800" onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(false); }}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm font-bold'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
              >
                <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT BUTTON AT SIDEBAR BOTTOM */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen max-w-full overflow-x-hidden">

        {/* ================= NAVBAR ================= */}
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 shadow-sm">

          <div className="flex items-center gap-2 md:gap-4 w-full max-w-[200px] sm:max-w-xs md:max-w-md">
            {/* Hamburger Button (Mobile Only) */}
            <button
              className="md:hidden p-2 -ml-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 md:py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6 shrink-0">

            {/* 🔔 NOTIFICATIONS POPOVER */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsSettingsOpen(false);
                }}
                className={`p-2 rounded-xl transition-all relative ${isNotifOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'}`}
              >
                <Bell size={22} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Notifications</h3>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-200">Mark all read</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    <NotifItem title="Match Started" desc="Your match on Court 1 is live." time="Just now" unread />
                    <NotifItem title="Tournament Alert" desc="Registrations closing tomorrow!" time="2h ago" />
                  </div>
                </div>
              )}
            </div>

            {/* ⚙️ SETTINGS POPOVER */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen);
                  setIsNotifOpen(false);
                }}
                className={`p-2 rounded-xl transition-all ${isSettingsOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-blue-600 hover:bg-slate-50'}`}
              >
                <Settings size={22} />
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                  <div className="p-4 border-b border-slate-100">
                    <p className="text-sm font-black text-slate-900">App Settings</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <DropdownItem icon={<User size={16} />} label="Edit Profile" />
                    <DropdownItem icon={<Settings size={16} />} label="Preferences" />
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-8 bg-slate-200"></div>

            {/* USER PROFILE LINK */}
            <Link
              to="/profile"
              className="flex items-center gap-3 hover:bg-slate-50 p-1.5 rounded-full pr-4 transition-colors"
            >
              <img
                src={user.profilePic}
                alt={`${user.fullName} Profile`}
                className="w-10 h-10 rounded-full border border-slate-200 object-cover bg-slate-100"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs sm:text-sm font-bold text-slate-700 leading-tight">{user.fullName}</p>
                <p className="text-[10px] sm:text-xs font-medium text-slate-400 capitalize">{user.role}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* ================= DYNAMIC OUTLET ================= */}
        <main className="flex-1 p-4 md:p-8 w-full">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

// ================= HELPERS FOR POPOVERS =================

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

const DropdownItem = ({ icon, label, danger = false, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${danger
        ? 'text-red-600 hover:bg-red-50'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
  >
    {icon} {label}
  </button>
);

export default Layout;