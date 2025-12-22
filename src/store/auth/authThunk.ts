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
      return response.data;
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
    // toast.success(response.data.message || "Logout successful!");
    return response.data;
  } catch (error) {
    console.log("Logout error:", error);
    const axiosError = error as any;
    // toast.error(
    //   axiosError?.response?.data?.message || "Logout failed. Please try again."
    // );
    return thunkAPI.rejectWithValue(axiosError?.response?.data);
  }
});
