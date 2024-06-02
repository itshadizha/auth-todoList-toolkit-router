import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todoSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    auth: authSlice,
  },
});
