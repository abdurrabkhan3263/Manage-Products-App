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
import { login, logout } from "../../store/slice";
import { toastFunction } from "../../utils/toastFunction";

function LoginForm() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const [passHidden, setPassHidden] = useState(true);
  const useClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setFocus("email");
  }, [setFocus]);
  const authLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data) => authService.loginAccount(data),
    onError: (error) => {
      toastFunction({ type: "error", message: error.message });
    },
    onSuccess: () => {
      toastFunction({
        type: "success",
        message: "Logged In Successfully",
        closeTime: 1500,
      });
      setTimeout(() => {
        navigate("/");
      }, 1600);
      useClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
  const formSubmit = (data) => {
    if (!data.email.trim() || !data.password.trim()) {
      toastFunction({
        type: "warn",
        message: "Email and Password is Required",
      });
      return;
    }
    authLogin.mutate(data);
  };
  return (
    <div className="flex h-[85%] flex-col items-center justify-between">
      <div className="max-h-[75px] min-h-[75px] px-7 text-center capitalize"></div>
      <div className="h-full w-full px-7">
        <div className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-x-2 rounded-full border border-black bg-white">
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
                className={"h-[42px] w-full border border-black bg-white"}
                placeholder={"Your Email"}
                {...register("email")}
              ></Input>
              <div className="flex h-[42px] w-full rounded-md border border-black">
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
            <div className="flex flex-col gap-y-4">
              <div className="text-end font-semibold underline">
                <Link to={"/forget"}>Forget Password</Link>
              </div>
              <Button
                type={"submit"}
                className={
                  "w-full bg-lightblue py-1.5 text-base text-white transition-all hover:bg-darkblue"
                }
              >
                Login In
              </Button>
            </div>
          </form>
        </div>
      </div>
      <p className="mt-4">
        Don’t have an account get ?
        <span className="font-semibold underline">
          <Link to="/signup"> Sign up</Link>
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
