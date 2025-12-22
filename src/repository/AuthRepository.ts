import apiClient from "./index";
import type {
  LoginRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
  ApiResponse,
  User,
} from "@/types/auth.types";

const AUTH_BASE = "/auth";

const SIGNUP = `${AUTH_BASE}/signup`;
const LOGIN = `${AUTH_BASE}/login`;
const LOGOUT = `${AUTH_BASE}/logout`;
const FORGOT_PASSWORD = `${AUTH_BASE}/forgot-password`;
const RESET_PASSWORD = `${AUTH_BASE}/reset-password`;

export default {
  signup(payload: SignupRequest) {
    return apiClient.post<AuthResponse>(SIGNUP, payload);
  },

  login(payload: LoginRequest) {
    return apiClient.post<AuthResponse>(LOGIN, payload);
  },

  logout() {
    return apiClient.post<ApiResponse>(LOGOUT);
  },

  forgotPassword(payload: ForgotPasswordRequest) {
    return apiClient.post<ApiResponse>(FORGOT_PASSWORD, payload);
  },

  resetPassword(payload: ResetPasswordRequest) {
    return apiClient.post<ApiResponse>(RESET_PASSWORD, payload);
  },
};
