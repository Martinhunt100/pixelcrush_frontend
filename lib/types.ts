export interface Character {
  id: string | number;
  character_name?: string;
  name: string;
  age?: number;
  occupation?: string;
  tagline?: string;
  profile_image_url?: string;
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
