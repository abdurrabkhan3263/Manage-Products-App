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

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<DashBoard />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/statics" element={<Statics />}></Route>
      <Route path="/allcustomer" element={<AllCustomer />}></Route>
      <Route path="buysell" element={<Buy_Sell />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
