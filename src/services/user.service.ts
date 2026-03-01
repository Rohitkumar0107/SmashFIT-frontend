import api from "./api";

export const userService = {
    getMe: async () => {
        const response = await api.get("/users/me");
        return response.data;
    },

    getUserById: async (id: string) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    updateProfile: async (id: string, data: any) => {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    },

    listUsers: async (params?: any) => {
        const response = await api.get("/users", { params });
        return response.data;
    },

    assignRoles: async (id: string, roles: string[]) => {
        const response = await api.post(`/users/${id}/roles`, { roles });
        return response.data;
    },

    getUserActivity: async (id: string) => {
        const response = await api.get(`/users/${id}/activity`);
        return response.data;
    },

    getUserNotifications: async (id: string) => {
        const response = await api.get(`/users/${id}/notifications`);
        return response.data;
    },

    updateSettings: async (id: string, settings: any) => {
        const response = await api.put(`/users/${id}/settings`, settings);
        return response.data;
    },
};
