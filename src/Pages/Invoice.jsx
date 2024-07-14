import React, { useEffect, useState, useMemo } from "react";
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

const PAGE_SIZE = 9;

function Invoice() {
  const [pageNum, setPageNum] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const currentUser = useSelector((state) => state.user.user?.$id);

  const { data, isLoading } = useQuery({
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

  const documents = data?.data || [];
  const total = data?.total || 0;

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

  const filteredData = useMemo(() => {
    if (!searchVal.trim()) return documents;
    return documents.filter((item) =>
      item.customerName.toLowerCase().includes(searchVal.toLowerCase()),
    );
  }, [searchVal, documents]);

  const handleGettingCustomerInvoice = _debounce((e) => {
    setSearchVal(e.target.value);
  }, 300);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const renderRow = BuySellData;

  return (
    <Container className="relative flex flex-col sm:block">
      <Outlet />
      <div className="flex h-fit items-center justify-between sm:h-[5%]">
        <input
          type="text"
          placeholder={"Search invoice"}
          className="w-full rounded-md bg-[#f1f1f1] px-2 py-2 text-black outline-none focus:bg-[#e4e4e4]"
          onChange={handleGettingCustomerInvoice}
        />
      </div>
      <div className={`relative mt-4 w-full flex-1 overflow-hidden sm:h-[89%]`}>
        <div className="h-full">
          {isLoading ? (
            <Loader />
          ) : filteredData.length > 0 ? (
            <DataTable
              tableHeading={tableHeading}
              tableData={filteredData}
              dataNum={PAGE_SIZE}
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
      {totalPages > 1 && (
        <Pagination
          pageNum={pageNum}
          setPage={setPageNum}
          length={total}
          dataCount={PAGE_SIZE}
          className={"h-fit sm:h-auto"}
        />
      )}
    </Container>
  );
}

export default Invoice;
