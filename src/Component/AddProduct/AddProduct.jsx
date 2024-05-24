import React, { useRef, useState, useEffect } from "react";
import { Add, Remove, Upload } from "../../../public/Assets";
import { useForm } from "react-hook-form";
import { Button } from "../UI/index";

function AddProduct({ productData }) {
  const [productImage, setProductImage] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [optionCount, setOptionCount] = useState(1);
  const { handleSubmit, register, setValue, getValues } = useForm();
  const addImg = useRef();
  const uploadIcon = useRef();
  const handleProductImage = (e) => {
    if (e.target.files[0]) {
      setProductImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setProductImage("");
    }
  };
  useEffect(() => {
    console.log(productData?.productName);
  }, [productData]);
  useEffect(() => {
    const handleMouseEnter = () => {
      uploadIcon.current.style.transform = `translateY(-4px)`;
    };
    const handleMouseLeave = () => {
      uploadIcon.current.style.transform = `translateY(0px)`;
    };
    addImg.current.addEventListener("mouseenter", handleMouseEnter);
    addImg.current.addEventListener("mouseleave", handleMouseLeave);
  }, []);

  useEffect(() => {
    if (isCheck) {
      setValue("productPrice", "");
    } else {
      setValue("productPriceOption", "");
    }
  }, [isCheck]);

  const formSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  return (
    <div className="w-full h-full overflow-hidden overflow-x-scroll relative">
      <form className="h-full" onSubmit={handleSubmit(formSubmit)}>
        <div className="h-[92%] overflow-hidden overflow-y-scroll">
          <div
            ref={addImg}
            className="ml-2.5 overflow-hidden rounded-xl w-[280px] h-[280px] text-white bg-darkblue flex justify-center cursor-pointer relative select-none items-center flex-col gap-y-1"
          >
            <div className="flex flex-col items-center relative z-10 justify-center">
              <span className="text-3xl peer transition-all" ref={uploadIcon}>
                <Upload />
              </span>
              <p className="text-xl font-semibold peer-hover:translate-x-2">
                {!productImage
                  ? "Upload Product Image"
                  : "Change Product Image"}
              </p>
            </div>
            <input
              type="file"
              required={true}
              accept="image/png,image/jpeg,image/jpg"
              {...register("productImage", { required: true })}
              className="absolute w-full h-full opacity-0 z-10 peer"
              onChange={handleProductImage}
            />
            <div className="absolute overflow-hidden h-full w-full z-0">
              {productImage && (
                <img
                  src={productImage}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="pl-2.5">
            <input
              type="text"
              required={true}
              placeholder="Enter Product Name"
              {...register("productName", { required: true })}
              className="outline-none border-none font-medium bg-lightgray w-full py-3 px-3 my-3 rounded-md"
            />
          </div>
          <div>
            <label className="flex justify-between items-center ml-2.5">
              <span className=" text-lg font-medium select-none text-gray-900">
                Do You Want To Add Price With Options ?
              </span>
              <input
                type="checkbox"
                value={isCheck}
                onChange={() => setIsCheck((prev) => !prev)}
                className="sr-only peer"
              />
              <div className="w-[65px] relative h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full cursor-pointer peer-checked:bg-blue-600 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all"></div>
            </label>
          </div>
          <div className="w-full h-12 my-3 pl-2.5">
            {isCheck ? (
              <div>
                <div
                  className={`w-full flex ${
                    optionCount > 1 ? "justify-between" : "justify-end"
                  }`}
                >
                  {optionCount > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setOptionCount((prev) => prev - 1);
                        let value = getValues("productPriceOption");
                        value.pop();
                      }}
                      className="px-4 py-1 bg-darkblue text-white flex gap-x-2.5 rounded-md items-center text-xl justify-center"
                    >
                      Remove{" "}
                      <span>
                        <Remove />
                      </span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setOptionCount((prev) => prev + 1)}
                    className="px-4 py-1 bg-darkblue text-white flex gap-x-2.5 rounded-md items-center text-xl justify-center"
                  >
                    Add{" "}
                    <span>
                      <Add />
                    </span>
                  </button>
                </div>
                <div className="my-3">
                  {Array.from({ length: optionCount }, (_, i) => (
                    <div key={i} className="flex justify-between my-3">
                      <input
                        type="text"
                        required={true}
                        placeholder="Enter Option"
                        {...register(`productPriceOption[${i}].name`, {
                          required: true,
                        })}
                        className="bg-lightgray outline-none border-none py-2 px-2 font-medium rounded-md"
                      />
                      <input
                        {...register(`productPriceOption[${i}].price`, {
                          required: true,
                          validate: {
                            matchPattern: (value) => /^[0-9]*$/.test(value),
                          },
                        })}
                        type="text"
                        required={true}
                        placeholder="Enter Price"
                        className="bg-lightgray outline-none border-none py-1.5 px-2 rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-end">
                <input
                  type="text"
                  required={true}
                  placeholder="Enter Price"
                  {...register("productPrice", {
                    required: true,
                    validate: {
                      matchPattern: (value) => /^[0-9]*$/.test(value),
                    },
                  })}
                  className="bg-lightgray outline-none border-none py-1.5 px-2 rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end mt-5 px-2.5 absolute bottom-0">
          <Button
            className={
              "bg-lightblue flex justify-center items-center hover:bg-darkblue transition-all text-white px-8 py-1"
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
