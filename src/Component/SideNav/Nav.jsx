import React, { useState, useEffect } from "react";
import { SideNavLogo } from "./index";
import {
  MdOutlineDashboard,
  Cart,
  Contact,
  Invoice,
  Logout,
  FaLuggageCart,
} from "../SideNav../../../../public/Assets/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShowLogout } from "../index.js";

function Nav() {
  const localIndex = JSON.parse(localStorage.getItem("index"));
  const currentUser = useSelector((state) => state.user.user);
  const [currentIndex, setCurrentIndex] = useState(
    (localIndex && localIndex.index) || 0,
  );
  const [handleLogout, setHandleLogout] = useState(false);
  const navigate = useNavigate();
  const navContent = [
    { name: "Dashboard", icon: <MdOutlineDashboard />, path: "/" },
    { name: "Products", icon: <Cart />, path: "/products" },
    { name: "Invoice", icon: <Invoice />, path: "/invoice" },
    { name: "All Customer", icon: <Contact />, path: "/allcustomer" },
    { name: "Cart", icon: <FaLuggageCart />, path: "/cart" },
  ];
  return (
    <>
      <ShowLogout isShow={handleLogout} setShow={setHandleLogout} />
      <div className="fixed top-0 hidden h-screen w-[60vw] sm:w-[15vw] sm:py-5 sm:pl-5">
        <div className="flex h-full w-full flex-col bg-blue-600 sm:rounded-xl">
          <div className="hidden sm:block">
            <SideNavLogo
              onClick={() => {
                setCurrentIndex(0);
                navigate("/");
              }}
            />
          </div>
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="relative pb-3 pl-2.5 pt-6 font-medium text-white">
                Admin Tool
              </p>
              <ul className="flex flex-col gap-y-5 px-2.5">
                {navContent.map((navData, index) => (
                  <li
                    key={navData.name}
                    className={`w-full rounded-md py-3.5 text-center font-semibold ${
                      index === currentIndex
                        ? "bg-white text-blue-700"
                        : "text-white"
                    } relative z-50 flex cursor-pointer select-none items-center gap-x-12`}
                    onClick={() => {
                      navigate(navData.path);
                      setCurrentIndex(index);
                    }}
                  >
                    <i className="pl-4 text-[1.3vw]">{navData.icon}</i>
                    <p className="text-[0.9vw] font-semibold">{navData.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-2.5 mb-4 flex items-center justify-between rounded-md bg-white p-2.5">
              <p className="font-semibold">{currentUser?.name || ""}</p>
              <span
                className="cursor-pointer text-3xl text-darkblue"
                onClick={() => setHandleLogout((prev) => !prev)}
              >
                <Logout />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
