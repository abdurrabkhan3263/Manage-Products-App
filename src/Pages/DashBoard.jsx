import React from "react";
import Container from "../Container/Container";
import { Button } from "../Component/UI/index";
import { Add } from "../../public/Assets";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
            {/* change Here After Add DB */}
          </div>
          <Button
            type={"button"}
            className={"flex items-center bg-blue-600 px-4 py-1 text-white"}
            onClick={handleAddProduct}
          >
            <Add /> Add Product
          </Button>
        </div>
        <div className="grid h-[90%] w-full grid-cols-12 grid-rows-2 gap-x-4 gap-y-4">
          <div className="col-start-1 col-end-7 w-full rounded-lg bg-green-500 text-center">
            Items1
          </div>
          <div className="col-start-7 col-end-13 rounded-lg bg-red-400 text-center">
            Items2
          </div>
          <div className="col-start-[-13] col-end-[-6] rounded-lg bg-orange-500 text-center">
            Items3
          </div>
          <div className="col-start-[-6] col-end-[-1] rounded-lg bg-gray-500 text-center">
            Items4
          </div>
        </div>
      </div>
    </Container>
  );
}

export default DashBoard;
