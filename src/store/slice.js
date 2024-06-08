import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  user: {
    user: null,
    status: false,
  },
  darkMode: false,
  cart: [],
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
    addProduct: (state, action) => {
      let isHave = state.cart.some(
        (cartItem) => cartItem.id === action.payload.id,
      );
      state.cart.push(action.payload);
      if (isHave) {
        const proData = state.cart
          .filter((value) => value.id === action.payload.id)
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
          ...state.cart.filter((value) => value.id !== action.payload.id),
          proData,
        ];
        state.cart = allData;
      }
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter((value) => value.id != action.payload.id);
    },
    editProduct: (state, action) => {
      state.cart = state.map((value) =>
        action.id === value.id ? { ...value, ...action.payload } : value,
      );
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
} = authSlice.actions;
export default authSlice.reducer;
