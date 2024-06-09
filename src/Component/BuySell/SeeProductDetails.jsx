import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  useNavigation,
} from "react-router-dom";
import { Xcross } from "../../../public/Assets";
import { DataTable } from "../index";
import SeeProduct from "./SeeProduct";

const tableHeadingData = [
  {
    id: 1,
    name: "Image",
  },
  {
    id: 2,
    name: "Product Name",
  },
  {
    id: 3,
    name: "Quantity",
  },
  {
    id: 4,
    name: "TotalPrice",
  },
  {
    id: 5,
    name: "Action",
  },
];
function SeeProductDetails({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();
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
  const seeProductData = SeeProduct;
  return (
    <div
      className={`absolute w-[32%]  ${className} z-50  h-3/4 rounded-2xl bg-white shadow-2xl right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 overflow-hidden`}
    >
      <div
        className="p-1.5 text-4xl text-lightblue cursor-pointer inline-block"
        onClick={() => {
          navigate(location.state, { state: { isDelete: false } });
        }}
      >
        <Xcross />
      </div>
      <div className="w-full h-[85%] overflow-y-scroll">
        <DataTable
          tableHeading={tableHeadingData}
          tableData={customerData}
          renderRow={seeProductData}
          dataNum={0}
          pageNum={customerData && customerData.length}
        />
      </div>
    </div>
  );
}

export default SeeProductDetails;
