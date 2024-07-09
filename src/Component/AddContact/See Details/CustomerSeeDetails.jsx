import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { LeftArrow, LongLeftArrow, Xcross } from "../../../../public/Assets";
import { DataTable } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import CustomerRowData from "./CustomerRowData";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../../../appwrite";
import { useRef } from "react";
import { NoDataAvailable, SimpleLoader } from "../../../Assets";

function CustomerSeeDetails({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customerDetails", id],
    queryFn: async () => {
      return await databaseService.getCustomerBuyHistory(id);
    },
    enabled: !!id,
    gcTime: 1000,
  });
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
      className={`fixed h-full w-full lg:w-[70%] xl:absolute xl:w-[32%] ${className} bottom-1/2 right-1/2 z-50 translate-x-1/2 translate-y-1/2 overflow-hidden border-2 border-[#0000001f] bg-white shadow-2xl sm:h-3/4 sm:rounded-2xl`}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="inline-block cursor-pointer p-1.5 text-4xl text-lightblue"
          onClick={() => {
            navigate(location.state);
          }}
        >
          <Xcross />
        </div>
        {isLoading ? (
          <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white">
            <SimpleLoader />
          </div>
        ) : Array.isArray(data) && data.length > 0 ? (
          <div className={`h-[85%] w-full overflow-auto`}>
            <DataTable
              tableHeading={tableHeadingData}
              tableData={data.reverse()}
              dataNum={0}
              pageNum={5}
              renderRow={renderData}
            />
          </div>
        ) : (
          <NoDataAvailable
            className={"flex h-full w-full items-center justify-center"}
            imageClassName={"h-[70%] w-[70%] mb-[100px]"}
          />
        )}
      </div>
    </div>
  );
}

export default CustomerSeeDetails;
