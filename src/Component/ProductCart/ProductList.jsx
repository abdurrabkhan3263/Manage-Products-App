import React from "react";
import ProductTable from "./Product Table/ProductTable";

function ProductList({ className }) {
  return (
    <div
      className={`${className} col-span-7 row-start-3 row-end-12 overflow-hidden overflow-y-scroll rounded-xl bg-slate-200`}
    >
      <ProductTable />
    </div>
  );
}

export default ProductList;
