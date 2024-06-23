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
import { useSelector } from "react-redux";
import useGenerateUniqueId from "../../Hook/useGenerateUniqueId";
import { toastFunction } from "../../utils/toastFunction";

function AddProduct({ productData }) {
  const [priceData, setPriceData] = useState({
    isCheck: false,
    optionCount: 1,
    productPriceOption: [],
  });
  const [productImage, setProductImage] = useState(
    productData?.productImage || "",
  );
  const { handleSubmit, register, setValue, getValues } = useForm({
    defaultValues: {
      productName: productData?.productName || "",
      productPrice: productData?.productPrice || "",
      productPriceOption: [],
    },
  });
  const [isError, setError] = useState({ status: false, message: "" });
  const currentUser = useSelector((state) => state.user?.user);
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
      setValue("isOption", true);
    } else {
      setValue("isOption", false);
      setValue("productPriceOption", "");
      setValue("productPrice", priceData.productPrice || "");
    }
  }, [priceData.isCheck]);
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
      data.userId = currentUser.$id;
      return await databaseService.createProductDetails({ ...data });
    },
    onError: (error) => {
      setError({ status: true, message: error.message });
    },
    onSuccess: () => {
      navigate(location.state);
      queryClient.invalidateQueries({ queryKey: ["productList"] });
      toastFunction({
        type: "success",
        message: "Product Added SuccessFully",
      });
    },
  });
  const mutationforUpdate = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async (data) => {
      data.userId = currentUser.$id;
      return await databaseService.updateProductDetails(id, { ...data });
    },
    onError: (error) => {
      setError({ status: true, message: error.message });
    },
    onSuccess: () => {
      navigate(location.state);
      queryClient.invalidateQueries({ queryKey: ["productList"] });
      toastFunction({
        type: "success",
        message: "Product Updated SuccessFully",
      });
    },
  });
  const formSubmit = async (data) => {
    data.productPrice = parseFloat(data.productPrice || "");
    data.productPriceOption = JSON.stringify(data.productPriceOption);

    const handleUploadImage = async (newImage) => {
      if (!newImage) return "";
      const imageFile = await databaseService.addProductImg(newImage);
      if (!imageFile) return "";
      const imageUrl = databaseService.getProductImgForPreview(imageFile.$id);
      return { url: imageUrl.href, file: imageFile.$id };
    };

    const updateImage = async (newImage, oldImage) => {
      if (!newImage) return "";
      const imageFile = await handleUploadImage(newImage);
      if (!imageFile) return "";
      await databaseService.deleteProductImg(oldImage);
      return imageFile;
    };

    let imageData;
    if (id) {
      imageData = await updateImage(
        data?.productImage[0],
        productData?.productImageId,
      );
      data.productImageId = imageData.file;
      data.productImage = imageData.url;
      mutationforUpdate.mutate({ ...data });
    } else {
      const newImage = data?.productImage[0];
      imageData = await handleUploadImage(newImage);
      data.productImageId = imageData.file || "";
      data.productImage = imageData.url || "";
      mutation.mutate({ ...data });
    }
  };
  if (isError.status) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
        <div className="w-[60%]">
          <img src={add__product__error} alt="error" />
          <p className="text-center text-xl font-semibold text-red-500">
            {isError.message}
          </p>
        </div>
        <Button
          onClick={() => setError({ status: false, message: "" })}
          className={"bg-red-500 px-8 py-0.5 text-white"}
        >
          Retry
        </Button>
      </div>
    );
  }
  return (
    <div className="relative h-full w-full overflow-hidden overflow-x-scroll">
      {mutation.isPending || mutationforUpdate.isPending ? (
        <div className="flex h-full w-full items-center justify-center">
          <p>Product Adding........</p>
        </div>
      ) : (
        <form className="h-full" onSubmit={handleSubmit(formSubmit)}>
          <div className="h-[92%] overflow-hidden overflow-y-scroll">
            <div
              ref={addImg}
              className="relative ml-2.5 flex h-[280px] w-[280px] cursor-pointer select-none flex-col items-center justify-center gap-y-1 overflow-hidden rounded-xl bg-darkblue text-white"
            >
              <div className="relative z-10 flex flex-col items-center justify-center">
                <span className="peer text-3xl transition-all" ref={uploadIcon}>
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
                className="peer absolute z-10 h-full w-full opacity-0"
                onChange={handleProductImage}
              />
              <div className="absolute z-0 h-full w-full overflow-hidden">
                {productImage && (
                  <img
                    src={productImage}
                    className="h-full w-full object-cover"
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
                className="my-3 w-full rounded-md border-none bg-lightgray px-3 py-3 font-medium outline-none"
              />
            </div>
            <div>
              <label className="ml-2.5 flex items-center justify-between">
                <span className="select-none text-lg font-medium text-gray-900">
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
                  className="peer sr-only"
                />
                <div
                  className={`peer relative h-8 w-[65px] cursor-pointer rounded-full bg-gray-200 after:absolute after:left-[4px] after:top-[2px] after:h-7 after:w-7 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700`}
                ></div>
              </label>
            </div>
            <div className="my-3 h-12 w-full pl-2.5">
              {priceData.isCheck ? (
                <div>
                  <div
                    className={`flex w-full ${
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
                        className="flex items-center justify-center gap-x-2.5 rounded-md bg-darkblue px-4 py-1 text-xl text-white"
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
                      className="flex items-center justify-center gap-x-2.5 rounded-md bg-darkblue px-4 py-1 text-xl text-white"
                    >
                      Add
                      <span>
                        <Add />
                      </span>
                    </button>
                  </div>
                  <div className="my-3">
                    {Array.from({ length: priceData.optionCount }, (_, i) => {
                      let idd = useGenerateUniqueId();
                      setValue(`productPriceOption[${i}.opId]`, idd);
                      return (
                        <div key={i} className="my-3 flex justify-between">
                          <input
                            type="text"
                            required={true}
                            placeholder="Enter Option"
                            {...register(`productPriceOption[${i}].name`, {
                              required: true,
                            })}
                            className="rounded-md border-none bg-lightgray px-2 py-2 font-medium outline-none"
                          />
                          <input
                            type="text"
                            required={true}
                            placeholder="Enter Price"
                            className="rounded-md border-none bg-lightgray px-2 py-1.5 outline-none"
                            {...register(`productPriceOption[${i}].price`, {
                              required: true,
                              validate: {
                                matchPattern: (value) =>
                                  /^[0-9]+\.?[0-9]*$|^[0-9]*\.?[0-9]+$/.test(
                                    value,
                                  ),
                              },
                            })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex w-full justify-end">
                  <input
                    type="text"
                    required={true}
                    placeholder="Enter Price"
                    {...register("productPrice", {
                      required: true,
                      validate: {
                        matchPattern: (value) =>
                          /^[0-9]+\.?[0-9]*$|^[0-9]*\.?[0-9]+$/.test(value),
                      },
                    })}
                    className="rounded-md border-none bg-lightgray px-2 py-1.5 outline-none"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 mt-5 flex w-full justify-end px-2.5">
            <Button
              className={
                "flex items-center justify-center bg-lightblue px-8 py-1 text-white transition-all hover:bg-darkblue"
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
