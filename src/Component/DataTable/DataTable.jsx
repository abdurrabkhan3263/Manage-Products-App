import React, { memo, useMemo } from "react";
import { Edit, Delete, Phone, admin } from "../../../public/Assets";
import { useNavigate } from "react-router-dom";
import TableRow from "./TableRow";

function DataTable({ tableHeading, tableData, dataNum, pageNum, renderRow }) {
  const navigate = useNavigate();
  const displayData = useMemo(() => {
    if (tableData) {
      return tableData.slice(pageNum * dataNum - dataNum, pageNum * dataNum);
    }
  }, [pageNum, tableData, dataNum]);
  const rowData = [
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      address: "123 Main St",
      history: [
        { date: "2022-05-25", action: "Purchase", amount: "$100" },
        { date: "2022-05-27", action: "Return", amount: "$50" },
      ],
    },
  ];
  return (
    <div>
      <table className="w-full table-fixed">
        <thead className="sticky top-0 z-10">
          <tr>
            {tableHeading &&
              tableHeading.map((hData) => (
                <th
                  key={hData.name}
                  className="bg-lightblue text-white border py-1 text-lg"
                >
                  {hData.name}
                </th>
              ))}
          </tr>
        </thead>
        {/* Add The Data */}
        <tbody className="overflow-y-scroll">
          {rowData.map((rowData, index) => (
            <TableRow key={index} renderRow={renderRow} rowData={rowData} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(DataTable);
