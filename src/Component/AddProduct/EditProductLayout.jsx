import React, { useState, useEffect } from "react";
import { Xcross } from "../../../public/Assets";
import AddProduct from "./AddProduct";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditProductLayout({ className }) {
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const proData = [
    {
      $id: 1,
      productName: "round white watch with white band",
      productImage:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: 2343,
      productPriceOption: "",
    },
    {
      $id: 2,
      productName: "flatlay photography of wireless headphones",
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: 134,
      productPriceOption: "",
    },
    {
      $id: 3,
      productName:
        "white and black Polaroid One Step 2 instant camera on white board",
      productImage:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: "",
      productPriceOption: [
        { name: "Height 200", price: 14 },
        { name: "Height 400", price: 2344 },
        { name: "Height 500", price: 22 },
        { name: "Height 600", price: 1343 },
      ],
    },
    {
      $id: 4,
      productName: "sunglasses beside a purse",
      productImage:
        "https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: "",
      productPriceOption: [
        { name: "Height 400", price: 900 },
        { name: "Height 900", price: 1000 },
      ],
    },
    {
      $id: 5,
      productName: "white corded headphones",
      productImage:
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: 122,
      productPriceOption: "",
    },
    {
      $id: 6,
      productName: "white Sony PS4 Original with controller",
      productImage:
        "https://images.unsplash.com/photo-1486401899868-0e435ed85128?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: "",
      productPriceOption: [
        { name: "Width 400", price: 111 },
        { name: "Width 900", price: 122 },
        { name: "Width 100", price: 212 },
        { name: "Width 400", price: 221 },
      ],
    },
    {
      $id: 7,
      productName: "Stockholms Branneri bottle",
      productImage:
        "https://images.unsplash.com/photo-1530914547840-346c183410de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: 444,
      productPriceOption: "",
    },
    {
      $id: 8,
      productName: "white and black usb flash drive",
      productImage:
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1953&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: "",
      productPriceOption: [
        { name: "Width 500", price: 444 },
        { name: "Width 100", price: 2234 },
        { name: "Width 900", price: 543 },
      ],
    },
    {
      $id: 9,
      productName: "person holding round black analog watch",
      productImage:
        "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: 900,
      productPriceOption: "",
    },
    {
      $id: 10,
      productName: "person holding round black analog watch",
      productImage:
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      productPrice: "",
      productPriceOption: [
        { name: "Length 400", price: 111 },
        { name: "Length 900", price: 434 },
        { name: "Length 200", price: 645 },
        { name: "Length 200", price: 899 },
      ],
    },
  ];
  useEffect(() => {
    let db = proData.filter((data) => data.$id == id);
    setProductData(...db);
  }, [id]);
  return (
    <div
      className={`absolute w-[32%]  ${className} z-50  h-3/4 rounded-2xl bg-white shadow-2xl right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 overflow-hidden`}
    >
      <div
        className="p-1.5 text-4xl text-lightblue cursor-pointer inline-block"
        onClick={() => {
          navigate(location.state);
        }}
      >
        <Xcross />
      </div>
      <div className="w-full h-[92%]">
        {productData && <AddProduct productData={productData} />}
      </div>
    </div>
  );
}

export default EditProductLayout;
