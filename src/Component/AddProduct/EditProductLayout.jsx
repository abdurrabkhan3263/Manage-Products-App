import React, { useState, useEffect } from "react";
import { Xcross } from "../../../public/Assets";
import AddProduct from "./AddProduct";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../../appwrite";

function EditProductLayout({ className }) {
  // const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const productData = useQuery({
    queryKey: ["upProduct", id],
    queryFn: async () => {
      const response = await databaseService.getProductById(id);
      if (response) {
        return response;
      }
    },
    enabled: !!id,
  });
  return (
    <div
      className={`absolute w-[32%]  ${className} z-50  h-3/4 rounded-2xl bg-white shadow-2xl right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2 overflow-hidden`}
    >
      <div
        className="p-1.5 text-4xl text-lightblue cursor-pointer inline-block"
        onClick={() => {
          navigate(location.state);
        }}
      >
        <Xcross />
      </div>
      <div className="w-full h-[92%]">
        {productData.isLoading ? (
          <div>Loading........</div>
        ) : (
          productData.data && <AddProduct productData={productData.data} />
        )}
      </div>
    </div>
  );
}

export default EditProductLayout;
