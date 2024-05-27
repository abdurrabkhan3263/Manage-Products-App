import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  user: {
    user: null,
    status: false,
  },
  darkMode: false,
  deleteData: {
    id: null,
    showDelete: false,
    deleteStatus: false,
  },
};

const authSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    login: (state, action) => {
      state.user.user = action;
      initialValue.user.status = true;
    },
    logout: (state) => {
      state.user.user = null;
      state.user.status = false;
    },
    toggleDarkMode: (state, action) => {
      console.log(!action.payload);
      // state.darkMode = action.payload;
    },
    showDeleteSection: (state, action) => {
      state.deleteData.id = action.payload.id;
      state.deleteData.showDelete = action.payload.showDelete;
    },
    resetDeleteData: (state) => {
      state.deleteData.id = null;
      state.deleteData.showDelete = false;
      state.deleteData.deleteStatus = false;
    },
    deleteData: (state, action) => {
      state.deleteData.deleteStatus = action.payload;
    },
  },
});

export const {
  login,
  logout,
  toggleDarkMode,
  resetDeleteData,
  showDeleteSection,
  deleteData,
} = authSlice.actions;
export default authSlice.reducer;
