import React, { useRef, useEffect, useState } from "react";
import { no__data, Delete, Add, Remove } from "../../../../public/Assets";
import gsap from "gsap";
import { editProduct, removeProduct } from "../../../store/thunkFile";
import { useDispatch } from "react-redux";

function MobileCart({ proData }) {
  const deleteCart = useRef(null);
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

  function sleep(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  const handleRemove = () => {
    gsap.to(deleteCart.current, {
      x: "-50%",
      opacity: 0,
      duration: 0.3,
      ease: "power1",
      onComplete: () => {
        gsap.set(deleteCart.current, {
          display: "none",
        });
      },
    });
    sleep(300).then(() => {
      dispatch(removeProduct(proData));
    });
  };
  return (
    <div
      ref={deleteCart}
      className="grid h-60 w-full grid-cols-8 gap-x-3 rounded-xl bg-blue-600 p-4 hover:shadow-md"
    >
      <div className="col-start-1 col-end-4 overflow-hidden rounded-md shadow-xl">
        <img
          src={proData?.productImage || no__data}
          alt="image"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="col-start-4 col-end-9 grid grid-cols-6 grid-rows-6 overflow-hidden rounded-md">
        <div className="col-span-6 flex items-center justify-end pr-2 text-2xl text-yellow-300">
          <span onClick={handleRemove}>
            <Delete />
          </span>
        </div>
        <div className="col-span-6 row-start-2 row-end-6">
          <p className="font-mediums px-2 text-white">{proData?.productName}</p>
        </div>
        <div className="col-span-6 row-start-6 row-end-7 flex justify-between px-2">
          <div className="flex h-full w-fit border-collapse items-center justify-center rounded-full bg-gray-300">
            <div
              className="flex h-full w-[2.2rem] cursor-pointer items-center justify-center rounded-full border-gray-400 bg-[#002147] text-white"
              onClick={() => setInputValue((prev) => prev + 1)}
            >
              <span>
                <Add />
              </span>
            </div>
            <div className="flex h-8 w-14 items-center justify-center">
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
              className="flex h-full w-[2.2rem] cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-200"
              onClick={() =>
                inputValue > 1 ? setInputValue((prev) => prev - 1) : ""
              }
            >
              <span>
                <Remove />
              </span>
            </div>
          </div>
          <div className="flex h-full items-center text-xl text-white">
            <span>₹</span>{" "}
            <p className="pl-1 font-semibold">{proData?.productPrice || 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileCart;
