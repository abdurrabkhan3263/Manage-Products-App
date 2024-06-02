import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Select } from "../UI/index";
import { useForm } from "react-hook-form";
import { Delete, Edit, image__not__available } from "../../../public/Assets";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DataDelete } from "../index";
import { databaseService } from "../../appwrite";

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
    option: null,
    productOptionData: [],
  });
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      productQuantity: 1,
      productAmount: priceData?.productPrice,
    },
  });
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
      productPrice: parseInt(selectData[0]),
    }));
  };
  const handleProductEdit = () => {
    navigate(`editproduct/${$id}`, { state: "/products" });
  };
  const handleFormSubmit = (data) => {
    data.productName = productName;
    data.productPriceOption = {
      name: priceData.option,
      price: priceData.productPrice,
    };
    alert(JSON.stringify(data));
  };
  const handleProductDelete = () => {
    setIsShowDelete(true);
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
      option: parsedData ? parsedData[0]?.name : null,
      productOptionData: parsedData || [],
      productPrice: parsedData ? parseInt(parsedData[0]?.price) : productPrice,
    }));
  }, [productPriceOption, productPrice]);
  const optionMemo = useMemo(
    () => priceData.productOptionData,
    [priceData.productOptionData]
  );
  return (
    <div className="w-full">
      <DataDelete
        isShowDel={isShowDelete}
        setIsShow={setIsShowDelete}
        fileDetails={{
          deleteFun: databaseService.deleteProduct,
          productId: $id,
          imgId: productImageId,
        }}
      />
      <div className="relative">
        <Outlet />
      </div>
      <div className=" relative">
        <div
          onClick={handleProductEdit}
          className="flex justify-center items-center p-3  text-[26px] cursor-pointer rounded-full absolute right-0 top-0"
        >
          <Edit />
        </div>
        <div
          onClick={handleProductDelete}
          className="flex justify-center items-center p-3  text-[26px] cursor-pointer rounded-full absolute left-0 top-0"
        >
          <Delete />
        </div>
        <img
          src={productImage || image__not__available}
          alt="productImage"
          className="h-[250px] w-full object-cover rounded-lg"
        />
      </div>
      <div className="h-max mb-3 px-3">
        <h1 className="text-[22px] text-lightblue font-bold ">
          {productName && productName}
        </h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="w-full flex justify-between mt-2">
            <Input
              type="number"
              {...register("productQuantity")}
              label="Quantity"
              onChange={handleProductQuantity}
            />
            <Input
              type="number"
              {...register("productAmount")}
              label="Amount"
            />
          </div>
          <div className="mt-5">
            {optionMemo.length > 0 && (
              <Select
                className={"px-8 py-1.5 rounded-md"}
                option={optionMemo}
                onChange={handleSelect}
              />
            )}
          </div>
          <div className="flex justify-end w-full">
            <Button
              type={"submit"}
              className={" px-16 py-1 mt-5 bg-darkblue text-white"}
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
