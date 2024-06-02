import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: localStorage.getItem("isLogged") === "true" || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTrue(state) {
      state.isAuth = true;
      localStorage.setItem("isLogged", "true");
    },
    setFalse(state) {
      state.isAuth = false;
      localStorage.setItem("isLogged", "false");
    },
  },
});

export const { setFalse, setTrue } = authSlice.actions;

export default authSlice.reducer;
