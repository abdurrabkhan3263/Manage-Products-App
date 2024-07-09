import React from "react";
import ProductTable from "./Product Table/ProductTable";

function ProductList({ className }) {
  return (
    <div
      className={`${className} col-span-7 row-start-3 row-end-12 overflow-auto bg-slate-200 sm:rounded-xl`}
    >
      <ProductTable />
    </div>
  );
}

export default ProductList;
