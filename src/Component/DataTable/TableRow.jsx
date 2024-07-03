import React from "react";

function TableRow({ renderRow, rowData, sr }) {
  return renderRow(rowData, sr);
}

export default TableRow;
