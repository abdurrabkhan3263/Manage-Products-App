import { Print, Delete, admin } from "../../../public/Assets";
import { useNavigate } from "react-router-dom";
import convertToIST from "../../Hook/userCovertDate";
import { toastFunction } from "../../utils/toastFunction";
import DataDelete from "../Delete/DataDelete";
import { useEffect, useState } from "react";
import { databaseService } from "../../appwrite";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BuySellData = (data) => {
  const navigate = useNavigate();
  const { $id, customerName, customerImage, phoneNumber, $createdAt } = data;
  const formatedDate = convertToIST($createdAt)?.fullDate;
  const [showDelete, setShowDelete] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // const [deleteData, setDeleteData] = useState({
  //   isShow: false,
  //   deleteFun: databaseService.deleteSell,
  //   mainId: $id,
  //   imgId: "",
  //   QueryKey: "invoiceData",
  // });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id) => {
      return await databaseService.deleteSell(id);
    },
    onSuccess: () => {
      setShowDelete(false);
      queryClient.invalidateQueries({
        queryKey: ["invoiceData"],
      });
      toastFunction({
        type: "success",
        message: `Invoice Deleted SuccessFully`,
      });
    },
    onError: (error) => {
      throw new Error(error);
    },
  });

  const handleProductDelete = async () => {
    if (!$id) return;
    deleteMutation.mutate($id);
  };

  useEffect(() => {
    if (confirm) {
      handleProductDelete();
    }
  }, [confirm]);
  return (
    <>
      <tr>
        <td>
          <DataDelete
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            confirm={confirm}
            setConfirm={setConfirm}
            deletionLoader={deleteMutation.isPending}
          />
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
                setShowDelete(() => true);
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
