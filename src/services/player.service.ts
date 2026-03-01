import api from "./api";

export const playerService = {
    createPlayer: async (playerData: any) => {
        const response = await api.post("/players", playerData);
        return response.data;
    },

    searchPlayers: async (params?: any) => {
        const response = await api.get("/players", { params });
        return response.data;
    },

    getPlayerById: async (playerId: string) => {
        const response = await api.get(`/players/${playerId}`);
        return response.data;
    },

    updatePlayer: async (playerId: string, playerData: any) => {
        const response = await api.put(`/players/${playerId}`, playerData);
        return response.data;
    },

    getPlayerTournaments: async (playerId: string) => {
        const response = await api.get(`/players/${playerId}/tournaments`);
        return response.data;
    },

    getHeadToHeadStats: async (playerId: string, otherId: string) => {
        const response = await api.get(`/players/${playerId}/h2h/${otherId}`);
        return response.data;
    },
};
