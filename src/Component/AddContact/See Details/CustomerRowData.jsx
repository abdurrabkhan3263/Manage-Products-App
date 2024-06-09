import React from "react";
import { Delete } from "../../../../public/Assets/index";
import { useDispatch } from "react-redux";

function CustomerRowData(data) {
  const dispatch = useDispatch();
  return (
    <tr className="border-b-2 border-black col-span-1 font-medium">
      <td className="text-center text-lg py-1.5 flex justify-center">
        {data.id}
      </td>
      <td className="text-center text-lg py-1.5">20-05-2024</td>
      <td className="text-center text-lg py-1.5 hover:underline cursor-pointer underline-offset-1">
        See Details
      </td>
      {/* <td className="text-center text-lg py-1.5">5000000</td> */}
      <td className="text-center text-lg gap-x-8 py-1.5">
        <div className="flex items-center justify-center gap-x-6 text-xl py-1.5">
          <span
            className="cursor-pointer text-xl"
            onClick={() => {
              dispatch(showDeleteSection({ id: 54, showDelete: true }));
            }}
          >
            <Delete />
          </span>
        </div>
      </td>
    </tr>
  );
}

export default CustomerRowData;
