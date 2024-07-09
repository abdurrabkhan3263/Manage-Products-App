import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../UI";
import { useForm } from "react-hook-form";
import { CloseEye, OpenEye } from "../../../public/Assets";
import { authService } from "../../appwrite";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toastFunction } from "../../utils/toastFunction";

function SignForm() {
  const {
    register,
    handleSubmit,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm();
  const [passHidden, setPassHidden] = useState(true);
  const useClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    register("email", {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address",
      },
    });
  }, [register]);
  useEffect(() => {
    setFocus("name");
  }, [setFocus]);
  const auth = useMutation({
    mutationKey: ["sign"],
    mutationFn: async (data) => await authService.createAccount(data),
    onError: (error) => {
      toastFunction({ type: "error", message: error.message });
    },
    onSuccess: async () => {
      toastFunction({
        type: "success",
        message: "Your account has been created successfully!",
        theme: "colored",
        closeTime: 1500,
      });
      const loginData = await authService.loginAccount({
        email: getValues("email"),
        password: getValues("password"),
      });
      if (loginData) {
        setTimeout(() => {
          navigate("/");
        }, 1600);
      }
      useClient.invalidateQueries({ queryKey: ["signup"] });
    },
  });
  const onSubmit = async (data) => {
    if (!data.name.trim()) {
      setFocus("name");
      toastFunction({ type: "warn", message: "Name is Required" });
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setFocus("email");
      toastFunction({ type: "warn", message: "Invalid Email Address" });
      return;
    } else if (data.password.trim().length < 8) {
      toastFunction({
        type: "warn",
        message: "Password is required and must be 8 to 13 character long",
      });
      return;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.password,
      )
    ) {
      setFocus("password");
      toastFunction({
        type: "warn",
        message:
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
      });
      return;
    }
    auth.mutate(data);
  };
  return (
    <div className="flex h-[85%] w-full flex-col items-center justify-between">
      <div className="max-h-[75px] min-h-[75px] px-7 text-center capitalize"></div>
      <div className="w-full flex-grow px-7 sm:px-0 xl:px-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between"
        >
          <div className="flex flex-col gap-y-6">
            <Input
              className="h-12 w-full border border-black bg-white sm:h-[42px]"
              placeholder="Your Name"
              type="text"
              {...register("name")}
            />
            <Input
              className="h-12 w-full border border-black bg-white sm:h-[42px]"
              placeholder="Your Email"
              type="email"
              {...register("email")}
            />
            <div className="mr-2 flex h-12 w-full rounded-md border border-black bg-white sm:h-[42px]">
              <Input
                className="h-full w-full"
                parentClass="flex-grow h-full"
                placeholder="Your Password"
                type={passHidden ? "password" : "text"}
                {...register("password")}
              />
              <span
                className="inline-flex items-center pr-2 text-center text-xl"
                onClick={() => setPassHidden((prev) => !prev)}
              >
                {passHidden ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-lightblue py-2.5 text-base text-white transition-all hover:bg-darkblue sm:py-1.5"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
      <p className="mt-4">
        <span>Already have an account? </span>
        <Link to="/login" className="font-semibold underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignForm;
