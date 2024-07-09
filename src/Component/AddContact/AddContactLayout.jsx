import React from "react";
import { Xcross } from "../../../public/Assets";
import AddContact from "./AddContact";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddContactLayout({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={`fixed h-full w-full lg:w-[70%] xl:absolute xl:w-[32%] ${className} bottom-1/2 right-1/2 z-[60] translate-x-1/2 translate-y-1/2 overflow-hidden bg-white shadow-2xl sm:h-3/4 sm:rounded-2xl`}
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
