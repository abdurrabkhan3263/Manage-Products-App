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
import _debounce from "lodash/debounce";

function Invoice() {
  const [pageNum, setPageNum] = useState(0);
  const currentUser = useSelector((state) => state.user.user?.$id);
  const {
    data: { data } = [],
    data: { total } = "",
    isLoading,
  } = useQuery({
    queryKey: ["invoiceData", pageNum],
    queryFn: async () => {
      const response = await databaseService.getInvoice(
        currentUser,
        pageNum * 10,
      );
      return response;
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

  const handleGettingCustomerInvoice = _debounce((e) => {
    console.log(e.target.value);
  }, 1200);

  const renderRow = BuySellData;

  return (
    <Container className="relative flex flex-col sm:block">
      <Outlet />
      <div className="flex h-fit items-center justify-between sm:h-[5%]">
        <input
          type="text"
          placeholder={"Search"}
          className="w-full rounded-md bg-[#f1f1f1] px-2 py-2 text-black outline-none focus:bg-[#e4e4e4]"
          onChange={handleGettingCustomerInvoice}
        />
        <button className="ml-7 flex items-center justify-center gap-4 rounded-md bg-darkblue px-4 py-1 text-xl text-white">
          Search <Search />
        </button>
      </div>
      <div className={`relative mt-4 w-full flex-1 overflow-hidden sm:h-[89%]`}>
        <div className="h-full">
          {isLoading ? (
            <Loader />
          ) : Array.isArray(data) && data.length > 0 ? (
            <DataTable
              tableHeading={tableHeading}
              tableData={data}
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
      {data && (total >= 10 || pageNum > 0) && (
        <Pagination
          pageNum={pageNum}
          setPage={setPageNum}
          length={total}
          dataCount={10}
          className={"h-fit sm:h-auto"}
        />
      )}
    </Container>
  );
}

export default Invoice;
