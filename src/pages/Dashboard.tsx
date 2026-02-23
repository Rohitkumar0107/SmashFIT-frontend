// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // User data store karne ke liye state
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      // no token means not logged in
      navigate('/login');
      return;
    }

    // call /auth/me on backend to validate token and fetch user
    (async () => {
      try {
        setLoading(true);
        const response = await authService.getProfile();
        // backend returns user info
        setUser(response.user || response);
        // keep localstorage in sync
        localStorage.setItem('user', JSON.stringify(response.user || response));
      } catch (err: any) {
        console.error('failed to fetch profile', err);
        // token probably invalid
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleLogout = () => {
    // LocalStorage se sab kuch delete karo
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    
    alert("Logged out successfully!");
    navigate('/login');
  };

  // Jab tak data aa raha hai, tab tak ye loading screen dikhegi
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center z-10">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Smash<span className="text-blue-600">FIT</span>
        </h1>
        <button 
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-red-100 transition duration-200 border border-red-100 shadow-sm"
        >
          Logout
        </button>
      </nav>

      {/* Main Dashboard Content */}
      <main className="flex-grow flex flex-col items-center pt-12 px-6">
        
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center transform transition hover:scale-105 duration-300">
          
          {/* Profile Picture */}
          <div className="relative inline-block">
            {imageError || !user?.picture ? (
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-white shadow-lg mx-auto">
                <span className="text-4xl font-bold text-white">
                  {user?.full_name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            ) : (
              <img 
                src={user.picture} 
                alt="Profile" 
                onError={() => setImageError(true)}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mx-auto bg-blue-50"
              />
            )}
            {/* Online Status Dot */}
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          {/* User Details */}
          <h2 className="text-3xl font-bold text-gray-800 mt-5">{user?.full_name}</h2>
          <p className="text-gray-500 font-medium mt-1">{user?.email}</p>
          
          {/* Role Badge */}
          <div className="mt-4">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
              {user?.role || "USER"}
            </span>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-400">
              Welcome to your SmashIt dashboard! Your badminton journey starts here.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;