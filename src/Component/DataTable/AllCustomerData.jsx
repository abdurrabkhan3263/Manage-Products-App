import {
  Edit,
  Delete,
  Phone,
  admin,
  LongLeftArrow,
} from "../../../public/Assets";
import { useNavigate } from "react-router-dom";
import { databaseService } from "../../appwrite";
import { DataDelete } from "../index";
import { useState } from "react";
import { useSelector } from "react-redux";

const AllCustomerData = (data, setIsDelete) => {
  const navigate = useNavigate();
  const seeProduct = useSelector((state) => state.seeProductList);
  const [deleteData, setDeleteData] = useState({
    isShow: false,
    deleteFun: databaseService.deleteCustomer,
    mainId: data?.$id,
    imgId: data?.customerImageId || "",
  });
  const handleCustomerDelete = async () => {
    setDeleteData((prev) => ({
      ...prev,
      isShow: true,
    }));
  };
  return (
    <>
      <tr>
        <td>
          <DataDelete
            deleteData={deleteData}
            setDeleteData={setDeleteData}
            QueryKey={"customer"}
          />
        </td>
      </tr>
      <tr className="col-span-1 border-b-2 border-black">
        <td className="flex justify-center py-1.5 text-center text-lg">
          <div className="h-14 w-14 overflow-hidden rounded-full bg-lightgray">
            <img
              src={data?.customerImage || admin}
              alt={data.customerName}
              className="h-full w-full object-cover"
            />
          </div>
        </td>
        <td className="py-1.5 text-center text-lg font-medium capitalize">
          {data.customerName}
        </td>
        <td className="py-1.5 text-center text-lg font-medium">
          {data.phoneNumber}
        </td>
        <td className="py-1.5 text-center text-lg font-medium">
          {data?.customerAddress || "No Address Available"}
        </td>
        <td className="cursor-pointer py-1.5 text-center text-lg font-medium hover:text-blue-500 hover:underline">
          <span
            onClick={() =>
              navigate(`customerdetails/${data.$id}`, { state: "/allcustomer" })
            }
          >
            See More
          </span>
        </td>
        <td className="cursor-pointer py-1.5 text-center text-lg font-medium">
          ₹ {data?.totalPrice}
        </td>
        <td className="gap-x-8 py-1.5 text-center text-lg font-medium">
          <div className="flex items-center justify-center gap-x-6 py-1.5 text-xl">
            <a href={`tel:${data.phoneNumber}`}>
              <Phone />
            </a>
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate(`editcontact/${data.$id}`, {
                  state: "/allcustomer",
                });
              }}
            >
              <Edit />
            </span>
            <span
              className="cursor-pointer text-xl"
              onClick={handleCustomerDelete}
            >
              <Delete />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};
export default AllCustomerData;
