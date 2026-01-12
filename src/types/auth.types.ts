// User Types
export interface User {
  _id: string;
  email: string;
  fullName: string;
  role: "student" | "supervisor" | "coordinator";
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Auth Request Types
export interface LoginRequest {
  email: string;
  password: string;
}
export interface verifyEmailRequest {
  email: string;
  code: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  role?: "student" | "supervisor" | "coordinator";
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

// Auth Response Types
export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken?: string;
  refreshToken?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// Auth Context Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
  checkAuth: () => Promise<void>;
}
