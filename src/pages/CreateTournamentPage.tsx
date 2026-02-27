import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Trophy, Calendar, MapPin, Plus, Trash2, Loader2, Info, Navigation, Hash } from 'lucide-react';
import { tournamentService } from '../services/tournament.service';
import { organizationService } from '../services/organization.service';

const CreateTournamentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orgIdFromUrl = searchParams.get('org_id');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [organizations, setOrganizations] = useState<any[]>([]);

  // 1. Basic Details State
  const [basicData, setBasicData] = useState({
    org_id: orgIdFromUrl || '',
    name: '',
    description: '',
    location: '',
    banner_url: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=1200&q=80',
    tournament_type: 'KNOCKOUT',
    shuttle_type: 'FEATHER',
    start_date: '',
    end_date: '',
    registration_deadline: '',
  });

  // 2. Dynamic Categories State
  const [categories, setCategories] = useState([
    { category_name: '', match_type: 'SINGLES', entry_fee: 0, max_slots: 32 }
  ]);

  // Load Organizations
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const orgs = await organizationService.getAll();
        setOrganizations(orgs);
        
        // Auto-select first org if no URL param
        if (orgs.length > 0 && !orgIdFromUrl) {
          setBasicData(prev => ({ ...prev, org_id: orgs[0].id }));
        }
      } catch (err) {
        console.error("Failed to load organizations", err);
      }
    };
    fetchOrgs();
  }, [orgIdFromUrl]);

  // Handlers
  const handleBasicChange = (e: any) => {
    setBasicData({ ...basicData, [e.target.name]: e.target.value });
  };

  const addCategory = () => {
    setCategories([...categories, { category_name: '', match_type: 'SINGLES', entry_fee: 0, max_slots: 32 }]);
  };

  const removeCategory = (index: number) => {
    const newCats = [...categories];
    newCats.splice(index, 1);
    setCategories(newCats);
  };

  const handleCategoryChange = (index: number, field: string, value: any) => {
    const newCats: any = [...categories];
    newCats[index][field] = value;
    setCategories(newCats);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...basicData,
        registration_deadline: `${basicData.registration_deadline}T23:59:59Z`,
        categories: categories.map(c => ({
          ...c,
          entry_fee: Number(c.entry_fee),
          max_slots: Number(c.max_slots)
        }))
      };

      await tournamentService.create(payload);
      navigate('/tournaments'); // Navigate to list after success
    } catch (err: any) {
      setError(err.message || 'Failed to create tournament. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:py-10 animate-in fade-in duration-500">
      
      {/* 🌟 Header Section */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <div className="bg-amber-100 p-3 rounded-2xl">
            <Trophy className="text-amber-500" size={32} />
          </div>
          Launch Tournament
        </h1>
        <p className="text-slate-500 font-medium mt-3">
          Setup your tournament details, schedule, and events to start receiving registrations from players.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 font-bold flex items-center gap-3 shadow-sm">
          <Info size={24} className="shrink-0" /> 
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        
        {/* --- SECTION 1: Basic Details --- */}
        <div className="bg-white p-5 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <Navigation className="text-blue-500" size={20} /> Basic Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Host Organization</label>
              <select 
                name="org_id" 
                value={basicData.org_id} 
                onChange={handleBasicChange} 
                required
                disabled={!!orgIdFromUrl} // 👈 Disable if coming from specific academy page
                className={`w-full px-4 py-3.5 rounded-2xl border ${orgIdFromUrl ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed' : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-blue-500'} outline-none font-bold transition-all`}
              >
                <option value="" disabled>Select your academy</option>
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
              {orgIdFromUrl && <p className="text-xs text-slate-400 mt-2 font-medium italic">Academy is pre-selected based on your profile.</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Tournament Name</label>
              <input 
                type="text" 
                name="name" 
                value={basicData.name} 
                onChange={handleBasicChange} 
                required 
                placeholder="e.g., Summer Smash Open 2026" 
                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900" 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tournament Format</label>
              <select name="tournament_type" value={basicData.tournament_type} onChange={handleBasicChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium text-slate-700 transition-all">
                <option value="KNOCKOUT">Knockout (Elimination)</option>
                <option value="LEAGUE">League (Round Robin)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Shuttle Type</label>
              <select name="shuttle_type" value={basicData.shuttle_type} onChange={handleBasicChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none font-medium text-slate-700 transition-all">
                <option value="FEATHER">Feather (Standard)</option>
                <option value="NYLON">Nylon (Synthetic)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Location / Venue</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input 
                  type="text" 
                  name="location" 
                  value={basicData.location} 
                  onChange={handleBasicChange} 
                  required 
                  placeholder="Stadium name or full address" 
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: Schedule --- */}
        <div className="bg-white p-5 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
            <Calendar className="text-emerald-500" size={20} /> Schedule
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Start Date</label>
              <input type="date" name="start_date" value={basicData.start_date} onChange={handleBasicChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-medium text-slate-700 transition-all cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">End Date</label>
              <input type="date" name="end_date" value={basicData.end_date} onChange={handleBasicChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-medium text-slate-700 transition-all cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Registration Deadline</label>
              <input type="date" name="registration_deadline" value={basicData.registration_deadline} onChange={handleBasicChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-red-400 focus:bg-white outline-none font-medium text-slate-700 transition-all cursor-pointer" />
            </div>
          </div>
        </div>

        {/* --- SECTION 3: Tournament Categories --- */}
        <div className="bg-white p-5 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
              <Hash className="text-indigo-500" size={20} /> Events & Categories
            </h2>
            <button 
              type="button" 
              onClick={addCategory} 
              className="w-full sm:w-auto text-sm bg-indigo-50 text-indigo-700 font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-100 flex items-center justify-center gap-2 transition-colors active:scale-95"
            >
              <Plus size={18} /> Add Event
            </button>
          </div>
          
          <div className="space-y-6">
            {categories.map((cat, index) => (
              <div key={index} className="relative p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-3xl group">
                
                {/* Delete Button (Mobile friendly) */}
                {categories.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeCategory(index)} 
                    className="absolute -top-3 -right-3 sm:top-4 sm:right-4 text-red-500 hover:text-white hover:bg-red-500 p-2 sm:p-2.5 bg-white border border-red-100 rounded-full sm:rounded-xl shadow-sm transition-all z-10"
                    title="Remove Category"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                {/* Event Form Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mt-2">
                  <div className="sm:col-span-2 lg:col-span-2">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Category Name</label>
                    <input type="text" value={cat.category_name} onChange={(e) => handleCategoryChange(index, 'category_name', e.target.value)} required placeholder="e.g. Men's Singles U-19" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-medium text-slate-900 transition-all" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Match Type</label>
                    <select value={cat.match_type} onChange={(e) => handleCategoryChange(index, 'match_type', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-medium text-slate-700 transition-all">
                      <option value="SINGLES">Singles</option>
                      <option value="DOUBLES">Doubles</option>
                      <option value="MIXED_DOUBLES">Mixed</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
                    <div className="lg:mb-0">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Max Slots</label>
                      <input type="number" value={cat.max_slots} onChange={(e) => handleCategoryChange(index, 'max_slots', e.target.value)} required min="2" placeholder="32" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-medium text-slate-900 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Fee (₹)</label>
                      <input type="number" value={cat.entry_fee} onChange={(e) => handleCategoryChange(index, 'entry_fee', e.target.value)} required min="0" placeholder="500" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-medium text-slate-900 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <div className="flex flex-col sm:flex-row justify-end pt-4 pb-12 gap-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all order-2 sm:order-1"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed order-1 sm:order-2 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <Trophy size={24} className="text-amber-400" />}
            {loading ? 'Publishing...' : 'Publish Tournament'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTournamentPage;