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
import { SimpleLoader } from "../../Assets";
import { useQuery } from "@tanstack/react-query";

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
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { data: customerData, isLoading } = useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => await databaseService.getInvoiceById(id),
  });
  const totalAmount =
    Array.isArray(customerData) &&
    customerData.reduce((acc, current) => acc + current.productAmount, 0);
  const seeProductData = SeeProduct;
  return (
    <div
      className={`fixed h-full w-full lg:w-[70%] xl:absolute xl:w-[32%] ${className} bottom-1/2 right-1/2 z-50 translate-x-1/2 translate-y-1/2 overflow-hidden bg-white shadow-2xl sm:h-3/4 sm:rounded-2xl`}
    >
      <div
        className="flex h-[10%] w-full cursor-pointer items-center px-3 text-4xl text-lightblue"
        onClick={() => {
          navigate(location.state, { state: { isDelete: false } });
        }}
      >
        <Xcross />
      </div>
      {isLoading ? (
        <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white">
          <SimpleLoader />
        </div>
      ) : (
        <div className="h-[81%] w-full overflow-auto">
          <DataTable
            tableHeading={tableHeadingData}
            tableData={customerData}
            renderRow={seeProductData}
            dataNum={0}
            pageNum={5}
          />
        </div>
      )}
      <div
        className="flex h-80 w-full items-center justify-between bg-blue-500 px-6 text-xl font-semibold text-white"
        style={{ height: `calc(100% - (10% + 81%))` }}
      >
        <p>Total Price</p>
        <p>₹ {totalAmount}</p>
      </div>
    </div>
  );
}

export default SeeProductDetails;
