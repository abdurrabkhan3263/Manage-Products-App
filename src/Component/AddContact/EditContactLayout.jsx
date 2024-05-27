import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AddContact from "./AddContact";
import { Xcross } from "../../../public/Assets";

function EditContactLayout({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [customerData, setCustomerData] = useState(null);
  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
    const data = await response.json();
    if (data.carts.length >= 0) {
      setCustomerData(data.carts[0]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
        {customerData && <AddContact contactData={customerData} />}
      </div>
    </div>
  );
}

export default EditContactLayout;
