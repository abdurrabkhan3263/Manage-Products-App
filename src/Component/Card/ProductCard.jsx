import React, { useState, useEffect } from "react";
import { Button, Input, Select } from "../UI/index";
import { useForm } from "react-hook-form";
import { Delete, Edit } from "../../../public/Assets";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showDeleteSection } from "../../store/slice";

function ProductCard({ productData }) {
  const { $id, productName, productImage, productPrice, productPriceOption } =
    productData;
  const [priceAndOption, setPriceAndOption] = useState(
    productPriceOption[0]?.price || productPrice
  );
  const [option, setOption] = useState(productPriceOption[0]?.name);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      productQuantity: 1,
      productAmount: priceAndOption,
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (quantity <= 0) {
      return;
    }
    productPrice
      ? setValue("productAmount", quantity * productPrice)
      : setValue("productAmount", quantity * priceAndOption);
  }, [priceAndOption, productPrice, quantity, setValue]);
  const handleProductQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const handleSelect = (e) => {
    let selectData = e.target.value.split(",");
    setOption(selectData[1]);
    setPriceAndOption(selectData[0]);
  };
  const handleProductEdit = () => {
    navigate(`editproduct/${$id}`, { state: "/products" });
  };
  const handleFormSubmit = (data) => {
    data.productName = productName;
    data.productPriceOption = { name: option, price: priceAndOption };
    alert(JSON.stringify(data));
  };
  const handleProductDelete = () => {
    dispatch(showDeleteSection({ id: 555, showDelete: true }));
  };
  return (
    <div className="w-full">
      <div className="relative">
        <Outlet />
      </div>
      <div className=" bg-green-400 relative">
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
          src={productImage && productImage}
          alt="productImage"
          className="h-48 w-full object-cover rounded-lg"
        />
        {/* Here Changes Occurs When DB Add */}
      </div>
      <div className="h-max mb-3 px-3">
        <h1 className="text-[22px] text-lightblue font-bold ">
          {productName && productName}
        </h1>
        {/* Here Changes Occurs When DB Add */}
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
            {productPriceOption && (
              <Select
                className={"px-8 py-1.5 rounded-md"}
                option={productPriceOption}
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
