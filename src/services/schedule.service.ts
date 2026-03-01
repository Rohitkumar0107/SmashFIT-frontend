import api from "./api";

export const scheduleService = {
    autoAssignMaches: async (tournamentId: string, scheduleData?: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/schedule/auto`, scheduleData);
        return response.data;
    },

    getScheduledSlot: async (scheduleId: string) => {
        const response = await api.get(`/schedules/${scheduleId}`);
        return response.data;
    },
};
