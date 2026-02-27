import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, Mail, FileText, Layers, 
  Wind, CarFront, Droplets, Bath, Image as ImageIcon, 
  Loader2, Info, ArrowLeft, CheckSquare
} from 'lucide-react';
import { organizationService } from '../services/organization.service';

const CreateOrganizationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 📋 Form State
  const [formData, setFormData] = useState({
    name: '',
    business_email: '',
    location: '',
    address: '',
    description: '',
    court_count: '',
    flooring_type: 'WOODEN',
    gst_number: '',
    logo_url: '',
    banner_url: '',
    amenities: {
      ac: false,
      parking: false,
      shower: false,
      water: false,
    }
  });

  // 🛠️ Handlers
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmenityToggle = (key: string) => {
    setFormData((prev: any) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [key]: !prev.amenities[key]
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        court_count: Number(formData.court_count) || 0,
      };

      // 🚀 API Call
      await organizationService.create(payload);
      
      // Success hone par wapas list pe bhej do
      navigate('/organizations'); 
    } catch (err: any) {
      setError(err.message || 'Failed to create organization. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:py-10 animate-in fade-in duration-500">
      
      {/* 🌟 Header Section */}
      <div className="mb-8 text-center sm:text-left">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-4 transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <div className="bg-indigo-100 p-3 rounded-2xl">
            <Building2 className="text-indigo-600" size={32} />
          </div>
          Register Academy
        </h1>
        <p className="text-slate-500 font-medium mt-3">
          Set up your badminton academy profile to start hosting tournaments and managing courts.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-200 font-bold flex items-center gap-3 shadow-sm">
          <Info size={24} className="shrink-0" /> 
          <span className="text-sm">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        
        {/* --- SECTION 1: Basic Information --- */}
        <div className="bg-white p-5 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
            <FileText className="text-blue-500" size={20} /> Basic Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Academy Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g., Smashers Badminton Arena" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">About Academy</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Tell players about your facilities and legacy..." className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Business Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="email" name="business_email" value={formData.business_email} onChange={handleChange} placeholder="hello@academy.com" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">GST Number (Optional)</label>
              <input type="text" name="gst_number" value={formData.gst_number} onChange={handleChange} placeholder="e.g., 22AAAAA0000A1Z5" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900 uppercase" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Short Location (City/Area) *</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Gurgaon, Haryana" className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Complete street address" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-900" />
            </div>
          </div>
        </div>

        {/* --- SECTION 2: Facilities & Amenities --- */}
        <div className="bg-white p-5 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
            <Layers className="text-emerald-500" size={20} /> Infrastructure & Amenities
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Total Number of Courts *</label>
              <input type="number" name="court_count" value={formData.court_count} onChange={handleChange} required min="1" placeholder="e.g., 4" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-medium text-slate-900 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Flooring Type</label>
              <select name="flooring_type" value={formData.flooring_type} onChange={handleChange} className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none font-medium text-slate-700 transition-all">
                <option value="WOODEN">Wooden Flooring</option>
                <option value="SYNTHETIC">Synthetic PVC</option>
                <option value="CEMENT">Cement / Hard Court</option>
              </select>
            </div>
          </div>

          <label className="block text-sm font-bold text-slate-700 mb-4">Available Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <AmenityCheckbox 
              icon={<Wind size={20} />} label="Air Conditioning" 
              checked={formData.amenities.ac} onChange={() => handleAmenityToggle('ac')} color="sky" 
            />
            <AmenityCheckbox 
              icon={<CarFront size={20} />} label="Parking" 
              checked={formData.amenities.parking} onChange={() => handleAmenityToggle('parking')} color="slate" 
            />
            <AmenityCheckbox 
              icon={<Bath size={20} />} label="Shower Rooms" 
              checked={formData.amenities.shower} onChange={() => handleAmenityToggle('shower')} color="indigo" 
            />
            <AmenityCheckbox 
              icon={<Droplets size={20} />} label="Drinking Water" 
              checked={formData.amenities.water} onChange={() => handleAmenityToggle('water')} color="blue" 
            />
          </div>
        </div>

        {/* --- SECTION 3: Media & Branding --- */}
        <div className="bg-white p-5 sm:p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
            <ImageIcon className="text-purple-500" size={20} /> Media & Branding
          </h2>
          
          <div className="grid grid-cols-1 gap-5 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Logo URL (Optional)</label>
              <input type="url" name="logo_url" value={formData.logo_url} onChange={handleChange} placeholder="https://example.com/logo.png" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all font-medium text-slate-900" />
              <p className="text-xs text-slate-400 mt-2">Provide a direct link to your academy's logo image.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Banner Image URL (Optional)</label>
              <input type="url" name="banner_url" value={formData.banner_url} onChange={handleChange} placeholder="https://example.com/cover.jpg" className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:bg-white outline-none transition-all font-medium text-slate-900" />
            </div>
          </div>
        </div>

        {/* --- SUBMIT BUTTON --- */}
        <div className="flex flex-col sm:flex-row justify-end pt-4 pb-12 gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/organizations')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all order-2 sm:order-1"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed order-1 sm:order-2 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <CheckSquare size={24} />}
            {loading ? 'Registering...' : 'Register Academy'}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Helper Component for Custom Checkboxes ---
const AmenityCheckbox = ({ icon, label, checked, onChange, color }: any) => {
  const colorStyles: any = {
    sky: checked ? 'bg-sky-50 border-sky-500 text-sky-700' : 'bg-white border-slate-200 text-slate-500 hover:border-sky-300',
    slate: checked ? 'bg-slate-100 border-slate-600 text-slate-800' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400',
    indigo: checked ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-300',
    blue: checked ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300',
  };

  return (
    <div 
      onClick={onChange}
      className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center transition-all active:scale-95 ${colorStyles[color]}`}
    >
      <div className={checked ? 'scale-110 transition-transform' : 'scale-100 transition-transform'}>
        {icon}
      </div>
      <span className={`text-xs font-bold ${checked ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
    </div>
  );
};

export default CreateOrganizationPage;