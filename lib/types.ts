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
  age_confirmed: boolean;
}

export interface Conversation {
  id: string;
  conversation_id?: string; // Backend may return this field
  character_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  character?: {
    id: string | number;
    name: string;
    image?: string;
    avatar_url?: string;
    age?: number;
  };
  last_message?: string;
  message_count?: number;
  model?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender: 'user' | 'ai' | 'character' | 'system';
  modality?: string;
  content: string;
  image_url?: string | null;
  video_url?: string | null;
  audio_url?: string | null;
  audio_duration_ms?: number | null;
  tokens_cost?: number;
  created_at: string;
  temporary?: boolean;
  failed?: boolean;
}
