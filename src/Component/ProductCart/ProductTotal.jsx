import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Button } from "../UI";
import { Money } from "../../../public/Assets";

function ProductTotal({ className }) {
  const cartData = useSelector((state) => state.cart?.allData) || [];
  const totalAmount = useMemo(() => {
    return cartData.reduce((acc, current) => acc + current.productAmount, 0);
  }, [cartData]);
  // if user click on the place-order
  /*
  --> check data is there or not if not there giving the error message
  --> user select the user or not if not giving the error message (customerUser)
  --> then create the pdf 
  --> pdf created then add in the BUY-SELL --> also add into the buy-sell
  --> if done then add into the customer in the place of history
  */
  return (
    <div
      className={`${className} col-span-7 row-start-12 row-end-13 flex items-center justify-between overflow-hidden rounded-xl bg-lightblue px-4 text-white`}
    >
      <div className="text-xl font-medium">Order Summary ₹ {totalAmount}</div>
      <Button
        className={
          "flex items-center gap-4 bg-white px-6 py-2 text-[16px] text-black transition-all hover:bg-gray-100"
        }
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
