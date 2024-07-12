import React, { useState, useEffect, useMemo } from "react";
import { Button, Input, Select } from "../UI/index";
import { useForm } from "react-hook-form";
import { Delete, Edit, image__not__available } from "../../../public/Assets";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataDelete } from "../index";
import { databaseService } from "../../appwrite";
import { addProduct } from "../../store/thunkFile";
import { toastFunction } from "../../utils/toastFunction";
import AddButton from "../../Assets/AddButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    opId: "",
  });
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      productQuantity: 1,
      productAmount: priceData?.productPrice,
    },
  });
  const navigate = useNavigate();
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
      productPrice:
        parsedData && parsedData.length > 0
          ? parseFloat(parsedData[0]?.price)
          : productPrice,
      opId: parsedData ? parsedData[0]?.opId : "",
    }));
  }, [productPriceOption, productPrice]);
  const handleProductQuantity = (e) => {
    const productQuan = parseInt(e.target.value);
    if (productQuan <= 1) {
      setValue("productQuantity", 1);
    }
    setQuantity(productQuan);
    setPriceData((prev) => ({ ...prev, quantity: e.target.value }));
  };
  const handleSelect = (e) => {
    let selectData = e.target.value.split(",");
    setPriceData((prev) => ({
      ...prev,
      option: selectData[1],
      productPrice: selectData[0],
      opId: selectData[2],
    }));
  };
  const handleProductEdit = () => {
    navigate(`editproduct/${$id}`, { state: "/products" });
  };
  const handleProductShowDelete = () => {
    setShowDelete((prev) => !prev);
  };
  const optionMemo = useMemo(
    () => priceData.productOptionData,
    [priceData.productOptionData],
  );
  const handleFormSubmit = async (data) => {
    dispatch(
      addProduct({
        ...data,
        ...productData,
        $id: productData.isOption ? priceData.opId : productData.$id,
        productPriceOption: JSON.stringify({
          option: priceData.option,
          price: priceData.productPrice,
        }),
        productPrice: parseFloat(priceData.productPrice),
        productQuantity: parseInt(priceData.quantity),
      }),
    );
    toastFunction({
      type: "success",
      message: "Product is Added Successfully",
    });
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id) => {
      return await databaseService.deleteProduct(id);
    },
    onSuccess: () => {
      setShowDelete(false);
      queryClient.invalidateQueries({
        queryKey: ["productList"],
      });
      toastFunction({
        type: "success",
        message: "Deleted SuccessFully",
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleProductDelete = async () => {
    if (!$id) return;
    deleteMutation.mutate($id);
    if (!productImageId) return;
    await databaseService.deleteProductImg(productImageId);
  };

  useEffect(() => {
    if (confirm) {
      handleProductDelete();
    }
  }, [confirm]);

  return (
    <div className="w-full">
      <DataDelete
        showDelete={showDelete}
        setShowDelete={setShowDelete}
        confirm={confirm}
        setConfirm={setConfirm}
        deletionLoader={deleteMutation.isPending}
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
          onClick={handleProductShowDelete}
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
      <div className="mb-3 mt-4 h-max px-4">
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
              type="text"
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
          <div className="flex w-full justify-end pb-[0.3rem] pt-4">
            <AddButton type={"submit"}>
              <span className="IconContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  fill="#FEFEFA"
                  className="cart"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                </svg>
              </span>
              <p className="text">Add to Cart</p>
            </AddButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductCard;
