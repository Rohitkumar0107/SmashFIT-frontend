import api from "./api";

export const paymentService = {
    createCheckoutSession: async (data: any) => {
        const response = await api.post("/payments/create-checkout", data);
        return response.data;
    },

    refundPayment: async (data: any) => {
        const response = await api.post("/payments/refund", data);
        return response.data;
    },

    verifyManualPayment: async (data: any) => {
        const response = await api.post("/payments/verify", data);
        return response.data;
    },

    getPaymentHistory: async (params?: any) => {
        const response = await api.get("/payments/history", { params });
        return response.data;
    },
};
