import React, { useMemo, useState, useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import _debounce from "lodash/debounce";

import Container from "../Container/Container";
import { DataTable, Pagination } from "../Component";
import AllCustomerData from "../Component/DataTable/AllCustomerData";
import { databaseService } from "../appwrite";
import { Loader, NoDataAvailable } from "../Assets";

const PAGE_SIZE = 9;

const tableHeading = [
  { id: 1, name: "Image" },
  { id: 2, name: "Name" },
  { id: 3, name: "Phone Number" },
  { id: 4, name: "Address" },
  { id: 5, name: "History" },
  { id: 6, name: "Total Amount" },
  { id: 7, name: "Action" },
];

function AllCustomer() {
  const navigate = useNavigate();
  const [pageNum, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState("");

  const currentUser = useSelector((state) => state.user?.user);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customer", pageNum, currentUser?.$id],
    queryFn: () =>
      databaseService.gettingAllCustomer(currentUser?.$id, pageNum * PAGE_SIZE),
    enabled: !!currentUser?.$id,
  });

  const documents = data?.documents || [];
  const total = data?.total || 0;

  const filteredData = useMemo(() => {
    if (!searchVal.trim()) return documents;
    return documents.filter((item) =>
      item.customerName.toLowerCase().includes(searchVal.toLowerCase()),
    );
  }, [searchVal, documents]);

  const handleAddContact = useCallback(() => {
    navigate("addcontact", { state: "/allcustomer" });
  }, [navigate]);

  const handleGettingCustomer = useMemo(
    () =>
      _debounce((e) => {
        setSearchVal(e.target.value);
        setPage(0);
      }, 300),
    [],
  );

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (isError) {
    return <div>Error loading customers</div>;
  }

  return (
    <Container className="relative">
      <div className="relative flex h-full w-full flex-col sm:block">
        <Outlet />
        <div className="flex h-fit items-center justify-between sm:h-[5%]">
          <input
            type="text"
            placeholder="Search customer"
            className="w-full rounded-md bg-[#f1f1f1] px-2 py-2 text-black outline-none focus:bg-[#e4e4e4]"
            onChange={handleGettingCustomer}
          />
        </div>
        <div className="flex h-fit w-full justify-end">
          <button
            className="mt-4 rounded-lg bg-darkblue px-4 py-2 text-base font-semibold text-white"
            onClick={handleAddContact}
          >
            Add New Customer
          </button>
        </div>
        <div className="relative mt-4 w-full flex-1 overflow-hidden sm:h-[83%]">
          {isLoading ? (
            <Loader />
          ) : filteredData.length > 0 ? (
            <DataTable
              tableHeading={tableHeading}
              tableData={filteredData}
              dataNum={PAGE_SIZE}
              pageNum={pageNum}
              renderRow={AllCustomerData}
              tableHeadingClass=""
              tableRowClass=""
            />
          ) : (
            <NoDataAvailable
              className="flex h-full w-full items-center justify-center"
              imageClassName="h-[70%] w-[70%]"
            />
          )}
        </div>
        {totalPages > 1 && (
          <Pagination
            pageNum={pageNum}
            setPage={setPage}
            length={total}
            dataCount={PAGE_SIZE}
            className="h-fit"
          />
        )}
      </div>
    </Container>
  );
}

export default AllCustomer;
