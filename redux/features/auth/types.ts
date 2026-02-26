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







  //         Forgot Password          //
  export interface ForgotPasswordRequest {
    email: string;
  }
  export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
  }


  //         Verify OTP          //
  export interface VerifyOtpRequest {
    email: string;
    otp: string;
  }


  //         Reset Password          //
  export interface ResetPasswordRequest {
    email: string;
    new_password: string;
    confirm_password: string;
  }
  export interface ResetPasswordResponse {
    success: boolean;
    message: string;
  }


