import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "@/repository/RepositoryFactory";
import { LoginRequest, SignupRequest } from "@/types/auth.types";
import { toast } from "@/components/ui/use-toast";

const auth = RepositoryFactory.get("auth");

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload: SignupRequest, thunkAPI) => {
    try {
      const response = await auth.signup(payload);
      toast({
        title: "Success!",
        description:
          response.data.message ||
          "Account created successfully. Please check your email to verify your account.",
      });
      return response.data;
    } catch (error: any) {
      console.log("Signup error:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Signup failed. Please try again.",
        variant: "destructive",
      });
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (payload, thunkAPI) => {
    try {
      const response = await auth.verifyEmail(payload);
      toast({
        title: "Success!",
        description:
          response.data.message ||
          "Email verified successfully. You can now log in.",
      });
      return response.data;
    } catch (error: any) {
      console.log("Email verification error:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Email verification failed. Please try again.",
        variant: "destructive",
      });
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, thunkAPI) => {
    try {
      const response = await auth.login(payload);
      toast({
        title: "Success!",
        description: response.data.message || "Login successful!",
      });

      const { user, accessToken, refreshToken } = response.data.data || {};
      return { user, accessToken, refreshToken };
    } catch (error: any) {
      console.log("Login error:", error);
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Login failed. Please try again.",
        variant: "destructive",
      });
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await auth.logout();
    toast({
      title: "Success!",
      description: response.data.message || "Logout successful!",
    });
    return response.data;
  } catch (error) {
    console.log("Logout error:", error);
    const axiosError = error as any;
    toast({
      title: "Error",
      description:
        axiosError?.response?.data?.message ||
        "Logout failed. Please try again.",
      variant: "destructive",
    });
    return thunkAPI.rejectWithValue(axiosError?.response?.data);
  }
});

export const checkAuth = createAsyncThunk("auth/check", async (_, thunkAPI) => {
  try {
    const meRes = await auth.me();
    return { user: meRes.data.data.user };
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      try {
        await auth.refresh(); // only refreshes cookie

        const meRes = await auth.me();
        return { user: meRes.data.data.user };
      } catch (refreshError: any) {
        return thunkAPI.rejectWithValue(
          refreshError?.response?.data || "Session expired"
        );
      }
    }

    return thunkAPI.rejectWithValue(
      error?.response?.data || "Authentication failed"
    );
  }
});
