import React, { useState } from "react";
import { Button } from "../../UI";
import { Search, Xcross } from "../../../../public/Assets";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../../../appwrite";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCustomer, clearCustomer } from "../../../store/slice";
import _debounce from "lodash/debounce";

function SearchSection() {
  const customerName =
    useSelector((state) => state?.customerDetailsOfOrder) || {};
  const [customer, setCustomer] = useState([]);
  const [inputValue, setInputValue] = useState(
    customerName?.customerName || "",
  );
  const userId = useSelector((state) => state.user?.user?.$id);
  const userDetails = useSelector((state) => state.customerDetailsOfOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCustomer = React.useCallback(
    _debounce((value) => {
      console.log("hello");
      if (value.trim().length <= 0) {
        return setCustomer([]);
      }
      if (userId && value.trim().length > 0) {
        databaseService.getCustomerBySearch(userId, value).then((response) => {
          setCustomer(response.documents);
        });
      }
    }, 800),
    [userId],
  );

  const changeInput = (value) => {
    setInputValue(value);
    getCustomer(value);
  };

  React.useEffect(() => {
    if (inputValue.trim().length <= 0) {
      setCustomer([]);
    }
    if (userId && inputValue.trim().length > 0) {
      if (
        Object.keys(userDetails).length > 0 &&
        inputValue !== userDetails.customerName
      ) {
        dispatch(clearCustomer());
      }
    }
  }, [inputValue, userId, userDetails, dispatch]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-y-4 px-2 py-0.5">
      <div className="flex w-full justify-end">
        <Button
          className={
            "bg-lightblue px-4 py-1.5 text-white transition-colors hover:bg-darkblue"
          }
          onClick={() => navigate("addcontact", { state: "/cart" })}
        >
          Add New Customer
        </Button>
      </div>
      <div
        className={`relative z-50 w-full ${customer.length <= 0 || Object.keys(userDetails).length > 0 ? "rounded-b-md" : ""} rounded-t-md bg-white shadow-lg`}
      >
        <div className="flex items-center px-2.5 py-0.5">
          <input
            type="text"
            value={inputValue}
            className={
              "flex-1 border-none p-2 outline-none placeholder:text-gray-500"
            }
            placeholder="Search Customer"
            onChange={(e) => {
              changeInput(e.target.value);
            }}
          />
          <span className="ml-2 flex-none cursor-pointer text-2xl text-gray-500">
            {inputValue.length > 0 ? (
              <span
                onClick={() => {
                  setInputValue("");
                  setCustomer([]);
                  if (Object.keys(userDetails).length > 0) {
                    dispatch(clearCustomer());
                  }
                }}
              >
                <Xcross />
              </span>
            ) : (
              <Search />
            )}
          </span>
        </div>
        <ul
          className={`absolute ${customer.length <= 0 || Object.keys(userDetails).length > 0 ? "hidden" : "block"} max-h-[300px] w-full overflow-y-scroll rounded-b-md border-t-2 border-blue-200 bg-white px-4 py-3 shadow-lg`}
        >
          {customer &&
            customer.length > 0 &&
            customer.map((value) => (
              <li
                key={value.$id}
                className="rounded-md px-5 py-4 hover:bg-blue-100"
                onClick={() => {
                  setInputValue(value.customerName);
                  dispatch(addCustomer(value));
                }}
              >
                {value.customerName}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchSection;
