import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Xcross } from "../../../../public/Assets";
import { DataTable } from "../../index";
import { useDispatch } from "react-redux";
import CustomerRowData from "./CustomerRowData";

function CustomerSeeDetails({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [customerData, setCustomerData] = useState(null);
  const dispatch = useDispatch();
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
  const tableHeadingData = [
    {
      id: 1,
      name: "Sr No",
    },
    {
      id: 2,
      name: "Date",
    },
    {
      id: 3,
      name: "Product List",
    },
    {
      id: 4,
      name: "Action",
    },
  ];
  const renderData = CustomerRowData;
  return (
    <div
      className={`absolute w-[32%]  ${className} z-50  h-3/4 rounded-2xl border-2 border-[#0000001f] bg-white shadow-2xl right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 overflow-hidden`}
    >
      <div
        className="p-1.5 text-4xl text-lightblue cursor-pointer inline-block"
        onClick={() => {
          navigate(location.state);
        }}
      >
        <Xcross />
      </div>
      <div className="w-full h-[85%] overflow-y-scroll">
        <DataTable
          tableHeading={tableHeadingData}
          tableData={customerData}
          dataNum={0}
          pageNum={5}
          renderRow={renderData}
        />
      </div>
    </div>
  );
}

export default CustomerSeeDetails;
