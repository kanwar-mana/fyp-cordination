import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import sessionReducer from "./session/sessionSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
