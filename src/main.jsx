import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  DashBoard,
  Products,
  Statics,
  AllCustomer,
  Buy_Sell,
} from "./Pages/index.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  AddContactLayout,
  AddProductLayout,
  EditProductLayout,
  EditContactLayout,
  CustomerSeeDetails,
  SeeProductDetails,
} from "./Component/index.js";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<DashBoard />}>
        <Route path="addproduct" element={<AddProductLayout />} />
      </Route>
      <Route path="/products" element={<Products />}>
        <Route path="editproduct/:id" element={<EditProductLayout />} />
        <Route path="addproduct" element={<AddProductLayout />} />
      </Route>
      <Route path="/statics" element={<Statics />}></Route>
      <Route path="/allcustomer" element={<AllCustomer />}>
        <Route path="addcontact" element={<AddContactLayout />} />
        <Route path="editcontact/:id" element={<EditContactLayout />} />
        <Route path="customerdetails/:id" element={<CustomerSeeDetails />} />
      </Route>
      <Route path="buysell" element={<Buy_Sell />}>
        <Route path="seeproductdetails/:id" element={<SeeProductDetails />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={route} />
    </React.StrictMode>
  </Provider>
);
