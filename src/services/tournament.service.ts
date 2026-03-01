// src/services/tournament.service.ts
import api from './api';

const ROUTE = '/tournaments';

export const tournamentService = {
  // Create a new tournament with categories
  create: async (tournamentData: any) => {
    try {
      const response = await api.post(`${ROUTE}/`, tournamentData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create tournament");
    }
  },

  // Get all tournaments (For Feed)
  getAll: async () => {
    try {
      const response = await api.get(`${ROUTE}/`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch tournaments");
    }
  },

  // Get tournament details by ID (For Tournament Details Page)

  getById: async (id: string) => {
    try {
      const response = await api.get(`${ROUTE}/${id}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch tournament details");
    }
  },

  // 2. Register for a category
  register: async (categoryId: string) => {
    try {
      const response = await api.post(`${ROUTE}/register`, { category_id: categoryId });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  // 3. Publish / go live
  publish: async (id: string) => {
    const response = await api.post(`${ROUTE}/${id}/publish`);
    return response.data;
  },

  // 4. Clone tournament template
  clone: async (id: string) => {
    const response = await api.post(`${ROUTE}/${id}/clone`);
    return response.data;
  },

  // 5. Cancel registration
  cancelRegistration: async (id: string, data?: any) => {
    const response = await api.post(`${ROUTE}/${id}/cancel-registration`, data);
    return response.data;
  },

  // 6. On-site check-in
  checkIn: async (id: string, data: any) => {
    const response = await api.post(`${ROUTE}/${id}/check-in`, data);
    return response.data;
  },

  // 7. Submit signed waiver
  submitWaiver: async (id: string, data: any) => {
    const response = await api.post(`${ROUTE}/${id}/waivers`, data);
    return response.data;
  },

  // 8. List participants
  getEntries: async (id: string) => {
    const response = await api.get(`${ROUTE}/${id}/entries`);
    return response.data;
  },

  // 9. View waitlisted entries
  getWaitlist: async (id: string) => {
    const response = await api.get(`${ROUTE}/${id}/waitlist`);
    return response.data;
  },

  // 10. Bulk CSV/Excel upload
  importParticipants: async (id: string, formData: FormData) => {
    const response = await api.post(`${ROUTE}/${id}/import/participants`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // 11. Track shuttlecock usage
  manageShuttles: async (id: string, data: any) => {
    const response = await api.post(`${ROUTE}/${id}/shuttles`, data);
    return response.data;
  },

  // 12. Update tournament
  update: async (id: string, data: any) => {
    const response = await api.put(`${ROUTE}/${id}`, data);
    return response.data;
  },

  // 13. Delete tournament
  deleteTournament: async (id: string) => {
    const response = await api.delete(`${ROUTE}/${id}`);
    return response.data;
  },
};