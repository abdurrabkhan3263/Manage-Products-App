import React, { forwardRef } from "react";
import { Logo } from "../../../public/Assets/index";

function SideNavLogo({ onClick, className, imageClass, textClass }) {
  return (
    <div
      className={`relative cursor-pointer select-none pl-4 sm:pt-4 ${className}`}
      onClick={onClick}
    >
      <img src={Logo} alt="logo" className={`${imageClass} sm:w-[50%]`} />
      <h1
        className={`absolute bottom-0 left-[40%] text-3xl font-semibold text-white ${textClass}`}
      >
        Grow Up
      </h1>
    </div>
  );
}

export default SideNavLogo;
