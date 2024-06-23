import React from "react";
import { Delete } from "../../../public/Assets";
import { useDispatch } from "react-redux";

function SeeProduct(data) {
  const { productName, productQuantity, productAmount, productPriceOption } =
    data;
  const price = JSON.parse(productPriceOption);
  const dispatch = useDispatch();
  return (
    <tr className="col-span-1 border-b-2 border-black">
      <td className="px-3 py-1.5 text-center text-base">
        {productName} {price?.option && price.option}
      </td>
      <td className="py-1.5 text-center text-base">
        ₹ {price && price?.price && price.price}
      </td>
      <td className="py-1.5 text-center text-base">{productQuantity}</td>
      <td className="py-1.5 text-center text-base">₹ {productAmount}</td>
    </tr>
  );
}

export default SeeProduct;
