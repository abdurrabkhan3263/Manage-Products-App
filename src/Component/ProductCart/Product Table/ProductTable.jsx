import React from "react";
import ProductTableRow from "./ProductTableRow";
import { useSelector } from "react-redux";

function ProductTable() {
  const cartData = useSelector((state) => state.cart?.allData) || [];

  return (
    <>
      <div className="hidden px-4 sm:block">
        <div className="sticky top-0 z-30 h-4 w-full bg-gray-200"></div>
        <table className="sticky top-4 z-10 w-full table-fixed">
          <thead className="sticky top-8 z-10">
            <tr className="bg-white text-[17px] uppercase">
              <th className="py-8 sm:rounded-l-xl">Product Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th className="sm:rounded-r-xl">Action</th>
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
      <div className="block overflow-auto sm:hidden">
        <div className="sticky top-0 z-30 h-4 w-full bg-gray-200"></div>
        <table className="sticky top-0 w-full table-auto border-separate border-spacing-y-3 sm:table-fixed">
          <thead className="sticky top-8 z-10">
            <tr className="bg-white text-[17px] uppercase">
              <th className="px-12 py-8 sm:rounded-l-xl">Product Image</th>
              <th className="px-12">Name</th>
              <th className="px-12">Price</th>
              <th className="px-12">Quantity</th>
              <th className="px-12">Total</th>
              <th className="px-12 sm:rounded-r-xl">Action</th>
            </tr>
          </thead>
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
    </>
  );
}

export default ProductTable;
