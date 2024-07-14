import { createAsyncThunk } from "@reduxjs/toolkit";
import { databaseService } from "../appwrite";
import { toastFunction } from "../utils/toastFunction";
import convertToIST from "../Hook/userCovertDate";
import { clearProduct } from "./slice";

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
          throw new Error(error);
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

const submitForm = createAsyncThunk(
  "/user/submitForm",
  async (_, { getState, rejectWithValue, dispatch }) => {
    const state = getState();
    const {
      cart: { allData: cartData },
      user: { user },
      customerDetailsOfOrder: customerDetails,
    } = state;
    if ((cartData && cartData.length <= 0) || state.cart.length <= 0) {
      toastFunction({
        type: "warn",
        message: "Please Add Product In The Cart",
      });
      return;
    } else if (Object.keys(customerDetails).length <= 0) {
      toastFunction({
        type: "warn",
        message: "Please Enter Customer Name",
      });
      return;
    }

    const filterCartData = cartData.map((items) => {
      return {
        isOption: items.isOption,
        productAmount: items.productAmount,
        productQuantity: items.productQuantity,
        $id: items.$id,
        productPriceOption: items.productPriceOption,
        productName: items.productName,
      };
    });

    const totalAmount = filterCartData.reduce(
      (acc, current) => acc + current.productAmount,
      0,
    );

    const dataToSend = {
      productList: JSON.stringify(filterCartData),
      customerDetails: customerDetails?.$id,
      userId: user?.$id,
      totalAmount,
    };

    try {
      const addDataIntoData = await databaseService.createSell(dataToSend);
      if (addDataIntoData) {
        const ids = cartData.map((items) => items.$id);
        await Promise.all(ids.map((id) => databaseService.removeOrder(id))); // ! Remove The Cart Data from Db
        const customerData = await databaseService.gettingCustomerById(
          customerDetails?.$id,
        );
        if (customerData) {
          dispatch(clearProduct()); // ! Clear Cart Data from Redux
          const data = customerData;
          data.totalPrice += totalAmount;
          data.customerHistory.push(addDataIntoData?.$id);
          const updateCustomer = await databaseService.updateCustomer(
            data?.$id,
            {
              ...data,
            },
          );
          toastFunction({
            type: "success",
            message: "Invoice created successfully",
            theme: "colored",
            closeTime: 1500,
          });
        }
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export { addProduct, removeProduct, editProduct, submitForm };
