import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "@/repository/RepositoryFactory";
import { toast } from "@/components/ui/use-toast";

const users = RepositoryFactory.get("users");

export const getSupervisors = createAsyncThunk(
  "users/getSupervisors",
  async (_, thunkAPI) => {
    try {
      const response = await users.getSupervisors();
      return response.data.data;
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to fetch supervisors. Please try again.",
        variant: "destructive",
      });
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  },
);

export const getStudents = createAsyncThunk(
  "users/getStudents",
  async (_, thunkAPI) => {
    try {
      const response = await users.getStudents();
      return response.data.students;
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to fetch students. Please try again.",
        variant: "destructive",
      });
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  },
);
