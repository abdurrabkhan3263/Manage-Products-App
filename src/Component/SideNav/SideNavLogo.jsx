import React, { forwardRef } from "react";
import { Logo } from "../../../public/Assets/index";

function SideNavLogo({ onClick }) {
  return (
    <div
      className="relative pl-4 pt-4 select-none cursor-pointer"
      onClick={onClick}
    >
      <img src={Logo} alt="" width="50%" />
      <h1 className="absolute bottom-0 left-[40%] text-3xl font-semibold text-white">
        Grow Up
      </h1>
    </div>
  );
}

export default SideNavLogo;
