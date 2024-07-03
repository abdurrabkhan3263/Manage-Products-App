import React from "react";
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

function DashBoard() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user?.user);
  const handleAddProduct = () => {
    navigate("addproduct", { state: "/" });
  };
  return (
    <Container>
      <div className="h-full">
        <Outlet />
        <div className="flex h-[10%] justify-between">
          <div>
            <p className="text-lg font-medium">Welcome Back</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser?.name || ""}
            </h2>
          </div>
          <Button
            type={"button"}
            className={"flex items-center bg-blue-600 px-4 py-1 text-white"}
            onClick={handleAddProduct}
          >
            <Add /> Add Product
          </Button>
        </div>
        <div className="grid h-[90%] w-full grid-cols-[repeat(15,1fr)] grid-rows-[repeat(15,1fr)] gap-x-4 gap-y-4">
          <div className="col-start-1 col-end-7 row-start-1 row-end-8 w-full rounded-lg shadow-lightBox transition-shadow hover:shadow-custom">
            <MonthlySaleData />
          </div>
          <div
            className="col-start-7 col-end-[16] row-start-1 row-end-8 overflow-hidden rounded-lg text-center"
            style={{ boxShadow: "0px 0px 28px #00000028" }}
          >
            <SaleChart />
          </div>
          <div
            className="col-start-1 col-end-11 row-start-8 row-end-[16] overflow-hidden rounded-lg text-center"
            style={{ boxShadow: "0px 0px 28px #00000028" }}
          >
            <TopBuyer />
          </div>
          <div
            className="col-start-11 col-end-[16] row-start-8 row-end-[16] overflow-hidden rounded-lg text-center"
            style={{ boxShadow: "0px 0px 28px #00000028" }}
          >
            <ProductCategory />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DashBoard;
