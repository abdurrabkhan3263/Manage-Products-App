import { useDispatch } from "react-redux";
import { Edit, Delete, Phone, admin } from "../../../public/Assets";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "../../appwrite";
import { DataDelete } from "../index";

const AllCustomerData = (data, setIsDelete) => {
  const navigate = useNavigate();
  const handleCustomerDelete = async () => {
    setIsDelete((prev) => ({
      ...prev,
      isShow: true,
      mainId: data.$id,
      imgId: data?.customerImageId || "",
    }));
  };
  return (
    <>
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
        <td className="py-1.5 text-center text-lg capitalize">
          {data.customerName}
        </td>
        <td className="py-1.5 text-center text-lg">{data.phoneNumber}</td>
        <td className="py-1.5 text-center text-lg">
          {data?.customerAddress || "No Address Available"}
        </td>
        <td className="cursor-pointer py-1.5 text-center text-lg underline">
          <span
            onClick={() =>
              navigate(`customerdetails/${555}`, { state: "/allcustomer" })
            }
          >
            See More
          </span>
        </td>
        <td className="gap-x-8 py-1.5 text-center text-lg">
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
