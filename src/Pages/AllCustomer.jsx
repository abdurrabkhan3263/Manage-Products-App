import { useState, useEffect } from "react";
import Container from "../Container/Container";
import { Search, Edit, Phone, Delete } from "../../public/Assets";
import { useNavigate, Outlet } from "react-router-dom";
import { DataDelete, DataTable, Pagination } from "../Component";
import { useSelector } from "react-redux";
import { showDeleteSection, resetDeleteData } from "../store/slice";
import { useDispatch } from "react-redux";

function AllCustomer() {
  const navigate = useNavigate();
  const [pageNum, setPage] = useState(1);
  const [customersData, setCustomerData] = useState([]);
  const showDelete = useSelector((state) => state.deleteData);
  const dispatch = useDispatch();
  const fetchData = async () => {
    const response = await fetch(`https://dummyjson.com/carts?limit=21`);
    const data = await response.json();
    if (data.carts.length > 0) {
      setCustomerData(data.carts);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (showDelete.deleteStatus) {
      console.log("Delete Karna Hai:- ", showDelete.id);
      dispatch(resetDeleteData());
    }
  }, [showDelete]);
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
  const tableAction = [
    {
      path: "allcustomer",
      elem: function (number) {
        return (
          <a href={`tel:${number}`}>
            <Phone />
          </a>
        );
      },
    },
    {
      path: "allcustomer",
      elem: function (id) {
        return (
          <span
            className="cursor-pointer"
            onClick={() => {
              navigate(`editcontact/${id}`, {
                state: "/allcustomer",
              });
            }}
          >
            <Edit />
          </span>
        );
      },
    },
    {
      path: "allcustomer",
      elem: function (id) {
        return (
          <span
            className="cursor-pointer text-xl"
            onClick={() => {
              dispatch(showDeleteSection({ id: id, showDelete: true }));
            }}
          >
            <Delete />
          </span>
        );
      },
    },
    {
      path: "allcustomer",
      elem: function (id) {
        return (
          <span
            onClick={() =>
              navigate(`customerdetails/${id}`, {
                state: "/allcustomer",
              })
            }
          >
            See Details
          </span>
        );
      },
    },
  ];
  return (
    <Container>
      <div className="w-full h-full relative">
        {showDelete.showDelete && <DataDelete />}
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
        <div className="w-full flex justify-end">
          <button
            className="bg-darkblue text-white px-4 py-2 mt-4 font-semibold rounded-lg text-base"
            onClick={handleAddContact}
          >
            Add New Customer
          </button>
        </div>
        <div className="h-[83%] overflow-hidden overflow-y-scroll w-full mt-4 relative">
          <div className="bg-white">
            {customersData && (
              <DataTable
                tableHeading={tableHeading}
                tableData={customersData}
                pageNum={pageNum}
                dataNum={10}
                actionData={tableAction}
              />
            )}
          </div>
        </div>
      </div>
      {customersData && customersData.length >= 10 && (
        <Pagination
          pageNum={pageNum}
          setPage={setPage}
          length={customersData && customersData.length}
          dataCount={10}
        />
      )}
    </Container>
  );
}

export default AllCustomer;
