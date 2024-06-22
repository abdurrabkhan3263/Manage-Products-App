import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import { Search } from "../../public/Assets/index";
import { Outlet, useNavigate } from "react-router-dom";
import { DataTable, Pagination, DataDelete } from "../Component";
import BuySellData from "../Component/DataTable/BuySellData";
import { databaseService } from "../appwrite";
import { useSelector } from "react-redux";

function Invoice() {
  const [buySell, setBuySell] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const currentUser = useSelector((state) => state.user.user?.$id);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      let response = await databaseService.getInvoice(currentUser);
      setBuySell(response.reverse());
    } catch (error) {
      throw new Error(error.message);
    }
  };
  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);
  const tableHeading = [
    {
      id: 1,
      name: "Date",
    },
    {
      id: 2,
      name: "Image",
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
      id: 5,
      name: "Total Price",
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
      <div className="relative mt-4 h-[89%] w-full overflow-hidden overflow-y-scroll">
        <div className="bg-white">
          {buySell && buySell.length > 0 && (
            <DataTable
              tableHeading={tableHeading}
              tableData={buySell}
              dataNum={10}
              pageNum={pageNum}
              renderRow={renderRow}
            />
          )}
        </div>
      </div>
      {buySell && buySell.length >= 15 && (
        <Pagination
          pageNum={pageNum}
          setPage={setPageNum}
          length={buySell.length}
          dataCount={15}
        />
      )}
    </Container>
  );
}

export default Invoice;
