import React from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../Component/SideNav";
import { Bounce, ToastContainer } from "react-toastify";
import { SideNavLogo } from "../Component/SideNav";

function Navigation() {
  return (
    <div className="relative w-full">
      <div className="flex h-48 w-full flex-col overflow-hidden bg-blue-400 sm:hidden">
        <div className="flex h-[75%] items-center justify-start">
          <SideNavLogo
            className={"w-32"}
            textClass={"text-[30px] text-nowrap left-[80%]"}
          />
        </div>
        <div className="flex h-[25%] w-full items-center justify-end bg-gray-400 pr-4 text-2xl">
          <p>X</p>
        </div>
      </div>
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
