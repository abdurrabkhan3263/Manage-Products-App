import React, { memo, useMemo } from "react";
import { Edit, Delete, Phone, admin } from "../../../public/Assets";
import { useNavigate } from "react-router-dom";
import TableRow from "./TableRow";

function DataTable({ tableHeading, tableData, dataNum, pageNum, actionData }) {
  const navigate = useNavigate();
  const displayData = useMemo(() => {
    if (tableData) {
      return tableData.slice(pageNum * dataNum - dataNum, pageNum * dataNum);
    }
  }, [pageNum, tableData, dataNum]);
  return (
    <div>
      <table className="w-full table-fixed">
        <thead className="sticky top-0">
          <tr>
            {tableHeading &&
              tableHeading.map((hData) => (
                <th
                  key={hData.name}
                  className="bg-lightblue text-white border py-2 text-lg"
                >
                  {hData.name}
                </th>
              ))}
          </tr>
        </thead>
        {/* Add The Data */}
        <tbody>
          {displayData &&
            displayData.map((cusData) => (
              <TableRow
                key={cusData.id}
                pageName={actionData[0].path}
                fullName={
                  (cusData.products && cusData.products[0].title) ||
                  `${cusData.firstName} ${cusData.lastName}`
                }
                customerProfileImg={
                  (cusData.products && cusData.products[0].thumbnail) || null
                }
                id={cusData.id}
                totalAmount={1234343}
                phoneNumber={cusData.phone || cusData.products[0].price}
                actionData={actionData}
                icon1={actionData[0].elem()}
                icon2={actionData[1].elem(cusData.userId)}
                icon3={actionData[2].elem(cusData.id)}
                seeMore={actionData[3].elem(cusData.userId)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(DataTable);
