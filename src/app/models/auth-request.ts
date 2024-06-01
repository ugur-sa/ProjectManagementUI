export interface LoginRequest {
  password: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  email: string;
}
