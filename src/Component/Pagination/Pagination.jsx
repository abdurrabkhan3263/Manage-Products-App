import React from "react";
import { RightArrow, LeftArrow } from "../../../public/Assets";

function Pagination({ pageNum, setPage, length, dataCount }) {
  const handlePageNumber = (e) => {
    const btnNum = parseInt(e.target.textContent);
    setPage(btnNum);
  };
  return (
    <div className="sticky bottom-0 flex justify-between w-full ml">
      <button
        className="bg-darkblue text-white p-2 rounded-md"
        onClick={() => {
          if (pageNum > 1) setPage((prev) => prev - 1);
        }}
      >
        <LeftArrow />
      </button>
      <div className="flex gap-x-4">
        {[...Array(Math.ceil(length / dataCount))].map((_, i) => (
          <button
            key={i}
            className={` ${
              pageNum === i + 1
                ? "bg-lightblue text-white"
                : "text-black bg-gray-200"
            } px-4 rounded-md`}
            onClick={handlePageNumber}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className="bg-darkblue text-white p-2 rounded-md"
        onClick={() => {
          if (pageNum < length / dataCount) setPage((prev) => prev + 1);
        }}
      >
        <RightArrow />
      </button>
    </div>
  );
}

export default Pagination;
