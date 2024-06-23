import { useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "../../appwrite";
import { Error } from "../index";
import { toastFunction } from "../../utils/toastFunction";

function DataDelete({ deleteData, setDeleteData, QueryKey }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id) => {
      return await deleteData.deleteFun(id);
    },
    onSuccess: () => {
      setDeleteData((prev) => ({ ...prev, isShow: false }));
      queryClient.invalidateQueries({
        queryKey: [QueryKey],
        refetchType: "active",
      });
      toastFunction({
        type: "success",
        message: "Deleted SuccessFully",
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const handleProductDelete = async () => {
    if (!deleteData.mainId) return;
    deleteMutation.mutate(deleteData.mainId);
    if (!deleteData.imgId) return;
    await databaseService.deleteProductImg(deleteData.imgId);
  };
  return (
    <div
      className={`${
        deleteData.isShow ? "flex" : "hidden"
      } absolute bottom-1/2 right-[55%] z-50 h-[45%] w-1/4 translate-x-[55%] translate-y-1/2 flex-col justify-between gap-y-5 rounded-xl border bg-white py-8 text-center shadow-lightBox`}
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
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex w-full justify-center">
            <h1 className="mt-8 w-[70%] text-wrap text-center text-xl font-semibold">
              Do You Really Want To Delete It ?
            </h1>
          </div>
          <div className="flex flex-col gap-y-6 px-6 pt-5">
            <button
              className="rounded-full bg-lightblue py-2.5 font-semibold text-white duration-200 hover:bg-darkblue"
              onClick={handleProductDelete}
            >
              Delete
            </button>
            <button
              className="rounded-full bg-lightgray py-2.5 font-semibold duration-200 hover:bg-[#dfdfdf]"
              onClick={() => {
                setDeleteData((prev) => ({ ...prev, isShow: false }));
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
