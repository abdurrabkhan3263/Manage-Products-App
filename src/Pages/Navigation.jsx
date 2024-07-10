import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../Component/SideNav";
import { Bounce, ToastContainer } from "react-toastify";
import { SideNavLogo } from "../Component/SideNav";
import { new__logo, Xcross } from "../../public/Assets/index";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

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
      rotate: slide ? 180 : 90,
      delay: slide ? 0.1 : 0,
    });
  }, [slide]);

  return (
    <div className="relative w-full">
      <div className="flex h-48 w-full flex-col overflow-hidden bg-blue-400 xl:hidden">
        <div className="flex h-[75%] items-center justify-center">
          <img src={new__logo} alt="logo" width={"75%"} />
        </div>
        <div className="flex h-[25%] w-full items-center justify-end bg-gray-400 pr-4 text-2xl">
          <p
            className="slide_button relative"
            onClick={() => setSlide((prev) => !prev)}
          >
            <span
              ref={menu}
              className={`absolute -top-1/2 right-0 ${slide ? "opacity-0" : "opacity-100"} -translate-y-1/2`}
            >
              <Menu height={45} width={45} />
            </span>
            <span
              ref={x}
              className={`absolute -top-1/2 right-0 ${slide ? "opacity-100" : "opacity-0"} -translate-y-1/2`}
            >
              <X height={45} width={45} />
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
