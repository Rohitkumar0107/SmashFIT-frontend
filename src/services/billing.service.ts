import api from "./api";

export const billingService = {
    getOrganizationBilling: async (orgId: string) => {
        const response = await api.get(`/billing/organization/${orgId}`);
        return response.data;
    },

    getAvailablePlans: async () => {
        const response = await api.get("/billing/plans");
        return response.data;
    },

    manageSubscription: async (data: any) => {
        const response = await api.post("/billing/subscriptions", data);
        return response.data;
    },

    getPayouts: async (params?: any) => {
        const response = await api.get("/billing/payouts", { params });
        return response.data;
    },
};
