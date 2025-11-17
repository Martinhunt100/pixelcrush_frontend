import type {
  Character,
  CharacterApiResponse,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
  Conversation,
  Message
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pixelcrushbackend-production.up.railway.app';

export async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorData.error || errorData.message || `API Error: ${response.statusText}`);
  }

  return response.json();
}

// Auth APIs
export const authAPI = {
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    return apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },
};

// User APIs
export const userAPI = {
  getProfile: (): Promise<User> => apiCall('/api/users/profile'),
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
export async function getCharacters(): Promise<Character[]> {
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

  const data: CharacterApiResponse[] = await response.json();

  // Map character_name to name for consistency
  return data.map((char: CharacterApiResponse): Character => ({
    ...char,
    name: char.character_name || char.character_name
  }));
}

// Chat APIs
export const chatAPI = {
  startConversation: async (characterId: string): Promise<Conversation> => {
    return apiCall('/api/chat/start', {
      method: 'POST',
      body: JSON.stringify({ character_id: characterId }),
    });
  },
  sendMessage: async (conversationId: string, message: string): Promise<{ ai_response: string, message: Message }> => {
    return apiCall('/api/chat/message', {
      method: 'POST',
      body: JSON.stringify({
        conversation_id: conversationId,
        message: message,
      }),
    });
  },
  getConversations: (): Promise<Conversation[]> => apiCall('/api/conversations'),
  getMessages: (conversationId: string): Promise<Message[]> =>
    apiCall(`/api/conversations/${conversationId}/messages`),
};