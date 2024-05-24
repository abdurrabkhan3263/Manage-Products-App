import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  user: {
    user: null,
    status: false,
  },
  darkMode: false,
};

const authSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    login: (state, action) => {
      initialValue.user.user = action;
      initialValue.user.status = true;
    },
    logout: () => {
      initialValue.user.user = null;
      initialValue.user.status = false;
    },
    toggleDarkMode: (state, action) => {
      console.log(!action.payload);
      // initialValue.darkMode = action.payload;
    },
  },
});

export const { login, logout, toggleDarkMode } = authSlice.actions;
export default authSlice.reducer;
