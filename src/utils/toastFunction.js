import { Bounce, toast } from "react-toastify";

export const toastFunction = ({ type, message }) => {
  const toastFun = toast[type] || toast;
  return toastFun(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};
