import React, { useEffect, useState } from "react";
import Container from "../Container/Container";
import { Search } from "../../public/Assets/index";
import { Outlet } from "react-router-dom";
import { DataTable, Pagination } from "../Component";
import BuySellData from "../Component/DataTable/BuySellData";
import { databaseService } from "../appwrite";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Loader, NoDataAvailable } from "../Assets";

function Invoice() {
  const [pageNum, setPageNum] = useState(1);
  const currentUser = useSelector((state) => state.user.user?.$id);
  const { data, isLoading } = useQuery({
    queryKey: ["invoiceData"],
    queryFn: async () => {
      return await databaseService.getInvoice(currentUser);
    },
    refetchOnReconnect: "always",
    enabled: !!currentUser,
  });
  const tableHeading = [
    {
      id: 1,
      name: "Image",
    },
    {
      id: 2,
      name: "Date",
    },
    {
      id: 3,
      name: "Name",
    },
    {
      id: 4,
      name: "Phone Number",
    },
    {
      id: 6,
      name: "Products",
    },
    {
      id: 7,
      name: "Action",
    },
  ];
  const renderRow = BuySellData;
  return (
    <Container className="relative">
      <Outlet />
      <div className="flex h-[5%] items-center justify-between">
        <input
          type="text"
          placeholder={"Search"}
          className="w-full rounded-md bg-[#f1f1f1] px-2 py-2 text-black outline-none focus:bg-[#e4e4e4]"
        />
        <button className="ml-7 flex items-center justify-center gap-4 rounded-md bg-darkblue px-4 py-1 text-xl text-white">
          Search <Search />
        </button>
      </div>
      <div
        className={`relative mt-4 h-[89%] w-full overflow-hidden overflow-y-scroll`}
      >
        <div className="h-full">
          {isLoading ? (
            <Loader />
          ) : Array.isArray(data) && data.length > 0 ? (
            <DataTable
              tableHeading={tableHeading}
              tableData={data.reverse()}
              dataNum={10}
              pageNum={pageNum}
              renderRow={renderRow}
              tableHeadingClass={""}
              tableRowClass={""}
            />
          ) : (
            <NoDataAvailable
              className={"flex h-full w-full items-center justify-center"}
              imageClassName={"h-[70%] w-[70%]"}
            />
          )}
        </div>
      </div>
      {data && data.length >= 15 && (
        <Pagination
          pageNum={pageNum}
          setPage={setPageNum}
          length={data.length}
          dataCount={15}
        />
      )}
    </Container>
  );
}

export default Invoice;
