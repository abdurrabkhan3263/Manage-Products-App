import React, { useRef, useState, useEffect } from "react";
import {
  Add,
  Remove,
  Upload,
  add__product__error,
} from "../../../public/Assets";
import { useForm } from "react-hook-form";
import { Button } from "../UI/index";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { databaseService } from "../../appwrite";

function AddProduct({ productData }) {
  const [priceData, setPriceData] = useState({
    isCheck: false,
    optionCount: 1,
    productPriceOption: [],
  });
  const [productImage, setProductImage] = useState(
    productData?.productImage || ""
  );
  const { handleSubmit, register, setValue, getValues } = useForm({
    defaultValues: {
      productName: productData?.productName || "",
      productPrice: productData?.productPrice || "",
      productPriceOption: [],
    },
  });
  const [isError, setError] = useState({ status: false, message: "" });
  const addImg = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const uploadIcon = useRef();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const handleProductImage = (e) => {
    if (e.target.files[0]) {
      setProductImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setProductImage("");
    }
  };
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
    if (priceData.isCheck) {
      setValue("productPrice", "");
    } else {
      setValue("productPriceOption", "");
      setValue("productPrice", priceData.productPrice || "");
    }
  }, [priceData.isCheck, priceData.productPrice, setValue]);
  useEffect(() => {
    const parsedData = JSON.parse(productData?.productPriceOption || "[]");
    setPriceData((prev) => ({
      ...prev,
      isCheck: parsedData.length > 0,
      optionCount: parsedData.length || 1,
      productPriceOption: parsedData,
    }));
    setValue("productName", productData?.productName || "");
    setValue("productPrice", productData?.productPrice || "");
    setValue("productPriceOption", parsedData);
  }, [productData]);
  const mutation = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async (data) => {
      return await databaseService.createProductDetails({ ...data });
    },
    onError: (error) => {
      setError({ status: true, message: error.message });
    },
    onSuccess: () => {
      navigate(location.state);
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });
  const mutationforUpdate = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async (data) => {
      return await databaseService.updateProductDetails(id, { ...data });
    },
    onError: (error) => {
      setError({ status: true, message: error.message });
    },
    onSuccess: () => {
      navigate(location.state);
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });
  const formSubmit = async (data) => {
    data.productPrice = parseFloat(data.productPrice);
    data.productPriceOption = JSON.stringify(data.productPriceOption);

    const handleUploadImage = async (newImage) => {
      if (!newImage) return null;
      const imageFile = await databaseService.addProductImg(newImage);
      if (!imageFile) return null;
      const imageUrl = databaseService.getProductImgForPreview(imageFile.$id);
      return { url: imageUrl.href, file: imageFile.$id };
    };

    const updateImage = async (newImage, oldImage) => {
      if (!newImage) return null;
      const imageFile = await handleUploadImage(newImage);
      if (!imageFile) return null;
      await databaseService.deleteProductImg(oldImage);
      return imageFile;
    };
    let imageData;
    if (id) {
      const newImage = data.productImage[0];
      const oldImage = data.productImageId;
      imageData = await updateImage(newImage, oldImage);
      if (imageData) {
        data.productImageId = imageData.file;
        data.productImage = imageData.url;
      } else {
        data.productImage = "";
      }
      mutationforUpdate.mutate({ ...data });
    } else {
      const newImage = data.productImage[0];
      imageData = await handleUploadImage(newImage);
      if (imageData) {
        data.productImageId = imageData.file;
        data.productImage = imageData.url;
      } else {
        data.productImage = "";
      }
      mutation.mutate({ ...data });
    }
  };
  if (isError.status) {
    return (
      <div className="w-full h-full flex flex-col gap-y-3 justify-center items-center">
        <div className="w-[60%]">
          <img src={add__product__error} alt="error" />
          <p className="text-xl font-semibold text-center text-red-500">
            {isError.message}
          </p>
        </div>
        <Button
          onClick={() => setError({ status: false, message: "" })}
          className={"px-8 py-0.5 bg-red-500 text-white"}
        >
          Retry
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full h-full overflow-hidden overflow-x-scroll relative">
      {mutation.isPending || mutationforUpdate.isPending ? (
        <div className="h-full w-full flex justify-center items-center">
          <p>Product Adding........</p>
        </div>
      ) : (
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
                accept="image/png,image/jpeg,image/jpg"
                {...register("productImage")}
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
                  value={priceData.isCheck}
                  onChange={() =>
                    setPriceData((prev) => ({
                      ...prev,
                      isCheck: !prev.isCheck,
                    }))
                  }
                  checked={priceData.isCheck}
                  className="sr-only peer"
                />
                <div
                  className={`w-[65px] relative h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full cursor-pointer peer-checked:bg-blue-600 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all`}
                ></div>
              </label>
            </div>
            <div className="w-full h-12 my-3 pl-2.5">
              {priceData.isCheck ? (
                <div>
                  <div
                    className={`w-full flex ${
                      priceData.optionCount > 1
                        ? "justify-between"
                        : "justify-end"
                    }`}
                  >
                    {priceData?.optionCount > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setPriceData((prev) => ({
                            ...prev,
                            optionCount: prev.optionCount - 1,
                          }));
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
                      onClick={() => {
                        setPriceData((prev) => ({
                          ...prev,
                          optionCount: prev.optionCount + 1,
                        }));
                      }}
                      className="px-4 py-1 bg-darkblue text-white flex gap-x-2.5 rounded-md items-center text-xl justify-center"
                    >
                      Add{" "}
                      <span>
                        <Add />
                      </span>
                    </button>
                  </div>
                  <div className="my-3">
                    {Array.from({ length: priceData.optionCount }, (_, i) => (
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
                              matchPattern: (value) =>
                                /^[0-9]+\.?[0-9]*$|^[0-9]*\.?[0-9]+$/.test(
                                  value
                                ),
                            },
                          })}
                          type="number"
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
                    type="number"
                    required={true}
                    placeholder="Enter Price"
                    {...register("productPrice", {
                      required: true,
                      validate: {
                        matchPattern: (value) =>
                          /^[0-9]+\.?[0-9]*$|^[0-9]*\.?[0-9]+$/.test(value),
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
      )}
    </div>
  );
}

export default AddProduct;
