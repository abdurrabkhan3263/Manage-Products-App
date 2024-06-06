import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import ProductCard from "../Component/Card/ProductCard";
import { Button } from "../Component/UI";
import { Add, no__data } from "../../public/Assets";
import "../index.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../appwrite";

function Products() {
  const currentUser = useSelector((state) => state.user?.user);
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("addproduct", { state: "/products" });
  };
  const productDataList = useQuery({
    queryKey: ["productList"],
    queryFn: async () => {
      const response = await databaseService.getProductList([
        Query.equal("userId", currentUser.$id),
      ]);
      if (response) {
        return response.documents;
      }
    },
    retry: 3,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
  return (
    <Container className={"relative"}>
      <div className="h-full w-full">
        <Outlet />
        <div className="flex h-[5%] w-full justify-end">
          <Button
            type={"button"}
            className={"flex items-center bg-blue-600 px-4 py-1 text-white"}
            onClick={handleAddProduct}
          >
            <Add /> Add Product
          </Button>
        </div>
        {productDataList.isLoading && (
          <div className="flex h-[95%] w-full items-center justify-center bg-blue-500 text-5xl text-white">
            Loading.....
          </div>
        )}
        {productDataList.isError && (
          <div className="flex h-[95%] w-full flex-col items-center justify-center gap-y-4">
            <p className="text-2xl font-bold text-red-500">
              {productDataList.error.message}
            </p>
            <Button
              className={
                "bg-lightblue px-6 py-1 text-white duration-300 hover:bg-darkblue"
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
          <div className="grid h-[95%] w-full gap-10 overflow-y-scroll scroll-smooth py-4 sm:grid-cols-3 lg:grid-cols-4">
            {productDataList.data.length <= 0 ? (
              <div className="col-start-1 col-end-5 flex flex-col items-center justify-center">
                <div className="h-[36%] w-[36%] text-center">
                  <img
                    src={no__data}
                    alt="no__data"
                    className="h-full w-full object-contain"
                  />
                  <p className="mt-2 select-none text-[26px] font-semibold text-red-500">
                    No Product Available
                  </p>
                </div>
              </div>
            ) : (
              productDataList.data.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="h-max select-none overflow-hidden rounded-lg shadow-2xl"
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
