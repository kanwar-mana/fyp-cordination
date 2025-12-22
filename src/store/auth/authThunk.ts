import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "@/repository/RepositoryFactory";
import { LoginRequest, SignupRequest } from "@/types/auth.types";
import { toast } from "sonner";

const auth = RepositoryFactory.get("auth");

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload: SignupRequest, thunkAPI) => {
    try {
      const response = await auth.signup(payload);
      toast.success(response.data.message || "Signup successful!");
      return response.data;
    } catch (error) {
      const axiosError = error as any;
      console.log("Signup error:", error);
      toast.error(
        axiosError?.response?.data?.message ||
          "Signup failed. Please try again."
      );
      return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, thunkAPI) => {
    try {
      const response = await auth.login(payload);
      toast.success(response.data.message || "Login successful!");
      return response.data;
    } catch (error) {
      console.log("Login error:", error);
      const axiosError = error as any;
      toast.error(
        axiosError?.response?.data?.message || "Login failed. Please try again."
      );
      return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await auth.logout();
    toast.success(response.data.message || "Logout successful!");
    return response.data;
  } catch (error) {
    console.log("Logout error:", error);
    const axiosError = error as any;
    toast.error(
      axiosError?.response?.data?.message || "Logout failed. Please try again."
    );
    return thunkAPI.rejectWithValue(axiosError?.response?.data);
  }
});
