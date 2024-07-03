import { useDispatch } from "react-redux";
import {
  Print,
  Delete,
  image__not__available,
  admin,
} from "../../../public/Assets";
import { useNavigate } from "react-router-dom";
import convertToIST from "../../Hook/userCovertDate";
import { toastFunction } from "../../utils/toastFunction";
import DataDelete from "../Delete/DataDelete";
import { useState } from "react";
import { databaseService } from "../../appwrite";

const BuySellData = (data) => {
  const navigate = useNavigate();
  const { $id, customerName, customerImage, phoneNumber, $createdAt } = data;
  const formatedDate = convertToIST($createdAt)?.fullDate;
  const [deleteData, setDeleteData] = useState({
    isShow: false,
    deleteFun: databaseService.deleteSell,
    mainId: $id,
    imgId: "",
    QueryKey: "invoiceData",
  });
  return (
    <>
      <tr>
        <td>
          <DataDelete deleteData={deleteData} setDeleteData={setDeleteData} />
        </td>
      </tr>
      <tr className="col-span-1 border-b-2 border-black">
        <td className="flex justify-center py-1.5 text-center text-lg font-medium">
          <div className="h-14 w-14 overflow-hidden rounded-full bg-lightgray">
            <img
              src={customerImage || admin}
              className="h-full w-full object-cover"
            />
          </div>
        </td>
        <td className="py-1.5 text-center text-lg font-medium">
          {formatedDate}
        </td>
        <td className="py-1.5 text-center text-lg font-medium">
          {customerName}
        </td>
        <td className="py-1.5 text-center text-lg font-medium">
          {phoneNumber}
        </td>
        <td className="cursor-pointer py-1.5 text-center text-lg font-medium hover:text-blue-500 hover:underline">
          <span
            onClick={() =>
              navigate(`seeproductdetails/${$id}`, { state: "/invoice" })
            }
          >
            See More
          </span>
        </td>
        <td className="gap-x-8 py-1.5 text-center text-lg font-medium">
          <div className="flex items-center justify-center gap-x-6 py-1.5 text-xl">
            <span
              className="cursor-pointer text-xl"
              onClick={() => {
                toastFunction({
                  type: "error",
                  message: "Comming Soon",
                  closeTime: 1500,
                });
              }}
            >
              <Print />
            </span>
            <span
              className="cursor-pointer text-xl"
              onClick={() => {
                setDeleteData((prev) => ({ ...prev, isShow: true }));
              }}
            >
              <Delete />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};
export default BuySellData;
