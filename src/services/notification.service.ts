import api from "./api";

export const notificationService = {
    sendDirectNotification: async (data: any) => {
        const response = await api.post("/notifications/send", data);
        return response.data;
    },

    bulkNotifyPlayers: async (tournamentId: string, data: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/notify-players`, data);
        return response.data;
    },

    uploadFile: async (fileData: FormData) => {
        // Override Content-Type for FormData
        const response = await api.post("/uploads", fileData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    deleteFile: async (uploadId: string) => {
        const response = await api.delete(`/uploads/${uploadId}`);
        return response.data;
    },

    exportCsv: async (tournamentId: string) => {
        const response = await api.get(`/tournaments/${tournamentId}/export/csv`, { responseType: "blob" });
        return response.data;
    },

    getReport: async (tournamentId: string) => {
        const response = await api.get(`/tournaments/${tournamentId}/report`, { responseType: "blob" });
        return response.data;
    },

    registerWebhook: async (data: any) => {
        const response = await api.post("/webhooks", data);
        return response.data;
    },

    getWebhookLogs: async (webhookId: string) => {
        const response = await api.get(`/webhooks/${webhookId}/logs`);
        return response.data;
    },

    manageSponsors: async (tournamentId: string, data: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/sponsors`, data);
        return response.data;
    },
};
