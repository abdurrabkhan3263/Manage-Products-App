import React from "react";
import Container from "../Container/Container";
import { Button } from "../Component/UI/index";
import { Add } from "../../public/Assets";
import { Outlet, useNavigate, Link } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("addproduct", { state: "/" });
  };
  return (
    <Container>
      <div className="w-full h-full">
        <Outlet />
        <div className="flex justify-between h-[10%]">
          <div>
            <p className="text-lg font-medium">Welcome Back</p>
            <h2 className="text-3xl font-bold text-gray-800">Abdul Rab Khan</h2>
            {/* change Here After Add DB */}
          </div>
          <Button
            type={"button"}
            className={"flex items-center px-4 py-1 text-white bg-blue-600 "}
            onClick={handleAddProduct}
          >
            <Add /> Add Product
          </Button>
        </div>
        <div className="w-full h-[90%] grid gap-x-4 gap-y-4 grid-cols-12 grid-rows-2">
          <div className="col-start-1 col-end-7 text-center w-full bg-green-500 rounded-lg">
            Items1
          </div>
          <div className="col-start-7 col-end-13 bg-red-400 text-center rounded-lg">
            Items2
          </div>
          <div className="col-start-[-13] col-end-[-6] text-center bg-orange-500 rounded-lg">
            Items3
          </div>
          <div className="bg-gray-500 col-start-[-6] text-center col-end-[-1] rounded-lg">
            Items4
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DashBoard;
