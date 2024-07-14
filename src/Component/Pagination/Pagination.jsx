import React, { useMemo, useCallback } from "react";
import { RightArrow, LeftArrow } from "../../../public/Assets";

const ELLIPSIS = "....";
const VISIBLE_PAGE_BUTTONS = 5;

function Pagination({ pageNum, setPage, length, dataCount, className }) {
  const totalPages = Math.ceil(length / dataCount);

  const pageNumbers = useMemo(() => {
    if (totalPages <= VISIBLE_PAGE_BUTTONS) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(pageNum - 1, 1);
    const rightSiblingIndex = Math.min(pageNum + 1, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = VISIBLE_PAGE_BUTTONS - 1;
      return [
        ...Array.from({ length: leftItemCount }, (_, i) => i + 1),
        ELLIPSIS,
        totalPages,
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = VISIBLE_PAGE_BUTTONS - 1;
      return [
        1,
        ELLIPSIS,
        ...Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - rightItemCount + i + 1,
        ),
      ];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      return [1, ELLIPSIS, pageNum, ELLIPSIS, totalPages];
    }

    return [];
  }, [pageNum, totalPages]);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 0 && newPage < totalPages) {
        setPage(newPage);
      }
    },
    [setPage, totalPages],
  );

  const handlePageButtonClick = useCallback(
    (e) => {
      const btnNum = parseInt(e.target.textContent, 10);
      if (!isNaN(btnNum)) {
        handlePageChange(btnNum - 1);
      }
    },
    [handlePageChange],
  );

  return (
    <nav
      className={`ml sticky bottom-0 flex w-full items-center justify-between ${className}`}
      aria-label="Pagination"
    >
      <button
        className="rounded-md bg-darkblue p-2 text-white disabled:opacity-50"
        onClick={() => handlePageChange(pageNum - 1)}
        disabled={pageNum === 0}
        aria-label="Previous page"
      >
        <LeftArrow />
      </button>
      <div className="flex gap-x-2">
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            className={`rounded-md px-4 py-2 ${
              pageNum === pageNumber - 1
                ? "bg-lightblue text-white"
                : "bg-gray-200 text-black"
            } ${pageNumber === ELLIPSIS ? "cursor-default" : ""}`}
            onClick={handlePageButtonClick}
            // disabled={pageNumber === ELLIPSIS}
            aria-current={pageNum === pageNumber - 1 ? "page" : undefined}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className="rounded-md bg-darkblue p-2 text-white disabled:opacity-50"
        onClick={() => handlePageChange(pageNum + 1)}
        disabled={pageNum === totalPages - 1}
        aria-label="Next page"
      >
        <RightArrow />
      </button>
    </nav>
  );
}

export default Pagination;
