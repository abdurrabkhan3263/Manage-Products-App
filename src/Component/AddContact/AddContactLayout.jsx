import React from "react";
import { Xcross } from "../../../public/Assets";
import AddContact from "./AddContact";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddContactLayout({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`absolute w-[32%] ${className} bottom-1/2 right-1/2 z-[60] h-3/4 translate-x-1/2 translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl`}
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
        <AddContact />
      </div>
    </div>
  );
}

export default AddContactLayout;
