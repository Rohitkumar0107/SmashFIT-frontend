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
import Settings from './pages/Settings';
import Teams from './pages/Teams';
import UmpireScorePad from './pages/UmpireScorePad';
import UmpireDashboard from './pages/UmpireDashboard';
import BracketViewer from './pages/BracketViewer';
import CourtOccupancy from './pages/CourtOccupancy';
import PaymentsPage from './pages/PaymentsPage';
import NotificationsPage from './pages/NotificationsPage';
import AdminPanel from './pages/AdminPanel';


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

            {/* 🚀 Core Pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/organizations" element={<OrganizationsPage />} />
            <Route path="/organizations/create" element={<CreateOrganizationPage />} />
            <Route path="/organizations/:id" element={<OrganizationDetailPage />} />
            <Route path="/tournaments/create" element={<CreateTournamentPage />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/:id" element={<TournamentDetail />} />
            <Route path="/tournaments/:id/brackets" element={<BracketViewer />} />
            <Route path="/tournaments/:id/courts" element={<CourtOccupancy />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/matches/:matchId" element={<MatchDetail />} />
            <Route path="/umpire/latest" element={<UmpireDashboard />} />
            <Route path="/umpire/:matchId" element={<UmpireScorePad />} />

            {/* 👤 User & Profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/player/:playerId" element={<PlayerProfile />} />

            {/* 💳 Payments & Notifications */}
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            {/* 🔐 Admin */}
            <Route path="/admin" element={<AdminPanel />} />

          </Route>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;