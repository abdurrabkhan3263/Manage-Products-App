import React, { useState, useEffect } from "react";
import Container from "../Container/Container";
import ProductCard from "../Component/Card/ProductCard";
import { Button } from "../Component/UI";
import { Add } from "../../public/Assets";
import "../index.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../appwrite";
import { Loader, NoDataAvailable } from "../Assets";
import AddButton from "../Assets/AddButton";

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
    enabled: true,
    retry: 3,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
  return (
    <Container className={"relative"}>
      <div className="h-full w-full">
        <Outlet />
        <div className="flex w-full justify-end">
          <AddButton type={"submit"} onClick={handleAddProduct}>
            <span className={`IconContainer text-[22px] text-[#FEFEFA]`}>
              <Add />
            </span>
            <p className="text">Add Product</p>
          </AddButton>
        </div>
        {productDataList.isLoading && (
          <div className="flex h-[95%] w-full items-center justify-center text-5xl text-white">
            <Loader />
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
              <NoDataAvailable
                className={
                  "flex items-center justify-center sm:col-span-3 lg:col-span-4"
                }
                imageClassName={"h-[53%] w-[53%]"}
              />
            ) : (
              productDataList.data.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="h-max select-none overflow-hidden rounded-2xl border py-1 shadow-xl duration-100 ease-in hover:shadow-2xl"
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
