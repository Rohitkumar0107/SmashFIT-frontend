import { useState, useEffect } from "react";
import { Bell, Shield, Save, Loader2, Key } from "lucide-react";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";

const Settings = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [settings, setSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: false,
        profileVisibility: "public",
        showRanking: true,
    });

    useEffect(() => {
        const fetchUserAndSettings = async () => {
            try {
                const profileData = await authService.getProfile();
                if (profileData?.user) {
                    setUser(profileData.user);
                    // Assuming user.settings comes from backend or we simulate
                    if (profileData.user.settings) {
                        setSettings({ ...settings, ...profileData.user.settings });
                    }
                }
            } catch (error) {
                console.error("Failed to load settings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserAndSettings();
    }, []);

    const handleToggle = (key: keyof typeof settings) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await userService.updateSettings(user.id, settings);
            // Optional: Add toast success here
        } catch (error) {
            console.error("Failed to save settings", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 border-b border-slate-200 pb-4">Account Settings</h1>
                <p className="text-slate-500 mt-2">Manage your email preferences, privacy, and security.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Sidebar Navigation (Optional for future expansion) */}
                <div className="col-span-1 space-y-2">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-slate-200 text-slate-900 font-medium">
                            <Bell size={18} /> Notifications
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors">
                            <Shield size={18} /> Privacy
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors">
                            <Key size={18} /> Security
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-span-1 md:col-span-2 space-y-8">

                    {/* Notifications Section */}
                    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm shadow-slate-100/50">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                            <Bell className="text-blue-500" /> Notifications
                        </h2>
                        <div className="space-y-4">

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <h3 className="font-semibold text-slate-900">Email Notifications</h3>
                                    <p className="text-sm text-slate-500">Receive match updates and tournament news.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={settings.emailNotifications} onChange={() => handleToggle("emailNotifications")} />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <h3 className="font-semibold text-slate-900">SMS Alerts</h3>
                                    <p className="text-sm text-slate-500">Get text messages for imminent matches.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={settings.smsNotifications} onChange={() => handleToggle("smsNotifications")} />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                        </div>
                    </section>

                    {/* Privacy Section */}
                    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm shadow-slate-100/50">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                            <Shield className="text-green-500" /> Privacy & Visibility
                        </h2>
                        <div className="space-y-4">

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div>
                                    <h3 className="font-semibold text-slate-900">Show Player Ranking</h3>
                                    <p className="text-sm text-slate-500">Display global and regional rankings on your profile.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={settings.showRanking} onChange={() => handleToggle("showRanking")} />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                </label>
                            </div>

                            <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <h3 className="font-semibold text-slate-900">Profile Visibility</h3>
                                <select
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-slate-900 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={settings.profileVisibility}
                                    onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                                >
                                    <option value="public">Public (Everyone can see your stats)</option>
                                    <option value="private">Private (Only Tournament Admins)</option>
                                    <option value="friends">Friends Only (Coming Soon)</option>
                                </select>
                            </div>

                        </div>
                    </section>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-70"
                        >
                            {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            {saving ? "Saving..." : "Save Settings"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
