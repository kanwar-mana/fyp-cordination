import { createSlice } from "@reduxjs/toolkit";
import { getSupervisors, getStudents } from "./userThunk";

interface UserState {
  user: any | null;
  supervisors: any[];
  students: any[];
}

const initialState: UserState = {
  user: null,
  supervisors: [],
  students: [],
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSupervisors.fulfilled, (state, action) => {
        state.supervisors = action.payload || [];
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.students = action.payload || [];
      });
  },
});

export default userslice.reducer;
