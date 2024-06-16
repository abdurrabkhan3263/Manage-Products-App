import React, { useEffect, useState } from "react";
import { Add, Remove, Delete } from "../../../../public/Assets";
import { useDispatch } from "react-redux";
import { removeProduct, editProduct } from "../../../store/thunkFile";
import { image__not__available } from "../../../../public/Assets";

function ProductTableRow({ proData }) {
  const [inputValue, setInputValue] = useState(
    parseInt(proData?.productQuantity),
  );
  const dispatch = useDispatch();
  function valueUpdate(value) {
    dispatch(
      editProduct({
        $id: proData.$id,
        opId: proData?.opId || "",
        productAmount: parseInt(value) * proData.productPrice,
        productQuantity: parseInt(value),
      }),
    );
  }
  const handleQuantity = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.target.value.trim() === "" || isNaN(e.target.value))
      return setInputValue();
    setInputValue(value);
  };
  useEffect(() => {
    valueUpdate(inputValue || 1);
  }, [inputValue]);
  return (
    <>
      <td className="relative rounded-l-xl py-7">
        <img
          src={proData?.productImage || image__not__available}
          className="m-auto w-24 rounded-md"
        />
      </td>
      <td className="font-medium">{proData?.productName || ""}</td>
      <td className="font-medium">₹ {proData?.productPrice || 1}</td>
      <td>
        <div className="m-auto flex w-fit border-collapse items-center justify-center rounded-full bg-gray-300">
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-gray-400 bg-[#002147] text-white"
            onClick={() => setInputValue((prev) => prev + 1)}
          >
            <span>
              <Add />
            </span>
          </div>
          <div className="flex h-10 w-16 items-center justify-center">
            <input
              type="text"
              className="h-full w-full border-none bg-gray-300 text-center outline-none"
              value={inputValue}
              onChange={handleQuantity}
              onBlur={() => {
                inputValue === 0 || !inputValue ? setInputValue(1) : "";
              }}
            />
          </div>
          <div
            className="flex h-[43px] w-[43px] cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-200"
            onClick={() =>
              inputValue > 1 ? setInputValue((prev) => prev - 1) : ""
            }
          >
            <span>
              <Remove />
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="m-auto flex w-fit items-center justify-center gap-x-16">
          <span className="font-semibold">
            ₹ {proData?.productPrice * (inputValue || 1)}
          </span>
        </div>
      </td>
      <td>
        <div className="m-auto flex justify-center">
          <span
            className="cursor-pointer rounded-full bg-white p-3 text-2xl transition-all hover:bg-slate-200"
            onClick={() => dispatch(removeProduct(proData))}
          >
            <Delete />
          </span>
        </div>
      </td>
    </>
  );
}

export default ProductTableRow;
