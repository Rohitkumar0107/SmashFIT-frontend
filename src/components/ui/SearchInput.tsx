import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'light' | 'dark'; // Leaderboard ke liye light, Tournaments ke liye dark
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  variant = 'light' 
}) => {
  const isDark = variant === 'dark';

  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full text-sm font-bold rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          isDark 
            ? 'bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 backdrop-blur-sm'
            : 'bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white shadow-sm'
        }`}
      />
    </div>
  );
};

export default SearchInput;