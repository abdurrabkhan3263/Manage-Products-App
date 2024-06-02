import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import { Search } from "../../public/Assets/index";
import { Outlet, useNavigate } from "react-router-dom";
import { DataTable, Pagination, DataDelete } from "../Component";
import BuySellData from "../Component/DataTable/BuySellData";

function Buy_Sell() {
  const [buySell, setBuySell] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();
  const fetchData = async () => {
    let response = await fetch("http://dummyjson.com/users?limit=300");
    let data = await response.json();
    setBuySell(data.users);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const tableHeading = [
    {
      id: 1,
      name: "Image",
    },
    {
      id: 2,
      name: "Name",
    },
    {
      id: 2,
      name: "Phone Number",
    },
    {
      id: 3,
      name: "Total Price",
    },
    {
      id: 4,
      name: "Products",
    },
    {
      id: 5,
      name: "Action",
    },
  ];
  const renderRow = BuySellData;
  return (
    <Container className="relative">
      <Outlet />
      <div className="flex items-center justify-between h-[5%]">
        <input
          type="text"
          placeholder={"Search"}
          className="outline-none bg-[#f1f1f1] focus:bg-[#e4e4e4] px-2 py-2 rounded-md w-full text-black"
        />
        <button className="flex justify-center items-center gap-4 text-xl ml-7 bg-darkblue rounded-md px-4 py-1 text-white">
          Search <Search />
        </button>
      </div>
      <div className="h-[89%] overflow-hidden overflow-y-scroll w-full mt-4 relative">
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

export default Buy_Sell;
