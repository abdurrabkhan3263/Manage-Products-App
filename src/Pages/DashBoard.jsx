import React, { lazy, Suspense } from "react";
import Container from "../Container/Container";
import { Button } from "../Component/UI/index";
import { Add } from "../../public/Assets";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MonthlySaleData,
  SaleChart,
  TopBuyer,
  ProductCategory,
} from "../Component/Dashboard Component";
import { dashBoardData } from "../appwrite";
import { useQuery } from "@tanstack/react-query";

function DashBoard() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user?.user);
  const handleAddProduct = () => {
    navigate("addproduct", { state: "/" });
  };
  const {
    data: { totalCustomer } = "",
    data: { yearlySell } = "",
    data: { sellToday } = "",
    data: { monthlySell } = "",
    data: { yearlySellByMonth } = "",
    data: { TopBuyingCustomer } = "",
    data: { productBySell } = "",
    isLoading,
  } = useQuery({
    queryKey: ["totalData"],
    queryFn: async () => await dashBoardData.allData(),
  });

  return (
    <Container>
      <div className="h-full">
        <Outlet />
        <div className="flex h-[10%] items-center justify-between">
          <div>
            <p className="text-lg font-medium">Welcome Back</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser?.name || ""}
            </h2>
          </div>
          <Button
            type={"button"}
            className={
              "hidden items-center bg-blue-600 px-4 py-1 text-white sm:flex"
            }
            onClick={handleAddProduct}
          >
            <Add /> Add Product
          </Button>
        </div>
        <div className="grid h-[90%] w-full grid-cols-[repeat(15,1fr)] grid-rows-[repeat(6,470px)] gap-x-4 gap-y-4 pt-4 sm:grid-rows-[repeat(15,1fr)] sm:pt-0">
          <div className="col-start-1 col-end-[16] row-start-1 row-end-3 w-full rounded-lg transition-shadow sm:col-end-7 sm:row-start-1 sm:row-end-8">
            {isLoading ? (
              <div className="grid h-full w-full grid-cols-1 grid-rows-4 gap-2.5 sm:grid-cols-2 sm:grid-rows-2">
                <div className="main__cart_loading animate-pulse rounded-lg bg-gray-400 px-3.5 py-5 text-white"></div>
                <div className="main__cart_loading animate-pulse rounded-lg bg-gray-400 px-3.5 py-5 text-white"></div>
                <div className="main__cart_loading animate-pulse rounded-lg bg-gray-400 px-3.5 py-5 text-white"></div>
                <div className="main__cart_loading animate-pulse rounded-lg bg-gray-400 px-3.5 py-5 text-white"></div>
              </div>
            ) : (
              <MonthlySaleData
                totalCustomer={totalCustomer}
                yearlySell={yearlySell}
                sellToday={sellToday}
                monthlySell={monthlySell}
              />
            )}
          </div>
          <div
            className="col-start-1 col-end-[16] row-start-3 row-end-4 overflow-hidden rounded-lg text-center sm:col-start-7 sm:col-end-[16] sm:row-start-1 sm:row-end-8"
            style={{ boxShadow: "0px 0px 28px #00000028" }}
          >
            {isLoading ? (
              <div className="h-full w-full animate-pulse bg-gray-400"></div>
            ) : (
              <SaleChart sellData={yearlySellByMonth} />
            )}
          </div>
          <div
            className="col-start-1 col-end-[16] row-start-4 row-end-6 overflow-hidden rounded-lg text-center sm:col-start-1 sm:col-end-11 sm:row-start-8 sm:row-end-[16]"
            style={{ boxShadow: "0px 0px 28px #00000028" }}
          >
            {isLoading ? (
              <div className="h-full w-full animate-pulse bg-gray-400"></div>
            ) : (
              <TopBuyer buyerData={TopBuyingCustomer} />
            )}
          </div>
          <div
            className="col-start-1 col-end-[16] row-start-6 row-end-7 overflow-hidden rounded-lg text-center sm:col-start-11 sm:col-end-[16] sm:row-start-8 sm:row-end-[16]"
            style={{ boxShadow: "0px 0px 28px #00000028" }}
          >
            {isLoading ? (
              <div className="h-full w-full animate-pulse bg-gray-400"></div>
            ) : (
              <ProductCategory productSellData={productBySell} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DashBoard;
