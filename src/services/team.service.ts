import api from "./api";

export const teamService = {
    createTeam: async (teamData: any) => {
        const response = await api.post("/teams", teamData);
        return response.data;
    },

    manageTeamRoster: async (teamId: string, rosterData: any) => {
        const response = await api.post(`/teams/${teamId}/members`, rosterData);
        return response.data;
    },
};
