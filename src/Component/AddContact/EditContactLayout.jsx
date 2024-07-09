import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AddContact from "./AddContact";
import { Xcross } from "../../../public/Assets";
import { useQuery } from "@tanstack/react-query";
import { databaseService } from "../../appwrite";
import { SimpleLoader } from "../../Assets/index";

function EditContactLayout({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { data, isLoading, error, isError, isSuccess } = useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      return await databaseService.gettingCustomerById(id);
    },
  });
  return (
    <div
      className={`absolute w-[32%] ${className} bottom-1/2 right-1/2 z-50 h-3/4 translate-x-1/2 translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl`}
    >
      <div
        className="inline-block cursor-pointer p-1.5 text-4xl text-lightblue"
        onClick={() => {
          navigate(location.state);
        }}
      >
        <Xcross />
      </div>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <SimpleLoader />
        </div>
      ) : (
        <div className="h-[92%] w-full">
          {data && <AddContact contactData={data} />}
        </div>
      )}
    </div>
  );
}

export default EditContactLayout;
