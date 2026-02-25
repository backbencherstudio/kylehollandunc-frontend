export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  }

  /** Raw API shape: { status, success, data, message } — login returns token in data.token */
  export interface LoginApiResponse {
    status?: string;
    success?: boolean;
    data: {
      id: number;
      name: string;
      email: string;
      email_verified_at?: string | null;
      role?: string;
      created_at?: string;
      updated_at?: string;
      token?: string;
    };
    message?: string;
    token?: string;
    accessToken?: string;
    access_token?: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
  }
  
  export interface RegisterResponse {
    success: boolean;
  }