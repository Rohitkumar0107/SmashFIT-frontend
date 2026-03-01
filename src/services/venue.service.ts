import api from "./api";

export const venueService = {
    addVenue: async (venueData: any) => {
        const response = await api.post("/venues", venueData);
        return response.data;
    },

    getVenueById: async (venueId: string) => {
        const response = await api.get(`/venues/${venueId}`);
        return response.data;
    },

    defineCourts: async (tournamentId: string, courtData: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/courts`, courtData);
        return response.data;
    },

    getCourtOccupancy: async (tournamentId: string) => {
        const response = await api.get(`/tournaments/${tournamentId}/court-occupancy`);
        return response.data;
    },
};
