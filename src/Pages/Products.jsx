import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import ProductCard from "../Component/Card/ProductCard";
import { Button } from "../Component/UI";
import { Add, no__data } from "../../public/Assets";
import "../index.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DataDelete from "../Component/Delete/DataDelete";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../appwrite";

function Products() {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const navigate = useNavigate();
  const handleAddProduct = () => {
    setIsAddProduct((prev) => !prev);
    navigate("addproduct", { state: "/products" });
  };
  const productDataList = useQuery({
    queryKey: ["productList"],
    queryFn: async () => {
      const response = await databaseService.getProductList();
      if (response) {
        return response.documents;
      }
    },
    retry: 0,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
  return (
    <Container className={"relative"}>
      <div className="w-full h-full">
        <Outlet />
        <div className="w-full flex justify-end h-[5%]">
          <Button
            type={"button"}
            className={"flex items-center px-4 py-1 text-white bg-blue-600 "}
            onClick={handleAddProduct}
          >
            <Add /> Add Product
          </Button>
        </div>
        {productDataList.isLoading && (
          <div className="h-[95%] flex justify-center items-center w-full bg-blue-500 text-5xl text-white">
            Loading.....
          </div>
        )}
        {productDataList.isError && (
          <div className="w-full h-[95%] gap-y-4 flex flex-col justify-center items-center">
            <p className="text-2xl font-bold text-red-500">
              {productDataList.error.message}
            </p>
            <Button
              className={
                "bg-lightblue duration-300 hover:bg-darkblue text-white px-6 py-1"
              }
              onClick={() => {
                productDataList.refetch();
              }}
            >
              Retry
            </Button>
          </div>
        )}
        {productDataList?.data && (
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-10 w-full h-[95%] overflow-y-scroll py-4 scroll-smooth">
            {productDataList.data.length <= 0 ? (
              <div className=" col-start-1 col-end-5 flex flex-col justify-center items-center">
                <div className="h-[36%] w-[36%] text-center">
                  <img
                    src={no__data}
                    alt="no__data"
                    className="h-full w-full object-contain"
                  />
                  <p className="text-[26px] select-none text-red-500 mt-2 font-semibold">
                    No Product Available
                  </p>
                </div>
              </div>
            ) : (
              productDataList.data.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="h-max rounded-lg overflow-hidden shadow-2xl select-none"
                  >
                    <ProductCard productData={data} />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Products;
