import { useState } from 'react';
import { MapPin, CheckCircle2, Wind, CarFront, Droplets, Bath } from 'lucide-react';
import { Link } from 'react-router-dom'; // 👈 Routing ke liye Link import kiya

interface OrgCardProps {
  id: string; // 👈 Routing ke liye id prop add kiya
  name: string;
  location: string;
  courtCount: number;
  status: string;
  logoUrl?: string;
  amenities?: any; 
}

export const OrganizationCard = ({ id, name, location, courtCount, status, logoUrl, amenities }: OrgCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    // 👇 Pura card ab ek Link ban gaya hai
    <Link 
      to={`/organizations/${id}`} 
      className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/60 transition-all duration-300 overflow-hidden relative"
    >
      {/* 🌟 Top Image Cover Area */}
      <div className="h-44 w-full bg-slate-100 relative overflow-hidden">
        {!imgError && logoUrl ? (
          <img 
            src={logoUrl} 
            alt={name} 
            onError={() => setImgError(true)} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <span className="text-5xl font-black text-slate-300">{name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        
        {/* Status Badge Over Image */}
        <div className="absolute top-3 right-3">
          {status === 'ACTIVE' ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-green-700 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-sm">
              <CheckCircle2 size={14} className="text-green-500" /> ACTIVE
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-sm">
              PENDING
            </span>
          )}
        </div>
      </div>

      {/* 📝 Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        
        <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-2 font-medium">
          <MapPin size={16} className="text-blue-500 shrink-0" />
          <span className="truncate">{location || 'Location not updated'}</span>
        </div>

        <div className="flex-1"></div> {/* Spacer */}

        {/* Stats & Amenities Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          
          <div className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            🏸 {courtCount || 0} {courtCount > 1 ? 'Courts' : 'Court'}
          </div>

          {amenities && (
            <div className="flex items-center gap-1.5 text-slate-400">
              {amenities.ac && <div title="AC Available" className="p-1.5 bg-slate-50 rounded-md"><Wind size={14} className="text-sky-500"/></div>}
              {amenities.parking && <div title="Parking" className="p-1.5 bg-slate-50 rounded-md"><CarFront size={14} className="text-slate-600"/></div>}
              {amenities.shower && <div title="Showers" className="p-1.5 bg-slate-50 rounded-md"><Bath size={14} className="text-indigo-400"/></div>}
              {amenities.water && <div title="Drinking Water" className="p-1.5 bg-slate-50 rounded-md"><Droplets size={14} className="text-blue-400"/></div>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};