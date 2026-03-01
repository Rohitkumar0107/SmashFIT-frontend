// src/services/organization.service.ts
import api from './api'; // 👈 Tera master Axios instance

// Kyunki api.ts mein baseURL "/api" tak hai, hum yahan sirf "/organizations" use karenge
const ROUTE = '/organizations';

export const organizationService = {

  // 1. Get All Organizations
  getAll: async () => {
    try {
      const response = await api.get(`${ROUTE}/`);
      // Axios response data `.data` mein daalta hai. 
      // Tera backend { success: true, data: [...] } bhejta hai.
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch organizations");
    }
  },

  // 2. Get Organization by ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`${ROUTE}/${id}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch organization details");
    }
  },

  // 3. Create a New Organization (Protected)
  create: async (orgData: any) => {
    try {
      const response = await api.post(`${ROUTE}/`, orgData);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create organization");
    }
  },

  // 4. Update an Organization (Protected)
  update: async (id: string, updateData: any) => {
    try {
      const response = await api.put(`${ROUTE}/${id}`, updateData);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update organization");
    }
  },

  // 5. Delete an Organization (Protected)
  delete: async (id: string) => {
    try {
      const response = await api.delete(`${ROUTE}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete organization");
    }
  },

  // 6. Invite staff/members
  inviteMember: async (id: string, inviteData: any) => {
    const response = await api.post(`${ROUTE}/${id}/invite`, inviteData);
    return response.data;
  },

  // 7. Accept staff invite
  acceptInvite: async (id: string, data: any) => {
    const response = await api.post(`${ROUTE}/${id}/accept-invite`, data);
    return response.data;
  },

  // 8. Manage org-level permissions
  manageRoles: async (id: string, roleData: any) => {
    const response = await api.post(`${ROUTE}/${id}/roles`, roleData);
    return response.data;
  },

  // 9. Create discount codes for events
  createVoucher: async (id: string, voucherData: any) => {
    const response = await api.post(`${ROUTE}/${id}/vouchers`, voucherData);
    return response.data;
  },

  // 10. List organization staff
  getMembers: async (id: string) => {
    const response = await api.get(`${ROUTE}/${id}/members`);
    return response.data;
  },
};