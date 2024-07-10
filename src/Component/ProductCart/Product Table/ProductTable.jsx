import React, { useRef } from "react";
import ProductTableRow from "./ProductTableRow";
import { useSelector } from "react-redux";
import gsap from "gsap";
import MobileCart from "./MobileCart";

function ProductTable() {
  const cartData = useSelector((state) => state.cart?.allData) || [];

  return (
    <>
      <div className="hidden sm:block">
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
              {cartData.map((data) => (
                <tr key={data.$id} className="bg-white text-[20px]">
                  <ProductTableRow proData={data} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="flex flex-col gap-y-3">
          {cartData && cartData.length <= 0 && (
            <div className="py-5 text-center text-3xl font-semibold">
              <h1>Your Cart is empty.</h1>
            </div>
          )}
          {cartData &&
            cartData.length > 0 &&
            cartData.map((data) => (
              <div key={data.$id} className="text-[20px]">
                <MobileCart proData={data} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductTable;
