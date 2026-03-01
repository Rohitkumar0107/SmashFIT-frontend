import api from "./api";

export const bracketService = {
    getBracketVisualData: async (tournamentId: string) => {
        const response = await api.get(`/tournaments/${tournamentId}/brackets`);
        return response.data;
    },

    generateBracketLogic: async (tournamentId: string, data?: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/brackets/generate`, data);
        return response.data;
    },

    manuallyAdvancePlayer: async (tournamentId: string, bracketId: string, data: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/brackets/${bracketId}/advance`, data);
        return response.data;
    },

    autoSeed: async (tournamentId: string) => {
        const response = await api.post(`/tournaments/${tournamentId}/seeding/auto`);
        return response.data;
    },

    applyManualSeeds: async (tournamentId: string, seedingData: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/seeding/manual`, seedingData);
        return response.data;
    },

    getSeedingStatus: async (tournamentId: string) => {
        const response = await api.get(`/tournaments/${tournamentId}/seeding/status`);
        return response.data;
    },

    randomizeDraw: async (tournamentId: string) => {
        const response = await api.post(`/tournaments/${tournamentId}/draws/shuffle`);
        return response.data;
    },
};
