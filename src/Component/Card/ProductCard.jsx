import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Select } from "../UI/index";
import { useForm } from "react-hook-form";
import { Delete, Edit, image__not__available } from "../../../public/Assets";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataDelete } from "../index";
import { databaseService } from "../../appwrite";
import { addProduct } from "../../store/slice";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ProductCard({ productData }) {
  const {
    $id,
    productName,
    productImage,
    productImageId,
    productPrice,
    productPriceOption,
  } = productData;
  const [priceData, setPriceData] = useState({
    quantity: 1,
    productPrice: productPrice,
    option: "",
    productOptionData: [],
  });
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [deleteData, setDeleteData] = useState({
    isShow: false,
    deleteFun: databaseService.deleteProduct,
    mainId: $id,
    imgId: productImageId,
  });
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      productQuantity: 1,
      productAmount: priceData?.productPrice,
    },
  });
  const [cartAddPopUp, setCartAddPopUp] = useState(false);
  const navigate = useNavigate();
  const handleProductQuantity = (e) => {
    setQuantity(e.target.value);
    setPriceData((prev) => ({ ...prev, quantity: e.target.value }));
  };
  const handleSelect = (e) => {
    let selectData = e.target.value.split(",");
    setPriceData((prev) => ({
      ...prev,
      option: selectData[1],
      productPrice: selectData[0],
    }));
  };
  const handleProductEdit = () => {
    navigate(`editproduct/${$id}`, { state: "/products" });
  };
  const handleProductDelete = () => {
    setDeleteData((prev) => ({ ...prev, isShow: true }));
  };
  useEffect(() => {
    if (quantity <= 0) {
      return;
    }
    productPrice
      ? setValue("productAmount", quantity * productPrice)
      : setValue("productAmount", quantity * priceData.productPrice);
  }, [priceData.productPrice, productPrice, quantity]);
  useEffect(() => {
    const parsedData = JSON.parse(productPriceOption);
    setPriceData((prev) => ({
      ...prev,
      option: parsedData ? parsedData[0]?.name : "",
      productOptionData: parsedData || [],
      productPrice: parsedData
        ? parseFloat(parsedData[0]?.price)
        : productPrice,
    }));
  }, [productPriceOption, productPrice]);
  const optionMemo = useMemo(
    () => priceData.productOptionData,
    [priceData.productOptionData],
  );
  const handleFormSubmit = (data) => {
    data.id = productData.$id;
    data.productName = productName;
    data.productPriceOption = {
      name: priceData.option,
      price: priceData.productPrice,
    };
    dispatch(addProduct(data));
    setCartAddPopUp(true);
  };

  const popUp = useRef();
  useGSAP(() => {
    if (cartAddPopUp) {
      gsap.to(popUp.current, {
        y: -65,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(popUp.current, {
            y: 0,
            delay: 0.3,
            ease: "power2.out",
          });
        },
      });
      setCartAddPopUp(false);
    }
  }, [cartData]);
  return (
    <div className="w-full">
      <span
        ref={popUp}
        className="absolute -bottom-12 right-[56%] z-[90] translate-x-1/2 rounded-full bg-darkblue px-6 py-2 font-semibold text-white"
      >
        Product Is Added Successfully
      </span>
      <DataDelete
        deleteData={deleteData}
        setDeleteData={setDeleteData}
        key={"productList"}
      />
      <div className="relative">
        <Outlet />
      </div>
      <div className="relative">
        <div
          onClick={handleProductEdit}
          className="absolute right-0 top-0 flex cursor-pointer items-center justify-center rounded-full p-3 text-[26px]"
        >
          <Edit />
        </div>
        <div
          onClick={handleProductDelete}
          className="absolute left-0 top-0 flex cursor-pointer items-center justify-center rounded-full p-3 text-[26px]"
        >
          <Delete />
        </div>
        <img
          src={productImage || image__not__available}
          alt="productImage"
          className="h-[250px] w-full rounded-lg object-cover"
        />
      </div>
      <div className="mb-3 h-max px-3">
        <h1 className="text-[22px] font-bold text-lightblue">
          {productName && productName}
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-2 flex w-full justify-between">
            <Input
              type="number"
              {...register("productQuantity")}
              label="Quantity"
              onChange={handleProductQuantity}
              className={"border border-black"}
            />
            <Input
              type="number"
              {...register("productAmount")}
              label="Amount"
              className={"border border-black"}
            />
          </div>
          <div className="mt-5">
            {optionMemo.length > 0 && (
              <Select
                className={"rounded-md px-8 py-1.5"}
                option={optionMemo}
                onChange={handleSelect}
              />
            )}
          </div>
          <div className="flex w-full justify-end">
            <Button
              type={"submit"}
              className={"mt-5 bg-darkblue px-16 py-1 text-white"}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductCard;
