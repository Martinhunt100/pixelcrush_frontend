export interface Character {
  id: string | number;
  character_name?: string;
  name: string;
  age?: number;
  occupation?: string;
  tagline?: string;
  avatar_url?: string;
  personality?: string;
  scenario?: string;
  created_at?: string;
}

// Raw character data from API (before mapping)
export interface CharacterApiResponse {
  id: string | number;
  character_name: string;
  age?: number;
  occupation?: string;
  tagline?: string;
  avatar_url?: string;
  personality?: string;
  scenario?: string;
  created_at?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  tokens?: number;
  created_at?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username?: string;
}

export interface Conversation {
  id: string;
  character_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_type: 'user' | 'ai';
  content: string;
  created_at: string;
}
