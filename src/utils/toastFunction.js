import { Bounce, toast } from "react-toastify";

export const toastFunction = ({ type, message, theme, closeTime }) => {
  const toastFun = toast[type] || toast;
  return toastFun(message, {
    position: "top-right",
    autoClose: closeTime || 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme || "dark",
    transition: Bounce,
  });
};
