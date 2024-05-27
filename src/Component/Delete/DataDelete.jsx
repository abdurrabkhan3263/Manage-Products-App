import React from "react";
import { useDispatch } from "react-redux";
import { deleteData, resetDeleteData } from "../../store/slice";

function DataDelete() {
  const dispatch = useDispatch();
  return (
    <div className="absolute h-[45%] py-8 gap-y-5 w-1/4 text-center flex flex-col justify-between shadow-lightBox bg-white rounded-xl border right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 z-50">
      <div className="w-full flex justify-center">
        <h1 className="text-xl font-semibold text-wrap text-center mt-8 w-[70%]">
          Do You Really Want To Delete It ?
        </h1>
      </div>
      <div className="flex flex-col px-6 pt-5 gap-y-6">
        <button
          className="bg-lightblue hover:bg-darkblue duration-200 text-white py-2.5 font-semibold rounded-full"
          onClick={() => {
            dispatch(deleteData(true));
          }}
        >
          Delete
        </button>
        <button
          className="bg-lightgray hover:bg-[#dfdfdf] duration-200 py-2.5 font-semibold rounded-full"
          onClick={() => {
            dispatch(resetDeleteData());
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DataDelete;
