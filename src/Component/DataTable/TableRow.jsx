import React from "react";

function TableRow({ renderRow, rowData, setIsDelete }) {
  return renderRow(rowData, setIsDelete);
}

export default TableRow;
