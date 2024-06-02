import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { databaseService } from "../../appwrite";
import { Error } from "../index";
import { Xcross } from "../../../public/Assets";

function DataDelete({ isShowDel, setIsShow, fileDetails }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id) => {
      return await fileDetails.deleteFun(id);
    },
    onSuccess: () => {
      setIsShow(false);
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const handleProductDelete = async () => {
    if (!fileDetails.productId) return;
    deleteMutation.mutate(fileDetails.productId);
    if (!fileDetails.imgId) return;
    await databaseService.deleteProductImg(fileDetails.imgId);
  };
  return (
    <div
      className={`${
        isShowDel ? "flex" : "hidden"
      } absolute h-[45%] py-8 gap-y-5 w-1/4 text-center  flex-col justify-between shadow-lightBox bg-white rounded-xl border right-[55%] translate-x-[55%] bottom-1/2 translate-y-1/2 z-50`}
    >
      {deleteMutation.isError ? (
        <>
          <Error message={deleteMutation.error.message} />
        </>
      ) : deleteMutation.isPending ? (
        <div>
          <p>Deleting..........</p>
        </div>
      ) : (
        <div className="flex justify-between flex-col h-full w-full">
          <div className="w-full flex justify-center">
            <h1 className="text-xl font-semibold text-wrap text-center mt-8 w-[70%]">
              Do You Really Want To Delete It ?
            </h1>
          </div>
          <div className="flex flex-col px-6 pt-5 gap-y-6">
            <button
              className="bg-lightblue hover:bg-darkblue duration-200 text-white py-2.5 font-semibold rounded-full"
              onClick={handleProductDelete}
            >
              Delete
            </button>
            <button
              className="bg-lightgray hover:bg-[#dfdfdf] duration-200 py-2.5 font-semibold rounded-full"
              onClick={() => {
                setIsShow(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataDelete;
