import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, CheckCircle2, Wind, CarFront, Droplets, Bath, 
  Mail, FileText, Layers, Edit3, Loader2, AlertCircle, Building, Trophy, Plus
} from 'lucide-react';
import { organizationService } from '../services/organization.service';

const OrganizationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [org, setOrg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  // 🛡️ AUTH CHECK: JWT Token ko decode karke ID nikalna
  let currentUserId = null;
  // token is stored under "accessToken" after login
  const token = localStorage.getItem('accessToken');

  if (token) {
    try {
      // JWT Token ko bina kisi extra package ke decode karne ka logic
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const decodedToken = JSON.parse(jsonPayload);
      // Backend jis bhi naam se ID bhej raha ho (id, userId, sub), ye usko pakad lega
      currentUserId = decodedToken.id || decodedToken.userId || decodedToken.sub;
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }

  useEffect(() => {
    const fetchOrgDetails = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await organizationService.getById(id);
        setOrg(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load organization details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrgDetails();
  }, [id]);

  // 🔒 SECURITY LOGIC: Current Token ID vs Database Owner ID
  const isOwner = org?.owner_id && currentUserId 
                  ? String(currentUserId).trim().toLowerCase() === String(org.owner_id).trim().toLowerCase() 
                  : false;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold tracking-wide animate-pulse">Loading academy details...</p>
      </div>
    );
  }

  if (error || !org) {
    return (
      <div className="max-w-3xl mx-auto mt-12 bg-red-50 p-8 rounded-3xl border border-red-100 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-red-700 mb-2">Oops! Something went wrong</h2>
        <p className="text-red-500 font-medium mb-6">{error || 'Organization not found'}</p>
        <button onClick={() => navigate('/organizations')} className="bg-white text-slate-800 font-bold px-6 py-2.5 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-12 px-4">
      
      {/* 🔙 Navigation & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-4">
        <button 
          onClick={() => navigate('/organizations')}
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 hover:text-slate-900 font-bold bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md w-fit"
        >
          <ArrowLeft size={16} className="sm:w-4.5 sm:h-4.5" />
          Back to List
        </button>
        
        {/* 🏆 Conditional Action Buttons: Only for the Real Owner */}
        {isOwner && (
          <div className="flex items-center gap-2 sm:gap-3 animate-in slide-in-from-right-5 duration-300 flex-wrap sm:flex-nowrap">
            <Link 
              to={`/organizations/${org.id}/edit`} 
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-700 hover:text-slate-900 font-bold bg-slate-100 hover:bg-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors border border-slate-200"
            >
              <Edit3 size={16} className="sm:w-4.5 sm:h-4.5" />
              Edit Profile
            </Link>

            <button 
              onClick={() => navigate(`/tournaments/create?org_id=${org.id}`)}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white font-bold bg-blue-600 hover:bg-blue-700 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <Trophy size={16} className="sm:w-4.5 sm:h-4.5 text-amber-300" />
              Host Tournament
            </button>
          </div>
        )}
      </div>

      {/* 🌟 Academy Profile Card */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="h-32 sm:h-40 md:h-48 md:h-64 w-full bg-slate-100 relative">
          {!bannerError && org.banner_url ? (
            <img src={org.banner_url} alt="Cover" onError={() => setBannerError(true)} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
          )}
        </div>

        <div className="px-4 sm:px-6 md:px-10 pb-8 md:pb-10">
          <div className="relative flex justify-between items-end -mt-12 sm:-mt-14 md:-mt-16 mb-4 sm:mb-6 md:mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl bg-white p-1.5 sm:p-2 shadow-lg border border-slate-100">
              <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                {!imgError && org.logo_url ? (
                  <img src={org.logo_url} alt={org.name} onError={() => setImgError(true)} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-300">{org.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
            </div>
            <div className="mb-2 sm:mb-3 md:mb-4">
              <span className={`flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-black tracking-wide ${org.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                <CheckCircle2 size={14} className="sm:w-4 sm:h-4" /> {org.status}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-1 sm:mb-2">{org.name}</h1>
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base text-slate-500 font-medium mb-6 sm:mb-8 md:mb-10">
            <MapPin size={16} className="sm:w-5 sm:h-5 text-blue-500 shrink-0" />
            {org.location || 'Location not specified'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-8 md:mb-10">
            <DetailCard icon={<Layers className="text-indigo-500 w-4 h-4 sm:w-5 sm:h-5"/>} label="Total Courts" value={`${org.court_count || 0} Courts`} />
            <DetailCard icon={<Building className="text-emerald-500 w-4 h-4 sm:w-5 sm:h-5"/>} label="Flooring Type" value={org.flooring_type || 'Standard'} />
            <DetailCard icon={<Mail className="text-sky-500 w-4 h-4 sm:w-5 sm:h-5"/>} label="Business Email" value={org.business_email || 'Not provided'} />
            <DetailCard icon={<FileText className="text-amber-500 w-4 h-4 sm:w-5 sm:h-5"/>} label="GST Number" value={org.gst_number || 'N/A'} />
          </div>

          {/* 🛁 Amenities Section */}
          {org.amenities && Object.keys(org.amenities).length > 0 && (
            <div>
              <h3 className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest mb-3 sm:mb-4">Facilities Available</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {org.amenities.ac && <AmenityBadge icon={<Wind size={16} className="sm:w-4 sm:h-4"/>} label="Air Conditioning" color="sky" />}
                {org.amenities.parking && <AmenityBadge icon={<CarFront size={16} className="sm:w-4 sm:h-4"/>} label="Parking Available" color="slate" />}
                {org.amenities.shower && <AmenityBadge icon={<Bath size={16} className="sm:w-4 sm:h-4"/>} label="Shower Rooms" color="indigo" />}
                {org.amenities.water && <AmenityBadge icon={<Droplets size={16} className="sm:w-4 sm:h-4"/>} label="Drinking Water" color="blue" />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ================= Helpers =================

const DetailCard = ({ icon, label, value }: any) => (
  <div className="bg-white border border-slate-200 p-2.5 sm:p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
      <div className="p-1 sm:p-2 bg-slate-50 rounded-lg">{icon}</div>
      <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
    <p className="text-xs sm:text-sm text-slate-800 font-bold truncate pl-1">{value}</p>
  </div>
);

const AmenityBadge = ({ icon, label, color }: any) => {
  const colorClasses: any = {
    sky: 'bg-sky-50 text-sky-700 border-sky-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
  };
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl border font-bold text-xs sm:text-sm ${colorClasses[color]}`}>
      {icon} {label}
    </div>
  );
};

export default OrganizationDetailPage;