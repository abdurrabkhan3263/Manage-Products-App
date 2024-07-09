import React, { memo, useState } from "react";
import TableRow from "./TableRow";
import DataDelete from "../Delete/DataDelete";
import { databaseService } from "../../appwrite";

function DataTable({
  tableHeading,
  tableData,
  renderRow,
  tableHeadingClass,
  tableRowClass,
}) {
  return (
    <div className="overflow-auto">
      <table className="w-full lg:table-fixed">
        <thead className="sticky top-0 z-10">
          <tr>
            {tableHeading &&
              tableHeading.map((hData) => (
                <th
                  key={hData.name}
                  className={`border bg-lightblue px-14 ${tableHeadingClass} py-2 text-lg text-white`}
                >
                  {hData.name}
                </th>
              ))}
          </tr>
        </thead>
        {/* Add The Data */}
        <tbody>
          {tableData &&
            tableData.map((rowData, index) => (
              <TableRow
                key={index}
                renderRow={renderRow}
                rowData={rowData}
                sr={index}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(DataTable);
