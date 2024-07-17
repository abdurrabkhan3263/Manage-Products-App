import React, { useMemo, useCallback } from "react";
import { RightArrow, LeftArrow } from "../../../public/Assets";

const VISIBLE_PAGE_BUTTONS = 4;

function Pagination({ pageNum, setPage, length, dataCount, className }) {
  const totalPages = Math.ceil(length / dataCount);

  const pageNumbers = useMemo(() => {
    if (totalPages <= VISIBLE_PAGE_BUTTONS) {
      return [
        ...Array.from({ length: totalPages - 1 }, (_, i) => i + 1),
        "Last",
      ];
    }

    const min = Math.min(pageNum, pageNum - 2);

    if (pageNum >= totalPages - 2) {
      console.log("hit 1");
      console.log(pageNum);
      return [
        "First",
        ...Array.from({ length: 3 }, (_, i) => totalPages - 2 + i),
      ];
    }
    if (min < 0) {
      console.log("hit 2");
      console.log(pageNum);
      return [...Array.from({ length: 3 }, (_, i) => i + 1), "Last"];
    }
    if (min >= 1) {
      console.log("hit 3");
      console.log(pageNum);
      return [
        "First",
        ...Array.from({ length: 5 }, (_, i) => pageNum - 2 + (i + 1)),
        "Last",
      ];
    }
    if (min <= 1) {
      console.log("hit 4");
      console.log(pageNum);
      return [
        ...Array.from({ length: 5 }, (_, i) => pageNum - 2 + (i + 1)),
        "Last",
      ];
    }
    return [];
  }, [totalPages, pageNum]);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 0 && newPage < totalPages) {
        console.log(newPage);
        setPage(newPage);
      }
    },
    [setPage, totalPages],
  );

  React.useEffect(() => {
    console.log(pageNumbers);
  }, [totalPages, pageNum]);

  const handlePageButtonClick = useCallback(
    (e) => {
      const btnText = e.target.textContent;
      if (btnText === "Last") handlePageChange(totalPages - 1);
      if (btnText === "First") handlePageChange(1);
      if (!isNaN(btnText)) {
        handlePageChange(btnText - 1);
      }
    },
    [handlePageChange],
  );

  return (
    <nav
      className={`ml sticky bottom-0 flex w-full items-center justify-center ${className}`}
      aria-label="Pagination"
    >
      {/* <button
        className="rounded-md bg-darkblue p-2 text-white disabled:opacity-50"
        onClick={() => handlePageChange(1)}
        disabled={pageNum === 0}
        aria-label="First"
      >
        Start
      </button> */}
      <div className="flex gap-x-2">
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            className={`rounded-md px-4 py-2 ${
              pageNum === pageNumber - 1
                ? "bg-lightblue text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={handlePageButtonClick}
            aria-current={pageNum === pageNumber - 1 ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {/* <button
        className="rounded-md bg-darkblue p-2 text-white disabled:opacity-50"
        onClick={() => handlePageChange(totalPages)}
        disabled={pageNum === totalPages - 1}
        aria-label="Last"
      >
        Last
      </button> */}
    </nav>
  );
}

export default Pagination;
