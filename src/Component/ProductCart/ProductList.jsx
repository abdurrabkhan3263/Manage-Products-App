import React from "react";
import ProductTable from "./Product Table/ProductTable";

function ProductList({ className }) {
  return (
    <div
      className={`${className} col-span-7 flex-1 overflow-auto rounded-xl bg-slate-200 sm:row-start-3 sm:row-end-12`}
    >
      <ProductTable />
    </div>
  );
}

export default ProductList;
