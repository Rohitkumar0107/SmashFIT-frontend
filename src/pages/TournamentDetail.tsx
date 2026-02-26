import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swords, Trophy } from 'lucide-react';
import api from '../services/api';

// Shared & Feature Components
import TabNavigation from '../components/ui/TabNavigation';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import EmptyState from '../components/ui/EmptyState';
import TournamentHero from '../components/tournament-detail/TournamentHero';
import TournamentSidebar from '../components/tournament-detail/TournamentSidebar';
import CategoryCard from '../components/tournament-detail/CategoryCard';
import TournamentRules from '../components/tournament-detail/TournamentRules';

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  
  const [t, setT] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      if (!id || id === 'undefined') return;

      try {
        setLoading(true);
        const response = await api.get(`/tournaments/${id}`);
        if (response.data.success) {
          setT(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tournament details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [id]);

  if (loading) {
    return <SkeletonLoader text="Loading Arena..." minHeight="min-h-[60vh]" />;
  }

  if (!t) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <EmptyState 
          icon={<Trophy size={64} className="text-slate-300" />} 
          title="Tournament Not Found" 
          subtitle="The arena you are looking for doesn't exist." 
        />
        <button 
          onClick={() => navigate('/tournaments')} 
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Back to Tournaments
        </button>
      </div>
    );
  }

  const isRegistrationOpen = t.status === 'REGISTRATION_OPEN';
  const startDate = new Date(t.startDate).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
  const deadlineDate = t.registrationDeadline 
    ? new Date(t.registrationDeadline).toLocaleDateString([], { day: 'numeric', month: 'short' })
    : 'TBA';

  return (
    <div className="animate-in fade-in duration-500 pb-24">
      
      {/* 1. HERO COMPONENT */}
      <TournamentHero tournament={t} isRegistrationOpen={isRegistrationOpen} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-0">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          
          <TabNavigation 
            tabs={['OVERVIEW', 'CATEGORIES', 'BRACKETS']} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />

          {/* TAB: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <TournamentRules description={t.description} rules={t.rules} />
          )}

          {/* TAB: CATEGORIES */}
          {activeTab === 'CATEGORIES' && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2 px-2">
                Available Events
              </h3>
              {t.categories && t.categories.map((cat: any) => (
                <CategoryCard key={cat.id} category={cat} isRegistrationOpen={isRegistrationOpen} />
              ))}
            </div>
          )}

          {/* TAB: BRACKETS */}
          {activeTab === 'BRACKETS' && (
            <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm text-center animate-in slide-in-from-bottom-4 duration-300">
              <Swords size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Draws not released yet</h3>
              <p className="text-slate-500 font-medium">Brackets will be visible here once registration closes.</p>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN (SIDEBAR COMPONENT) */}
        <div className="lg:col-span-1">
          <TournamentSidebar 
            tournament={t} 
            startDate={startDate} 
            deadlineDate={deadlineDate} 
            isRegistrationOpen={isRegistrationOpen} 
          />
        </div>

      </div>
    </div>
  );
};

export default TournamentDetail;