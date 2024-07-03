import React from "react";
import "./SaleCart.css";

function SaleCart({ Icon, Amount, Grow, cartHeading }) {
  return (
    <div className="main__cart rounded-lg bg-blue-900 px-3.5 py-5 text-white">
      <div className="scale__elem flex h-full flex-col justify-between">
        <div className="flex justify-between">
          <p className="font-medium">{cartHeading}</p>
          <div className="text-2xl text-yellow-200">{<Icon />}</div>
        </div>
        <div className="text-3xl font-medium text-yellow-100">
          <h1>{Amount}</h1>
        </div>
        <div className="flex justify-between">
          <i className="font-medium text-yellow-50">{Grow}</i>
          <p className="font-medium">Since last month</p>
        </div>
      </div>
    </div>
  );
}

export default SaleCart;
