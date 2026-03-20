const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const API = {
  challenges: {
    list: `${API_BASE}/api/challenges`,
    create: `${API_BASE}/api/challenges`,
    get: (id: string) => `${API_BASE}/api/challenges/${encodeURIComponent(id)}`,
    like: (id: string) => `${API_BASE}/api/challenges/like/${encodeURIComponent(id)}`,
    save: (id: string) => `${API_BASE}/api/challenges/${encodeURIComponent(id)}/save`,
    delete: (id: string) => `${API_BASE}/api/challenges/${encodeURIComponent(id)}`,
    report: (id: string) => `${API_BASE}/api/challenges/${encodeURIComponent(id)}/report`,
    saved: `${API_BASE}/api/challenges/saved`,
  },
  users: {
    list: `${API_BASE}/api/users`,
    profile: (id: string) => `${API_BASE}/api/users/profile/${encodeURIComponent(id)}`,
    session: `${API_BASE}/api/auth/get-session`,
  },
  items: {
    list: `${API_BASE}/api/items`,
    private: `${API_BASE}/api/items/private`,
    vote: (challengeId: string) => `${API_BASE}/api/items/${encodeURIComponent(challengeId)}`,
  },
};
