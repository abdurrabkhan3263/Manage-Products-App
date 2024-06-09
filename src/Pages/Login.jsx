import React from "react";
import { FormLayout } from "../Component";
import { Outlet } from "react-router-dom";

function Login() {
  return (
    <div className="absolute flex justify-center items-center w-screen h-screen bg-blue-500">
      <Outlet />
    </div>
  );
}

export default Login;
