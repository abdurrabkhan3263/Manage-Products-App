import React, { useState } from "react";
import { Add, Remove, Delete } from "../../../../public/Assets";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, removeProduct } from "../../../store/slice";

function ProductTableRow({ proData }) {
  const [inputValue, setInputValue] = useState(proData?.productQuantity || 1);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  function valueUpdate(value) {
    dispatch(
      editProduct({
        $id: proData.$id,
        productPrice: value * proData.productAmount,
        productQuantity: value,
      }),
    );
  }
  const handleQuantity = (e) => {
    const value = parseInt(e.target.value, 10);
    if (e.target.value.trim() === "" || isNaN(e.target.value)) return;
    setInputValue(value);
    valueUpdate(value);
  };
  const handleProAdd = () => {
    const newQuantity = inputValue + 1;
    setInputValue(newQuantity);
    valueUpdate(newQuantity);
  };
  const handleProRemove = () => {
    if (inputValue <= 1) return;
    const newQuantity = inputValue - 1;
    setInputValue(newQuantity);
    valueUpdate(newQuantity);
  };
  return (
    <>
      <td className="flex justify-center py-7">
        <img
          src="https://images.unsplash.com/photo-1716881763995-097b7a68ea3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
          alt="product_image"
          className="w-24 rounded-md"
        />
      </td>
      <td>{proData?.productName || ""}</td>
      <td>₹ {proData?.productAmount || 1}</td>
      <td>
        <div className="flex border-collapse items-center justify-center">
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center border-b border-l border-t border-gray-400 bg-[#002147] text-white">
            <span onClick={handleProAdd}>
              <Add />
            </span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center border-b border-l border-t border-gray-400">
            <input
              type="text"
              className="h-full w-full border-none text-center outline-none"
              value={inputValue}
              onChange={handleQuantity}
            />
          </div>
          <div className="flex h-10 w-10 cursor-pointer items-center justify-center border border-gray-400 bg-gray-200">
            <span onClick={handleProRemove}>
              <Remove />
            </span>
          </div>
        </div>
      </td>

      <td>
        <div className="flex items-center justify-between gap-4">
          <span></span>
          <span>₹ {proData?.productAmount * inputValue}</span>
          <span
            className="cursor-pointer pr-12"
            onClick={() => dispatch(removeProduct(proData.$id))}
          >
            <Delete />
          </span>
        </div>
      </td>
    </>
  );
}

export default ProductTableRow;
