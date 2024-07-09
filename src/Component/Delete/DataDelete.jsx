import { useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "../../appwrite";
import { Error } from "../index";
import { toastFunction } from "../../utils/toastFunction";
import "./DeleteCard.css";
import { SimpleLoader } from "../../Assets";

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
      } border-1 absolute bottom-1/2 right-[55%] z-50 flex h-fit w-1/4 translate-x-[55%] translate-y-1/2 items-center justify-center gap-y-5 rounded-[20px] border-[0.5px] border-gray-400`}
    >
      <div className={`card`}>
        {deleteMutation.isPending ? (
          <div className="flex h-full w-full items-center justify-center">
            <SimpleLoader />
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-9">
            <div className="card-content">
              <p className="card-heading">Delete file?</p>
              <p className="card-description">
                Do You Really Want To Delete It ?
              </p>
            </div>
            <div className="card-button-wrapper">
              <button
                className="card-button secondary"
                onClick={() => {
                  setDeleteData((prev) => ({ ...prev, isShow: false }));
                }}
              >
                Cancel
              </button>
              <button
                className="card-button primary"
                onClick={handleProductDelete}
              >
                Delete
              </button>
            </div>
            <button
              className="exit-button"
              onClick={() => {
                setDeleteData((prev) => ({ ...prev, isShow: false }));
              }}
            >
              <svg height="20px" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataDelete;
