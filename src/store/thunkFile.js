import { createAsyncThunk } from "@reduxjs/toolkit";
import { databaseService } from "../appwrite";

const addProduct = createAsyncThunk(
  "cart/addProduct",
  async (product, { getState, rejectWithValue }) => {
    try {
      const state = getState(); // Here We Can Get The All The Initial Value $OR Initial Value Field
      /*
      IN THE STATE WE HAVE -->
    "user" : { USER DETAILS }
    "darkMode": false,
    "cart": [],
    "status": "loading"
      */
      console.log(product);
      if (product.fromDataBase)
        return { actionType: "database", allData: product.fromDataBase };
      const cartData = state.cart?.allData || [];
      const isHave = cartData.some((items) => items.$id === product.$id);
      if (isHave) {
        const proData = cartData
          .filter((value) => value.$id === product.$id)
          .reduce(
            (acc) => {
              acc.productAmount +=
                parseFloat(product.productPrice) *
                parseInt(product.productQuantity);
              acc.productQuantity += parseInt(product.productQuantity);
              return acc;
            },
            {
              ...cartData.find((value) => value.$id === product.$id),
            },
          );
        const allData = [
          proData,
          ...cartData.filter((value) => value.$id !== product.$id),
        ];
        // API CALL FOR UPDATING THE ORDER
        try {
          const response = await databaseService.updateOrder(
            product.$id,
            proData,
          );
        } catch (error) {
          console.log(
            "something went wrong while updating the order :: ",
            error,
          );
        }
        return { allData, actionType: "updated" };
      } else {
        const response = await databaseService.createOrder(
          product.$id,
          product,
        );

        const allData = [product, ...(cartData ?? "")];
        return { allData, actionType: "added" };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const removeProduct = createAsyncThunk(
  "user/removeProduct",
  async (proDetails, { getState, rejectWithValue }) => {
    try {
      const cartData = getState().cart?.allData || [];
      // REMOVE ORDER FROM THE DATABASE
      try {
        await databaseService.removeOrder(proDetails.$id);
      } catch (error) {
        console.error("Error While Removing The Order :: ", error.message);
      }
      return {
        allData: cartData.filter((items) => items.$id !== proDetails.$id),
        actionType: "Removing",
      };
    } catch (error) {
      return rejectWithValue(
        "productDetail Something Went Wrong While Removing The Product ",
        error.message,
      );
    }
  },
);

const editProduct = createAsyncThunk(
  "user/editProduct",
  async (proDetails, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cartData = state.cart?.allData || [];
      const index = cartData.findIndex((items) => items.$id === proDetails.$id);
      if (index !== -1) {
        // WHEN YOU TRY TO MUTATE THE ARRAY IN THE REDUX STATE YOU HAVE TO CREATE DUPLICATE OF NEW ARRAY OF PREVIOUS ARRAY
        const newArr = [...cartData];
        newArr[index] = { ...newArr[index], ...proDetails };
        // DATABASE CALLING
        try {
          await databaseService.updateOrder(newArr[index].$id, newArr[index]);
        } catch (error) {
          console.error(
            "something went wrong while editing the product ",
            error.message,
          );
        }
        return { allData: newArr, actionType: "Edit" };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export { addProduct, removeProduct, editProduct };
