import api from "./api";

/**
 * Transforms the backend's flat match response into the structure
 * expected by the frontend UI components (side_a_players, side_b_players, scores, etc.)
 */
const transformMatch = (m: any) => ({
    ...m,
    // Map flat player fields to arrays expected by card components
    side_a_players: m.player1_id
        ? [{ id: m.player1_id, name: m.player1_name || 'Player 1', avatar_url: m.player1_avatar }]
        : [],
    side_b_players: m.player2_id
        ? [{ id: m.player2_id, name: m.player2_name || 'Player 2', avatar_url: m.player2_avatar }]
        : [],
    // Map flat scores to scores array expected by LiveCard
    scores: (m.player1_score !== undefined && m.player1_score !== null)
        ? [{ side_a_score: m.player1_score || 0, side_b_score: m.player2_score || 0 }]
        : [],
    // Map winner_id to winner_side
    winner_side: m.winner_id
        ? (m.winner_id === m.player1_id ? 'Side_A' : 'Side_B')
        : null,
    // Map round to round_name for display
    round_name: m.round_name || m.round || '',
    // Normalize status to match frontend tab filters (first letter uppercase, rest lowercase)
    status: m.status
        ? m.status.charAt(0).toUpperCase() + m.status.slice(1).toLowerCase()
        : m.status,
    // Build final_score string for completed matches
    final_score: (m.player1_score !== undefined && m.player1_score !== null)
        ? `${m.player1_score} - ${m.player2_score}`
        : null,
});

export const matchService = {
    getAllMatches: async (params?: any) => {
        const response = await api.get("/matches", { params });
        // Transform each match in the data array
        if (response.data.success && Array.isArray(response.data.data)) {
            response.data.data = response.data.data.map(transformMatch);
        } else if (Array.isArray(response.data)) {
            response.data = response.data.map(transformMatch);
        }
        return response.data;
    },

    getTournamentMatches: async (tournamentId: string) => {
        const response = await api.get(`/tournaments/${tournamentId}/matches`);
        if (response.data.success && Array.isArray(response.data.data)) {
            response.data.data = response.data.data.map(transformMatch);
        }
        return response.data;
    },

    getMatchById: async (matchId: string) => {
        const response = await api.get(`/matches/${matchId}`);
        if (response.data.success && response.data.data) {
            response.data.data = transformMatch(response.data.data);
        } else if (response.data && !response.data.success) {
            // Some endpoints return data directly
            response.data = transformMatch(response.data);
        }
        return response.data;
    },

    generateBracketMatches: async (tournamentId: string, data?: any) => {
        const response = await api.post(`/tournaments/${tournamentId}/matches/generate`, data);
        return response.data;
    },

    updateMatchMetadata: async (matchId: string, data: any) => {
        const response = await api.put(`/matches/${matchId}`, data);
        return response.data;
    },

    updateMatchScore: async (matchId: string, scoreData: any) => {
        const response = await api.patch(`/matches/${matchId}/score`, scoreData);
        return response.data;
    },

    updateMatchStatus: async (matchId: string, statusData: any) => {
        const response = await api.patch(`/matches/${matchId}/status`, statusData);
        return response.data;
    },

    confirmMatchResult: async (matchId: string) => {
        const response = await api.post(`/matches/${matchId}/confirm-result`);
        return response.data;
    },

    assignUmpire: async (matchId: string, umpireData: any) => {
        const response = await api.post(`/matches/${matchId}/assign-umpire`, umpireData);
        return response.data;
    },

    disputeMatch: async (matchId: string, disputeData: any) => {
        const response = await api.post(`/matches/${matchId}/dispute`, disputeData);
        return response.data;
    },

    resolveDispute: async (matchId: string, resolutionData: any) => {
        const response = await api.post(`/matches/${matchId}/resolve-dispute`, resolutionData);
        return response.data;
    },

    cancelMatch: async (matchId: string) => {
        const response = await api.post(`/matches/${matchId}/cancel`);
        return response.data;
    },
};
