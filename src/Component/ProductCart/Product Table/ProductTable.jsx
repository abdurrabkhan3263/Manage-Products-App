import React from "react";
import ProductTableRow from "./ProductTableRow";
import { useSelector } from "react-redux";

function ProductTable() {
  const cartData = useSelector((state) => state.cart?.allData) || [];

  return (
    <div className="px-4">
      <div className="sticky top-0 z-30 h-4 w-full bg-gray-200"></div>
      <table className="sticky top-4 z-10 w-full table-fixed">
        <thead className="sticky top-8 z-10">
          <tr className="bg-white text-[19px] uppercase">
            <th className="rounded-l-xl py-8">Product Image</th>
            <th className="py-8">Name</th>
            <th className="py-8">Price</th>
            <th className="py-8">Quantity</th>
            <th className="rounded-r-xl py-8">Total</th>
            <th className="rounded-r-xl py-8">Action</th>
          </tr>
        </thead>
      </table>
      <table className="sticky top-0 w-full table-fixed border-separate border-spacing-y-3">
        <tbody className="text-center">
          <tr></tr>
          {cartData.map((data, index) => (
            <tr key={data.$id} className="bg-white text-[20px]">
              <ProductTableRow proData={data} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
