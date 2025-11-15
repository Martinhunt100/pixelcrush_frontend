const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('auth_token');

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// User APIs
export const userAPI = {
  getProfile: () => apiCall('/api/users/profile'),
  updateTokens: (amount: number) => apiCall('/api/users/tokens', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  }),
};

// Character APIs
export const characterAPI = {
  getAll: () => apiCall('/api/characters'),
  getById: (id: string) => apiCall(`/api/characters/${id}`),
};

// Direct fetch for characters (for client components)
export async function getCharacters() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const response = await fetch(`${API_URL}/api/characters`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Disable caching for development
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.statusText}`);
  }

  return response.json();
}

// Chat APIs
export const chatAPI = {
  getConversations: () => apiCall('/api/conversations'),
  sendMessage: (conversationId: string, message: string) => 
    apiCall(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
};