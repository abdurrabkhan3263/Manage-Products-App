import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../Component/SideNav";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { SideNavLogo } from "../Component/SideNav";
import { new__logo, Xcross } from "../../public/Assets/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { toastFunction } from "../utils/toastFunction";

function Navigation() {
  const [slide, setSlide] = React.useState(false);
  const x = useRef(null);
  const menu = useRef(null);

  useGSAP(() => {
    gsap.to(menu.current, {
      opacity: slide ? 0 : 1,
      duration: 0.2,
      delay: slide ? 0 : 0.12,
    });
    gsap.to(x.current, {
      opacity: slide ? 1 : 0,
      duration: 0.2,
      rotate: slide ? -90 : 90,
      delay: slide ? 0.12 : 0,
    });
  }, [slide]);

  return (
    <div className="relative w-full">
      <div className="flex h-48 w-full flex-col overflow-hidden xl:hidden">
        <div className="flex h-[75%] items-center justify-center">
          <img src={new__logo} alt="logo" className="w-[75%] sm:w-[40%]" />
        </div>
        <div className="flex h-[25%] w-full items-center justify-end bg-[#2563EB] pr-4 text-2xl text-white">
          <p
            className="slide_button relative"
            onClick={() => {
              setSlide((prev) => !prev);
            }}
          >
            <span
              ref={menu}
              className={`absolute -top-1/2 right-0 ${slide ? "opacity-0" : "opacity-100"} -translate-y-1/2`}
            >
              <Menu height={40} width={40} />
            </span>
            <span
              ref={x}
              className={`absolute -top-1/2 right-0 ${slide ? "opacity-100" : "opacity-0"} -translate-y-1/2`}
            >
              <X height={40} width={40} />
            </span>
          </p>
        </div>
      </div>
      <Nav isSlide={slide} setSlide={setSlide} />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
}

export default Navigation;
