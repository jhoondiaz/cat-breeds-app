export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
// Auth interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    token: string;
    user: AuthUser;
  };
  message?: string;
  success: boolean;
}

// Extend AuthUser to match User interface for compatibility
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RegisterResponse {
  data: {
    token: string;
    user: AuthUser;
  };
  message?: string;
  success: boolean;
}
