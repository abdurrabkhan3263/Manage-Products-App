import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  DashBoard,
  Products,
  AllCustomer,
  Invoice,
  Navigation,
  Cart,
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
  LoginForm,
  SignForm,
  FormLayout,
  ForgetPass,
} from "./Component/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, Bounce } from "react-toastify";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<DashBoard />}>
          <Route path="addproduct" element={<AddProductLayout />} />
        </Route>
        <Route path="/products" element={<Products />}>
          <Route path="editproduct/:id" element={<EditProductLayout />} />
          <Route path="addproduct" element={<AddProductLayout />} />
        </Route>
        <Route path="/allcustomer" element={<AllCustomer />}>
          <Route path="addcontact" element={<AddContactLayout />} />
          <Route path="editcontact/:id" element={<EditContactLayout />} />
          <Route path="customerdetails/:id" element={<CustomerSeeDetails />} />
        </Route>
        <Route path="invoice" element={<Invoice />}>
          <Route path="seeproductdetails/:id" element={<SeeProductDetails />} />
        </Route>
        <Route path="/cart" element={<Cart />}>
          <Route path="addcontact" element={<AddContactLayout />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={
          <FormLayout>
            <LoginForm />
          </FormLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <FormLayout>
            <SignForm />
          </FormLayout>
        }
      />
      <Route
        path="/forget"
        element={
          <FormLayout>
            <ForgetPass />
          </FormLayout>
        }
      />
      ,
    </Route>,
  ),
);

const useClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <QueryClientProvider client={useClient}>
        <RouterProvider router={route} />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
      </QueryClientProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={false}
      />
    </React.StrictMode>
  </Provider>,
);
