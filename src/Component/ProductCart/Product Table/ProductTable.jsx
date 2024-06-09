import React from "react";
import ProductTableRow from "./ProductTableRow";
import { useSelector } from "react-redux";
function ProductTable() {
  const rowData = useSelector((state) => state.cart);
  return (
    <table className="w-full table-fixed">
      <thead>
        <tr className="border-b-2 uppercase">
          <th className="py-2">Product Image</th>
          <th className="py-2">Name</th>
          <th className="py-2">Price</th>
          <th className="py-2">Quantity</th>
          <th className="py-2">total</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {rowData.length > 0 &&
          rowData.map((data) => (
            <tr key={data.$id} className="border-b-2 text-[20px]">
              <ProductTableRow proData={data} />
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
