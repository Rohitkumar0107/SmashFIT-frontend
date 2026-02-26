import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

// Shared & Feature Components
import SkeletonLoader from '../components/ui/SkeletonLoader';
import ProfileHero from '../components/profile/ProfileHero';
import PersonalInfo from '../components/profile/PersonalInfo';
import ProfileAchievements from '../components/profile/ProfileAchievements';

interface User {
  id: string;
  full_name: string;
  email: string;
  picture?: string;
  role?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    authService
      .getProfile()
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        } else {
          throw new Error('Invalid profile response');
        }
      })
      .catch((err: unknown) => {
        console.error('fetch profile failed', err);
        localStorage.removeItem('accessToken');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('logout request failed, clearing local data', err);
    }
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  if (!user) {
    return <SkeletonLoader text="Loading Profile..." minHeight="min-h-[80vh]" />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10 animate-in fade-in duration-500">
      
      {/* 1. HEADER CARD (Banner + Avatar + Basic Stats) */}
      <ProfileHero user={user} onLogout={handleLogout} />

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Personal Details */}
        <div className="space-y-6">
          <PersonalInfo user={user} />
        </div>

        {/* RIGHT COLUMN: Performance & Badges */}
        <div className="lg:col-span-2 space-y-6">
          <ProfileAchievements />
        </div>
        
      </div>
    </div>
  );
};

export default Profile;