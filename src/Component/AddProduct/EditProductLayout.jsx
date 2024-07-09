import React, { useState, useEffect } from "react";
import { Xcross } from "../../../public/Assets";
import AddProduct from "./AddProduct";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../../appwrite";
import { SimpleLoader } from "../../Assets";

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
      className={`fixed h-full w-full lg:w-[70%] xl:absolute xl:w-[32%] ${className} bottom-1/2 right-1/2 z-50 translate-x-1/2 translate-y-1/2 overflow-hidden bg-white shadow-2xl sm:h-3/4 sm:rounded-2xl`}
    >
      <div
        className="inline-block cursor-pointer p-1.5 text-4xl text-lightblue"
        onClick={() => {
          navigate(location.state);
        }}
      >
        <Xcross />
      </div>
      <div className="h-[92%] w-full">
        {productData.isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <SimpleLoader />
          </div>
        ) : (
          productData.data && <AddProduct productData={productData.data} />
        )}
      </div>
    </div>
  );
}

export default EditProductLayout;
