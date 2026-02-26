export const formatPlayers = (players: any[]) => {
  if (!players || !Array.isArray(players) || players.length === 0) return "TBD";
  return players.map((p: any) => p.name).join(' / ');
};

export const formatTime = (dateString: string) => {
  if (!dateString) return "TBD";
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "TBD";
  return new Date(dateString).toLocaleDateString([], { day: 'numeric', month: 'short' });
};