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
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add Authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // DIAGNOSTIC LOGGING
  const fullUrl = `${API_URL}${endpoint}`;
  const method = options.method || 'GET';
  const maskedToken = token ? `Bearer ${token.substring(0, 10)}...${token.substring(token.length - 5)}` : 'NO TOKEN';

  console.group(`🔍 API Request: ${method} ${endpoint}`);
  console.log('📍 Full URL:', fullUrl);
  console.log('🔑 Authorization:', maskedToken);
  console.log('📦 Request Body:', options.body || 'No body');
  console.log('🔧 Method:', method);
  console.log('📋 Headers:', { ...headers, Authorization: maskedToken });
  console.groupEnd();

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));

      // DIAGNOSTIC LOGGING FOR ERRORS
      console.group(`❌ API Error: ${response.status} ${method} ${endpoint}`);
      console.log('📍 URL:', fullUrl);
      console.log('🔢 Status Code:', response.status);
      console.log('📄 Status Text:', response.statusText);
      console.log('📦 Error Data:', errorData);
      console.log('🔑 Had Token:', token ? 'YES' : 'NO');
      console.groupEnd();

      // Provide user-friendly error messages
      let errorMessage = errorData.error || errorData.message;

      if (response.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
      } else if (response.status === 403) {
        errorMessage = 'Access denied. Please check your permissions.';
      } else if (response.status === 404) {
        errorMessage = 'The requested resource was not found.';
      } else if (response.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (response.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (!errorMessage) {
        errorMessage = `Something went wrong (${response.status})`;
      }

      throw new Error(errorMessage);
    }

    // DIAGNOSTIC LOGGING FOR SUCCESS
    console.log(`✅ API Success: ${method} ${endpoint} (${response.status})`);

    return response.json();
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
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
      localStorage.removeItem('token');
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
  startConversation: async (characterId: string | number): Promise<Conversation> => {
    return apiCall('/api/chat/start', {
      method: 'POST',
      body: JSON.stringify({ character_id: characterId }),
    });
  },
  sendMessage: async (conversationId: number, content: string): Promise<{ userMessage: Message, aiMessage: Message }> => {
    return apiCall('/api/chat/message', {
      method: 'POST',
      body: JSON.stringify({
        conversation_id: conversationId,
        content: content,
      }),
    });
  },
  getConversations: (): Promise<Conversation[]> => apiCall('/api/conversations'),
  getMessages: (conversationId: number): Promise<Message[]> =>
    apiCall(`/api/chat/${conversationId}/messages`),
};