import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  user: {
    user: null,
    status: false,
  },
  darkMode: false,
  cart: [],
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
      console.log(!action.payload);
      // state.darkMode = action.payload;
    },
    addProduct: (state, action) => {
      let isHave = state.cart.some(
        (cartItem) => cartItem.$id === action.payload.$id,
      );
      state.cart.unshift(action.payload);
      if (isHave) {
        const proData = state.cart
          .filter((value) => value.$id === action.payload.$id)
          .reduce(
            (acc, current) => {
              acc.productAmount += current.productAmount;
              acc.productQuantity += parseInt(current.productQuantity);
              return acc;
            },
            {
              ...state.cart.find((value) => value.id === action.payload.id),
              productAmount: 0,
              productQuantity: 0,
            },
          );
        const allData = [
          proData,
          ...state.cart.filter((value) => value.$id !== action.payload.$id),
        ];
        state.cart = allData;
      }
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((value) => value.$id !== action.payload);
    },
    editProduct: (state, action) => {
      const index = state.cart.findIndex(
        (data) => data.$id === action.payload.$id,
      );
      if (index !== -1) {
        state.cart[index] = { ...state.cart[index], ...action.payload };
      }
    },
    clearProduct: (state) => {
      state.cart = [];
    },
  },
});

export const {
  login,
  logout,
  toggleDarkMode,
  addProduct,
  removeProduct,
  editProduct,
  clearProduct,
} = appSlice.actions;
export default appSlice.reducer;
