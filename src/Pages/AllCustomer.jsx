import { useState, useEffect } from "react";
import Container from "../Container/Container";
import { Search, Edit, Phone, Delete } from "../../public/Assets";
import { useNavigate, Outlet } from "react-router-dom";
import { DataDelete, DataTable, Pagination } from "../Component";
import AllCustomerData from "../Component/DataTable/AllCustomerData";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "../appwrite";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { Loader, NoDataAvailable } from "../Assets";

function AllCustomer() {
  const navigate = useNavigate();
  const [pageNum, setPage] = useState(1);
  const [deleteData, setDeleteData] = useState({
    isShow: false,
    deleteFun: databaseService.deleteCustomer,
    mainId: "",
    imgId: "",
  });
  const currentUser = useSelector((state) => state.user?.user);
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      return await databaseService.gettingAllCustomer([
        Query.equal("belongsTo", currentUser.$id),
      ]);
    },
    retryOnMount: true,
    staleTime: 4000,
  });
  const handleAddContact = () => {
    navigate("addcontact", { state: "/allcustomer" });
  };
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
      id: 3,
      name: "Phone Number",
    },
    {
      id: 4,
      name: "Address",
    },
    {
      id: 5,
      name: "History",
    },
    {
      id: 6,
      name: "Action",
    },
  ];
  const renderRow = AllCustomerData;
  return (
    <Container>
      <div className="relative h-full w-full">
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
        <div className="flex w-full justify-end">
          <button
            className="mt-4 rounded-lg bg-darkblue px-4 py-2 text-base font-semibold text-white"
            onClick={handleAddContact}
          >
            Add New Customer
          </button>
        </div>
        <div className="relative mt-4 h-[83%] w-full overflow-hidden overflow-y-scroll">
          <div className="h-full bg-white">
            {isLoading ? (
              <Loader />
            ) : data && data?.documents && data?.documents.length > 0 ? (
              <DataTable
                tableHeading={tableHeading}
                tableData={data.documents}
                pageNum={pageNum}
                dataNum={10}
                renderRow={renderRow}
              />
            ) : (
              <NoDataAvailable
                className={"flex h-full w-full items-center justify-center"}
                imageClassName={"h-[70%] w-[70%]"}
              />
            )}
          </div>
        </div>
      </div>
      {data && data.documents && data.documents.length > 10 && (
        <Pagination
          pageNum={pageNum}
          setPage={setPage}
          length={data && data.documents && data.documents.length}
          dataCount={10}
        />
      )}
    </Container>
  );
}

export default AllCustomer;
