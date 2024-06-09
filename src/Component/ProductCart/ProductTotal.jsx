import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

function ProductTotal({ className }) {
  const cartData = useSelector((state) => state.cart);
  const totalAmount = useMemo(() => {
    return cartData.reduce((acc, current) => acc + current.productPrice, 0);
  }, [cartData]);
  return (
    <div
      className={`${className} col-start-5 col-end-7 row-start-2 row-end-7 overflow-hidden border-2 border-black`}
    >
      <div>Order Summary ₹ {totalAmount}</div>
    </div>
  );
}

export default ProductTotal;
