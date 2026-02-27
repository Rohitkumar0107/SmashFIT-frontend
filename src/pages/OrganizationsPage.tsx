import { useState, useEffect } from 'react';
import { Building, Plus, Search, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OrganizationCard } from '../components/cards/OrganizationCard';
import { organizationService } from '../services/organization.service';

const OrganizationsPage = () => {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 🔍 Search feature

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const data = await organizationService.getAll();
        setOrgs(data);
      } catch (err: any) {
        setError('Failed to load organizations. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  // Filter organizations based on search input
  const filteredOrgs = orgs.filter(org => 
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (org.location && org.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* 🌟 Premium Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Organizations</h1>
          <p className="text-slate-500 font-medium mt-1.5 flex items-center gap-2">
            <Info size={16} className="text-blue-500" />
            Manage your academies, courts, and amenities here.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto mt-4 lg:mt-0">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search academies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Action Button */}
          <Link 
            to="/organizations/create" 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-blue-500/25 shrink-0"
          >
            <Plus size={20} />
            Add New
          </Link>
        </div>
      </div>

      {/* 🚀 State Handling (Loading, Error, Data, Empty) */}
      {loading ? (
        // Skeleton Loaders (Premium feel)
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm animate-pulse h-48 flex flex-col justify-between">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-slate-200 rounded-xl"></div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                </div>
              </div>
              <div className="h-8 bg-slate-100 rounded-lg w-1/3"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 text-red-600 rounded-3xl border border-red-100 font-bold flex flex-col items-center">
          <Info size={32} className="mb-3 text-red-400" />
          {error}
        </div>
      ) : filteredOrgs.length > 0 ? (
        // Grid Display
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrgs.map((org) => (
            <OrganizationCard 
              key={org.id}
              id={org.id}
              name={org.name}
              location={org.location}
              courtCount={org.court_count}
              status={org.status}
              logoUrl={org.logo_url}
              amenities={org.amenities} // 👈 Backend JSON pass kiya
            />
          ))}
        </div>
      ) : (
        // Empty State / No Search Results
        <div className="text-center py-28 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-200">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-slate-100 mb-6">
            <Building className="text-slate-300 w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-800">
            {searchQuery ? 'No matching academies found' : 'No Organizations Yet'}
          </h3>
          <p className="text-slate-500 font-medium mt-3 mb-8 max-w-md mx-auto leading-relaxed">
            {searchQuery 
              ? `We couldn't find any academy matching "${searchQuery}". Try a different name or location.`
              : 'You haven\'t set up any badminton academy yet. Register your first club to start hosting tournaments and tracking matches!'
            }
          </p>
          {!searchQuery && (
            <Link 
              to="/organizations/create" 
              className="text-white font-bold bg-slate-900 hover:bg-slate-800 px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-slate-900/20"
            >
              🚀 Register Your First Academy
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;