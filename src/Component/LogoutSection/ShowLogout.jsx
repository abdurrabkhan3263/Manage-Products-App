import React from "react";
import { useMutation } from "@tanstack/react-query";
import { authService, databaseService } from "../../appwrite";
import Error from "../Error/Error";
import { logout } from "../../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ShowLogout({ isShow, setShow }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await authService.logoutAccount();
    },
    onSuccess: () => {
      navigate("/login");
      dispatch(logout());
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div
      className={`${
        isShow ? "flex" : "hidden"
      } fixed bottom-1/2 right-1/2 z-[999999] h-[45%] w-[90%] translate-x-1/2 translate-y-1/2 flex-col justify-between gap-y-5 rounded-xl border bg-white py-8 text-center shadow-lightBox sm:absolute sm:w-1/5`}
    >
      {logoutMutation.isError ? (
        <>
          <Error message={logoutMutation.error.message} />
        </>
      ) : logoutMutation.isPending ? (
        <div>
          <p>Logout..........</p>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex w-full justify-center">
            <h1 className="mt-8 w-[70%] text-wrap text-center text-xl font-semibold">
              Are you sure you want to log out ?
            </h1>
          </div>
          <div className="flex flex-col gap-y-6 px-6 pt-5">
            <button
              className="rounded-full bg-lightgray py-2.5 font-semibold text-black duration-200 hover:bg-[#dfdfdf]"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="rounded-full bg-lightblue py-2.5 font-semibold text-white duration-200 hover:bg-darkblue"
              onClick={() => {
                setShow(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowLogout;
