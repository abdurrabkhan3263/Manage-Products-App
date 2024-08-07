import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../UI";
import { Money } from "../../../public/Assets";
import { submitForm } from "../../store/thunkFile";

function ProductTotal({ className }) {
  const cartData = useSelector((state) => state.cart?.allData) || [];
  const dispatch = useDispatch();
  const totalAmount = useMemo(() => {
    return cartData.reduce((acc, current) => acc + current.productAmount, 0);
  }, [cartData]);
  const handleCashOut = () => {
    dispatch(submitForm());
  };
  return (
    <div
      className={`${className} col-span-7 flex items-center justify-between overflow-hidden rounded-xl bg-lightblue px-2 py-2.5 text-white sm:row-start-12 sm:row-end-13 sm:px-4 sm:py-0`}
    >
      <div className="text-xl font-medium">Total Price:- ₹ {totalAmount}</div>
      <Button
        className={
          "flex items-center gap-4 bg-white px-5 py-[7.5px] text-[16px] text-black transition-all hover:bg-gray-100"
        }
        onClick={handleCashOut}
      >
        Cash Out
        <span className="mt-2">
          <Money />
        </span>
      </Button>
    </div>
  );
}

export default ProductTotal;
