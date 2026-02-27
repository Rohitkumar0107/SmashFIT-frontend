import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import CreateTournamentPage from './pages/CreateTournamentPage';
import Tournaments from './pages/Tournaments';
import TournamentDetail from './pages/TournamentDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import MatchDetail from './pages/MatchDetail';
import OrganizationsPage from './pages/OrganizationsPage';
import CreateOrganizationPage from './pages/CreateOrganizationPage';
import OrganizationDetailPage from './pages/OrganizationDetailPage';
import Leaderboard from './pages/Leaderboard';
import PlayerProfile from './pages/PlayerProfile';




// 🛡️ PROTECTED ROUTE LOGIC
const ProtectedRoute = () => {
  // simple token existence check; interceptor will also reject invalid tokens
  const isAuthenticated = Boolean(localStorage.getItem('accessToken'));

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= PROTECTED ROUTES ================= */}
        <Route element={<ProtectedRoute />}>
          
          {/* Layout Wrapper (Sidebar & Navbar) */}
          <Route path="/" element={<Layout />}>
            
            {/* Default redirect */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* 🚀 Real Nested Pages Added Here */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/organizations" element={<OrganizationsPage />} /> 
            <Route path="/organizations/create" element={<CreateOrganizationPage />} />
            <Route path="/organizations/:id" element={<OrganizationDetailPage />} />
            <Route path="/tournaments/create" element={<CreateTournamentPage />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/matches/:matchId" element={<MatchDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/player/:playerId" element={<PlayerProfile />} />
            
          </Route>
          
        </Route>

      </Routes>
    </Router>
  );
}

export default App;