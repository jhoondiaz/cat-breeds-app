export interface User {
  id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data:{
    user: User;
    token: string;
  }
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}