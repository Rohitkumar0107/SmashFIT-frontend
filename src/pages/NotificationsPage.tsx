import { useState, useEffect } from "react";
import { Bell, Trash2, CheckCheck } from "lucide-react";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";
import SkeletonLoader from "../components/ui/SkeletonLoader";

const NotificationsPage = () => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const profile = await authService.getProfile();
                if (profile?.user?.id) {
                    const response = await userService.getUserNotifications(profile.user.id);
                    if (response.success) {
                        setNotifications(response.data || []);
                    } else {
                        setNotifications(getDemoNotifications());
                    }
                }
            } catch {
                setNotifications(getDemoNotifications());
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const getDemoNotifications = () => [
        { id: "1", title: "Match Starting Soon!", message: "Your match vs Aryan Singh starts in 15 minutes on Court 3.", type: "match", read: false, created_at: "2026-03-01T12:00:00Z" },
        { id: "2", title: "Registration Confirmed", message: "You have been registered for Winter Open 2026 - Men's Singles.", type: "tournament", read: false, created_at: "2026-02-28T10:30:00Z" },
        { id: "3", title: "New Ranking Update", message: "Your ELO rating has been updated to 1450 (+25).", type: "ranking", read: true, created_at: "2026-02-27T08:00:00Z" },
        { id: "4", title: "Payment Successful", message: "₹500 paid for Spring Smash 2026 registration.", type: "payment", read: true, created_at: "2026-02-25T14:45:00Z" },
    ];

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "match": return "bg-emerald-100 text-emerald-600";
            case "tournament": return "bg-blue-100 text-blue-600";
            case "ranking": return "bg-amber-100 text-amber-600";
            case "payment": return "bg-indigo-100 text-indigo-600";
            default: return "bg-slate-100 text-slate-600";
        }
    };

    const formatTime = (dateStr: string) => {
        const d = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHrs < 1) return "Just now";
        if (diffHrs < 24) return `${diffHrs}h ago`;
        const diffDays = Math.floor(diffHrs / 24);
        return `${diffDays}d ago`;
    };

    if (loading) return <SkeletonLoader text="Loading Notifications..." minHeight="min-h-[60vh]" />;

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-10">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                        <Bell className="text-blue-500" /> Notifications
                    </h1>
                    <p className="text-slate-500 mt-1 font-semibold">{unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}</p>
                </div>
                {unreadCount > 0 && (
                    <button onClick={markAllRead} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95">
                        <CheckCheck size={18} /> Mark All Read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-16 text-center">
                    <Bell size={48} className="mx-auto text-slate-300 mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No Notifications</h2>
                    <p className="text-slate-500">You're all caught up. We'll notify you when something happens.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notif) => (
                        <div key={notif.id} className={`bg-white rounded-2xl border p-5 flex items-start gap-4 transition-all hover:shadow-md ${notif.read ? 'border-slate-200' : 'border-blue-200 shadow-sm shadow-blue-100/50'}`}>

                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getTypeColor(notif.type)}`}>
                                <Bell size={20} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className={`font-bold text-slate-900 truncate ${!notif.read ? '' : 'opacity-70'}`}>{notif.title}</h3>
                                    {!notif.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>}
                                </div>
                                <p className="text-sm text-slate-500 line-clamp-2">{notif.message}</p>
                                <p className="text-xs text-slate-400 mt-2 font-semibold">{formatTime(notif.created_at)}</p>
                            </div>

                            <button onClick={() => deleteNotification(notif.id)} className="text-slate-300 hover:text-red-500 transition-colors shrink-0 p-1">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
