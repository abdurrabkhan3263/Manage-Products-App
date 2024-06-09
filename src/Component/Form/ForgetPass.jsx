import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../UI";
import { useForm } from "react-hook-form";
import { CloseEye, OpenEye } from "../../../public/Assets";

function ForgetPass() {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm();
  const [passHidden, setPassHidden] = useState({
    input1: true,
    input2: true,
  });
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
    setFocus("email");
  }, [setFocus]);
  const onSubmit = (data) => {
    if (getValues("password") !== getValues("repass")) {
      return setError("repass", {
        value: "customer",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("repass");
    }
    alert(JSON.stringify(data));
  };
  return (
    <div className="flex h-[85%] w-full flex-col items-center justify-between">
      <div className="max-h-[75px] min-h-[75px] px-7 text-center">
        {errors.email && (
          <p className="font-semibold text-red-500">*{errors.email.message}</p>
        )}
        {errors.password && (
          <p className="font-semibold text-red-500">
            *{errors.password.message}
          </p>
        )}
        {errors.name && (
          <p className="font-semibold text-red-500">*{errors.name.message}</p>
        )}
        {errors.repass && (
          <p className="font-semibold text-red-500">{errors.repass.message}</p>
        )}
      </div>
      <div className="w-full flex-grow px-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col justify-between"
        >
          <div className="flex flex-col gap-y-6">
            <Input
              className="h-[42px] w-full border border-black bg-white"
              placeholder="Your Email"
              type="email"
              {...register("email")}
            />
            <div className="mr-2 flex h-[42px] w-full rounded-md border border-black bg-white">
              <Input
                className="h-full w-full"
                parentClass="flex-grow h-full"
                placeholder="Your New Password"
                type={passHidden.input1 ? "password" : "text"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character",
                  },
                })}
              />
              <span
                className="inline-flex items-center pr-2 text-center text-xl"
                onClick={() =>
                  setPassHidden((prev) => ({
                    ...prev,
                    input1: !prev.input1,
                  }))
                }
              >
                {passHidden.input1 ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="mr-2 flex h-[42px] w-full rounded-md border border-black bg-white">
              <Input
                className="h-full w-full"
                parentClass="flex-grow h-full"
                placeholder="Re Enter Your New Password"
                type={passHidden.input2 ? "password" : "text"}
                required={true}
                {...register("repass", {
                  pattern: {
                    value: getValues("password"),
                    message: "Does Not Match The Pass",
                  },
                })}
              />
              <span
                className="inline-flex items-center pr-2 text-center text-xl"
                onClick={() =>
                  setPassHidden((prev) => {
                    return { ...prev, input2: !prev.input2 };
                  })
                }
              >
                {passHidden.input2 ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-lightblue py-1.5 text-base text-white transition-all hover:bg-darkblue"
            >
              Forget
            </Button>
          </div>
        </form>
      </div>
      <p className="mt-4">
        <span>Already have an account? </span>
        <Link to="/login" className="font-semibold underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default ForgetPass;
