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
import { databaseService } from "../../appwrite";
import { useSelector } from "react-redux";

const tableHeadingData = [
  {
    id: 1,
    name: "Product Name",
  },
  {
    id: 2,
    name: "Product Price",
  },
  {
    id: 3,
    name: "Quantity",
  },
  {
    id: 4,
    name: "TotalPrice",
  },
];
function SeeProductDetails({ className }) {
  const [customerData, setCustomerData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const fetchData = async (id) => {
    const response = await databaseService.getInvoiceById(id);
    setCustomerData(response);
  };
  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);
  const seeProductData = SeeProduct;
  return (
    <div
      className={`absolute w-[32%] ${className} bottom-1/2 right-1/2 z-50 h-3/4 translate-x-1/2 translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl`}
    >
      <div
        className="inline-block cursor-pointer p-1.5 text-4xl text-lightblue"
        onClick={() => {
          navigate(location.state, { state: { isDelete: false } });
        }}
      >
        <Xcross />
      </div>
      <div className="mt-4 h-[85%] w-full">
        <DataTable
          tableHeading={tableHeadingData}
          tableData={customerData}
          renderRow={seeProductData}
          dataNum={0}
          pageNum={5}
        />
      </div>
    </div>
  );
}

export default SeeProductDetails;
