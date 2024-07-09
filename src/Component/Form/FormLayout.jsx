import React from "react";
import { butterfly__img, login__img } from "../../../public/Assets";

function FormLayout({ children }) {
  const textStyle = {
    background: "linear-gradient(to right, #48C9B0, #64B5F6)",
    color: "transparent",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "30px",
    fontWeight: "bold",
  };

  return (
    <div className="grid h-screen w-screen grid-cols-1 sm:grid-cols-2 xl:px-52">
      <div className="hidden sm:block">
        <img
          src={login__img}
          alt="loginImage"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="grid grid-rows-9 bg-white pt-5 sm:grid-cols-12">
        <div className="col-start-4 col-end-10 row-start-1 row-end-3 flex flex-col items-center justify-center gap-y-2">
          <img src={butterfly__img} alt="butterfly__img" className="w-[50%]" />
          <p className="text-4xl font-semibold" style={textStyle}>
            Welcome Back
          </p>
        </div>
        <div className="col-start-3 col-end-11 row-start-3 row-end-8 w-full px-1 pt-5 xl:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormLayout;
