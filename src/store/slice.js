import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  removeProduct,
  editProduct,
  submitForm,
} from "./thunkFile";
import { toastFunction } from "../utils/toastFunction";
import { databaseService } from "../appwrite";

const initialValue = {
  user: {
    user: null,
    status: false,
  },
  darkMode: false,
  cart: [],
  customerDetailsOfOrder: {},
};

const appSlice = createSlice({
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
      // console.log(!action.payload);
      // state.darkMode = action.payload;
    },
    clearProduct: (state) => {
      state.cart = [];
    },
    addCustomer: (state, action) => {
      state.customerDetailsOfOrder = action.payload;
    },
    clearCustomer: (state) => {
      state.customerDetailsOfOrder = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(removeProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
        toastFunction({
          type: "success",
          message: "Removed Successfully",
        });
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
    builder
      .addCase(editProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = "rejected";
        // state.error = action.payload.message;
      });
  },
});

export const {
  login,
  logout,
  toggleDarkMode,
  clearProduct,
  addCustomer,
  clearCustomer,
  inputRequiredT,
  inputRequiredF,
} = appSlice.actions;
export default appSlice.reducer;
