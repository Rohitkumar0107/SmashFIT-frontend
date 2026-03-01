import api from "./api";

export const adminService = {
    checkHealth: async () => {
        const response = await api.get("/admin/health");
        return response.data;
    },

    checkReadiness: async () => {
        const response = await api.get("/health/readiness");
        return response.data;
    },

    checkLiveness: async () => {
        const response = await api.get("/health/liveness");
        return response.data;
    },

    reindexSearch: async () => {
        const response = await api.post("/admin/reindex");
        return response.data;
    },

    getAuditLogs: async (params?: any) => {
        const response = await api.get("/admin/audit-logs", { params });
        return response.data;
    },

    exportPrivacyData: async (userId: string) => {
        const response = await api.get(`/privacy/export-user/${userId}`, { responseType: "blob" });
        return response.data;
    },

    deletePrivacyData: async (userId: string) => {
        const response = await api.delete(`/privacy/delete-user/${userId}`);
        return response.data;
    },

    getActiveDisputes: async (params?: any) => {
        const response = await api.get("/admin/disputes", { params });
        return response.data;
    },

    createApiKey: async (data: any) => {
        const response = await api.post("/api-keys", data);
        return response.data;
    },

    listApiKeys: async () => {
        const response = await api.get("/api-keys");
        return response.data;
    },

    getGlobalSettings: async () => {
        const response = await api.get("/settings");
        return response.data;
    },

    startMaintenance: async () => {
        const response = await api.post("/admin/maintenance/start");
        return response.data;
    },

    stopMaintenance: async () => {
        const response = await api.post("/admin/maintenance/stop");
        return response.data;
    },

    globalSearch: async (query: string) => {
        const response = await api.get("/search", { params: { q: query } });
        return response.data;
    },
};
