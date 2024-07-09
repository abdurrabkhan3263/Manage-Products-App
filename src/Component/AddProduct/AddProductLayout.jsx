import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AddProduct from "./AddProduct";
import { Xcross } from "../../../public/Assets";

function AddProductLayout({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`fixed h-full w-full lg:w-[70%] xl:absolute xl:w-[32%] ${className} bottom-1/2 right-1/2 z-50 translate-x-1/2 translate-y-1/2 overflow-hidden bg-white shadow-2xl sm:h-3/4 sm:rounded-2xl`}
    >
      <div
        className="inline-block cursor-pointer p-1.5 text-4xl text-lightblue"
        onClick={() => {
          navigate(location.state);
        }}
      >
        <Xcross />
      </div>
      <div className="h-[92%] w-full">
        <AddProduct />
      </div>
    </div>
  );
}

export default AddProductLayout;
