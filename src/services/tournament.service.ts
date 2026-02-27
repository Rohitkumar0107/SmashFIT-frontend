// src/services/tournament.service.ts
import api from './api';

const ROUTE = '/tournaments';

export const tournamentService = {
  // Create a new tournament with categories
  create: async (tournamentData: any) => {
    try {
      const response = await api.post(`${ROUTE}/create`, tournamentData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create tournament");
    }
  },

  // Get all tournaments (For Feed)
  getAll: async () => {
    try {
      const response = await api.get(`${ROUTE}/all`);
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

  
};