export interface LoginRequest {
  password: string;
  email: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface UserInterface {
  token: string;
  email: string;
  username: string;
}
