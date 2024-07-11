import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CloseEye,
  Logout,
  OpenEye,
  google__logo,
} from "../../../public/Assets";
import { Input, Button } from "../UI";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../../appwrite";
import { useDispatch } from "react-redux";
import { toastFunction } from "../../utils/toastFunction";
import { spinner } from "../../../public/Assets";

function LoginForm() {
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm();
  const [passHidden, setPassHidden] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const useClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  const authLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => {
      const response = await authService.loginAccount(data);
      return response;
    },
    onError: (error) => {
      setSubmissionLoading(false);
      setSubmitError(error.message);
      toastFunction({ type: "error", message: error.message });
    },
    onSuccess: () => {
      setSubmissionLoading(false);
      navigate("/");
      useClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
  const formSubmit = (data) => {
    if (!data.email.trim() || !data.password.trim()) {
      setError("email", {
        type: "manual",
        message: "Email is required",
      });
      setError("password", {
        type: "manual",
        message: "Password is required",
      });
      toastFunction({
        type: "warn",
        message: "Email and Password is Required",
      });
      return;
    }
    setSubmissionLoading(true);
    authLogin.mutate(data);
  };
  return (
    <div className="flex h-[85%] flex-col items-center justify-between">
      <div className="max-h-[75px] min-h-[75px] px-7 text-center capitalize">
        <p className="font-semibold text-red-500">
          {errors.email && errors.email.message}
        </p>
        <p className="font-semibold text-red-500">
          {errors.password && errors.password.message}
        </p>
        <p className="font-semibold text-red-500">
          {submitError && submitError}
        </p>
      </div>
      <div className="h-full w-full px-7 sm:px-0 xl:px-7">
        <div className="flex h-[55px] w-full cursor-pointer items-center justify-center gap-x-2 rounded-full border border-black bg-white sm:h-[50px]">
          <img src={google__logo} alt="google__logo" className="h-[60%]" />
          <p className="font-semibold">Sign in with Google</p>
        </div>
        <div className="mt-8" style={{ height: `calc(100% - 82px)` }}>
          <form
            onSubmit={handleSubmit(formSubmit)}
            className="flex h-full flex-col justify-between"
          >
            <div className="flex flex-col gap-y-6">
              <Input
                type={"email"}
                className={
                  "h-12 w-full border border-black bg-white sm:h-[42px]"
                }
                placeholder={"Your Email"}
                {...register("email")}
              ></Input>
              <div className="flex h-12 w-full rounded-md border border-black sm:h-[42px]">
                <Input
                  type={passHidden ? "password" : "text"}
                  className="h-full w-full"
                  parentClass="h-full flex-grow"
                  placeholder="Your Password"
                  {...register("password")}
                />
                <span
                  className="inline-flex cursor-pointer items-center pr-2 text-xl"
                  onClick={() => setPassHidden((prev) => !prev)}
                >
                  {passHidden ? <CloseEye /> : <OpenEye />}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-[18px] pt-3 sm:gap-y-4 sm:pt-0">
              <div className="text-end font-semibold underline">
                <Link to={"/forget"}>Forget Password</Link>
              </div>
              <Button
                type="submit"
                className="relative flex w-full items-center justify-center gap-2 bg-lightblue py-2.5 text-base text-white transition-all hover:bg-darkblue sm:py-1.5"
              >
                <p>Login In</p>
                <img
                  src={spinner}
                  alt="loading"
                  width={"12%"}
                  className={`${submissionLoading ? "block" : "hidden"} h-fit`}
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <p className="mt-5 sm:mt-4">
        Don’t have an account get ?
        <span className="font-semibold underline">
          <Link to="/signup"> Sign up</Link>
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
