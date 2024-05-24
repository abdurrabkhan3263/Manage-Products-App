import React from "react";
import { Xcross } from "../../../public/Assets";
import AddContact from "./AddContact";
import { useLocation, useNavigate } from "react-router-dom";

function AddContactLayout({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`absolute w-[32%]  ${className} z-50  h-3/4 rounded-2xl bg-white shadow-2xl right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 overflow-hidden`}
    >
      <div
        className="p-1.5 text-4xl text-lightblue cursor-pointer inline-block"
        onClick={() => {
          navigate(location.state);
        }}
      >
        <Xcross />
      </div>
      <div className="w-full h-[92%]">
        <AddContact />
      </div>
    </div>
  );
}

export default AddContactLayout;
