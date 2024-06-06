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
      state.user.user = action.payload;
      state.user.status = true;
    },
    logout: (state) => {
      state.user.user = null;
      state.user.status = false;
    },
    toggleDarkMode: (state, action) => {
      console.log(!action.payload);
      // state.darkMode = action.payload;
    },
  },
});

export const { login, logout, toggleDarkMode } = authSlice.actions;
export default authSlice.reducer;
