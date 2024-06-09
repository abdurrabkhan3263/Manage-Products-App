import React from "react";
import { Delete } from "../../../public/Assets";
import { useDispatch } from "react-redux";

function SeeProduct() {
  const dispatch = useDispatch();
  return (
    <tr className="border-b-2 border-black col-span-1">
      <td className="text-center">
        <div className="h-14 w-14 translate-x-1/3 z-0 rounded-full bg-lightgray overflow-hidden">
          <img
            src={
              "https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={"abdur Rab"}
            className="h-full w-full object-cover"
          />
        </div>
      </td>
      <td className="text-center text-base py-1.5">
        Lorem ipsum dolor sit amet consectetur
      </td>
      <td className="text-center text-base py-1.5">2400</td>
      <td className="text-center text-base py-1.5">5000000</td>
      <td className="text-center text-base gap-x-8 py-1.5">
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

export default SeeProduct;
