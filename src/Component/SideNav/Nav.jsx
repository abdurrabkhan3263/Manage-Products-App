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

function Nav({ isSlide, setSlide }) {
  const localIndex = JSON.parse(localStorage.getItem("index"));
  const [userData, setUserData] = useState({});
  const currentUser = useSelector((state) => state.user.user);
  const [currentIndex, setCurrentIndex] = useState(
    (localIndex && localIndex.index) || 0,
  );
  const [handleLogout, setHandleLogout] = useState(false);
  const navigate = useNavigate();
  const navContent = [
    {
      name: "Dashboard",
      icon: <MdOutlineDashboard className="slide_button" />,
      path: "/",
    },
    {
      name: "Products",
      icon: <Cart className="slide_button" />,
      path: "/products",
    },
    {
      name: "Invoice",
      icon: <Invoice className="slide_button" />,
      path: "/invoice",
    },
    {
      name: "All Customer",
      icon: <Contact className="slide_button" />,
      path: "/allcustomer",
    },
    {
      name: "Cart",
      icon: <FaLuggageCart className="slide_button" />,
      path: "/cart",
    },
  ];

  useEffect(() => {
    const handleClick = (event) => {
      const classes =
        typeof event.target.className === "string"
          ? event.target.className.split(" ")
          : ["slide_button"];
      if (
        !classes.includes("slide_button") &&
        !classes.includes("slide_nav_bar")
      ) {
        setSlide(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      <ShowLogout isShow={handleLogout} setShow={setHandleLogout} />
      <div
        className={`slide_nav_bar fixed top-0 z-[99999] transition-all ${isSlide ? "left-0" : "left-[-100%]"} h-screen w-[60vw] sm:w-[40vw] sm:py-5 sm:pl-5 xl:left-0 xl:w-[15vw]`}
      >
        <div className="flex h-full w-full flex-col bg-blue-600 sm:rounded-xl">
          <div className="hidden sm:block">
            <SideNavLogo
              onClick={() => {
                setCurrentIndex(0);
                navigate("/");
              }}
            />
          </div>
          <div className="slide_nav_bar flex h-full flex-col justify-between">
            <div>
              <p className="slide_nav_bar relative pb-3 pl-2.5 pt-6 font-medium text-white">
                Admin Tool
              </p>
              <ul className="flex flex-col gap-y-5 px-2.5">
                {navContent.map((navData, index) => (
                  <li
                    key={navData.name}
                    className={`slide_nav_bar w-full rounded-md py-3.5 text-center font-semibold ${
                      index === currentIndex
                        ? "bg-white text-blue-700"
                        : "text-white"
                    } relative z-50 flex cursor-pointer select-none items-center gap-x-12`}
                    onClick={() => {
                      navigate(navData.path);
                      setCurrentIndex(index);
                    }}
                  >
                    <i className="slide_nav_bar pl-4 text-[6vw] sm:text-[2.5rem] xl:text-[1.3vw]">
                      {navData.icon}
                    </i>
                    <p className="slide_nav_bar text-[3.5vw] font-semibold sm:text-[1.5rem] xl:text-[0.9vw]">
                      {navData.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="slide_nav_bar mx-2.5 mb-4 flex items-center justify-between rounded-md bg-white p-2.5">
              <p className="slide_nav_bar font-semibold">
                {currentUser?.name || ""}
              </p>
              <span
                className="slide_nav_bar cursor-pointer text-3xl text-darkblue"
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
