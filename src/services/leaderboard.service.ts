import api from "./api";

export const leaderboardService = {
    getGlobalLeaderboard: async (params?: any) => {
        const response = await api.get("/leaderboard/global", { params });
        return response.data;
    },

    getTournamentLeaderboard: async (tournamentId: string, params?: any) => {
        const response = await api.get(`/tournaments/${tournamentId}/leaderboard`, { params });
        return response.data;
    },

    recalculateRankings: async () => {
        const response = await api.post("/rankings/recalculate");
        return response.data;
    },

    getOrganizationDashboard: async (orgId: string) => {
        const response = await api.get(`/dashboard/organization/${orgId}`);
        return response.data;
    },

    getTournamentDashboard: async (tournamentId: string) => {
        const response = await api.get(`/dashboard/tournament/${tournamentId}`);
        return response.data;
    },

    getPlayerGrowthAnalytics: async () => {
        const response = await api.get("/analytics/players/growth");
        return response.data;
    },
};
