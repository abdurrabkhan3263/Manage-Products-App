import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../Component/SideNav";
import { Bounce, ToastContainer } from "react-toastify";

function Navigation() {
  return (
    <div className="w-full">
      <Nav />
      <Outlet />
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
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default Navigation;
