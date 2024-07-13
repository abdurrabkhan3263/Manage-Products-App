import { useState } from "react";
import Container from "../Container/Container";
import { Search } from "../../public/Assets";
import { useNavigate, Outlet } from "react-router-dom";
import { DataTable, Pagination } from "../Component";
import AllCustomerData from "../Component/DataTable/AllCustomerData";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../appwrite";
import { useSelector } from "react-redux";
import { Loader, NoDataAvailable } from "../Assets";
import _debounce from "lodash/debounce";

function AllCustomer() {
  const navigate = useNavigate();
  const [pageNum, setPage] = useState(0);

  // const [deleteData, setDeleteData] = useState({
  //   isShow: false,
  //   deleteFun: databaseService.deleteCustomer,
  //   mainId: "",
  //   imgId: "",
  // });

  const currentUser = useSelector((state) => state.user?.user);
  let {
    data: { documents } = "",
    data: { total } = "",
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["customer", pageNum],
    queryFn: async () => {
      const response = await databaseService.gettingAllCustomer(
        currentUser?.$id,
        pageNum * 9,
      );
      return response;
    },
    retryOnMount: true,
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
      name: "Total Amount",
    },
    {
      id: 7,
      name: "Action",
    },
  ];

  const handleGettingCustomer = _debounce((e) => {
    const value = e.target.value.toLowerCase();
    if (!value.trim()) {
      console.log(documents);
    } else {
      const newDocuments = documents.filter((items) => {
        const customerName = items.customerName.toLowerCase();
        return customerName.includes(value);
      });
      console.log(newDocuments);
    }
  }, 800);

  const renderRow = AllCustomerData;

  return (
    <Container className={"relative"}>
      <div className="relative flex h-full w-full flex-col sm:block">
        <Outlet />
        <div className="flex h-fit items-center justify-between sm:h-[5%]">
          <input
            type="text"
            placeholder={"Search customer"}
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
          ) : Array.isArray(documents) && documents.length > 0 ? (
            <DataTable
              tableHeading={tableHeading}
              tableData={documents}
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
        {total && total >= 9 && (
          <Pagination
            pageNum={pageNum}
            setPage={setPage}
            length={total2 || total}
            dataCount={9}
            className={"h-fit"}
          />
        )}
      </div>
    </Container>
  );
}

export default AllCustomer;
