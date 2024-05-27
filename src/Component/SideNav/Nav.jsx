import React, { useState, useEffect } from "react";
import { SideNavLogo } from "./index";
import {
  MdOutlineDashboard,
  Cart,
  Contact,
  Graph,
} from "../SideNav../../../../public/Assets/index";
import { useNavigate, useLocation } from "react-router-dom";

const navContent = [
  { name: "Dashboard", icon: <MdOutlineDashboard />, path: "/" },
  { name: "Products", icon: <Cart />, path: "/products" },
  { name: "Statics", icon: <Graph />, path: "/statics" },
  { name: "Buy-Sell", icon: <MdOutlineDashboard />, path: "/buysell" },
  { name: "All Customer", icon: <Contact />, path: "/allcustomer" },
];
function Nav() {
  const localIndex = JSON.parse(localStorage.getItem("index"));
  const [currentIndex, setCurrentIndex] = useState(
    (localIndex && localIndex.index) || 0
  );
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect(() => {
  //   localStorage.setItem(
  //     "index",
  //     JSON.stringify({
  //       path: location.pathname,
  //       index: currentIndex,
  //     })
  //   );
  // }, [currentIndex]);
  // useEffect(() => {
  //   if (currentIndex != 0) {
  //     localStorage.setItem(
  //       "index",
  //       JSON.stringify({ path: location.pathname, index: currentIndex })
  //     );
  //   }
  //   navigate(localIndex.path);
  // }, []);
  return (
    <div className="h-screen w-[15vw] fixed py-5 pl-5">
      <div className="w-full h-full bg-blue-600 rounded-xl">
        <SideNavLogo
          onClick={() => {
            setCurrentIndex(0);
            navigate("/");
          }}
        />
        <div>
          <p className="pl-2.5 pb-3 pt-6 text-white font-medium relative">
            Admin Tool
          </p>
          <ul className="px-2.5 flex flex-col  gap-y-5">
            {navContent.map((navData, index) => (
              <li
                key={navData.name}
                className={`w-full text-center rounded-md py-3.5 font-semibold ${
                  index === currentIndex
                    ? "text-blue-700 bg-white"
                    : "text-white"
                }  flex gap-x-12 items-center  cursor-pointer select-none relative z-50`}
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
      </div>
    </div>
  );
}

export default Nav;
