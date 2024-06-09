import React from "react";
import ProductTable from "./Product Table/ProductTable";

function ProductList({ className }) {
  return (
    <div
      className={`${className} col-start-1 col-end-5 row-start-2 row-end-7 overflow-hidden overflow-y-scroll border-2 border-black`}
    >
      <ProductTable />
    </div>
  );
}

export default ProductList;
