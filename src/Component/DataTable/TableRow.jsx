import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

function TableRow({
  id,
  fullName,
  customerProfileImg,
  phoneNumber,
  totalAmount,
  icon1,
  icon2,
  icon3,
  seeMore,
}) {
  return (
    <tr className="border-b-2 border-black col-span-1">
      {customerProfileImg && (
        <td className="text-center text-lg py-1.5 flex justify-center">
          <div className="h-14 w-14 rounded-full bg-lightgray overflow-hidden">
            <img
              src={customerProfileImg || admin}
              alt={fullName}
              className="h-full w-full object-cover"
            />
          </div>
        </td>
      )}
      <td className="text-center text-lg py-1.5">{fullName}</td>
      <td className="text-center text-lg py-1.5">{phoneNumber}</td>
      <td className="text-center text-lg py-1.5">{totalAmount}</td>
      <td className="text-center text-lg underline cursor-pointer py-1.5">
        {seeMore}
      </td>
      <td className="text-center text-lg gap-x-8 py-1.5">
        <div className="flex items-center justify-center gap-x-6 text-xl py-1.5">
          {icon1}
          {icon2}
          {icon3}
        </div>
      </td>
    </tr>
  );
}

export default memo(TableRow);
