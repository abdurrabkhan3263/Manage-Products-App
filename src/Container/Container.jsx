import React from "react";

function Container({ children, className, noPadding = false }) {
  return (
    <div
      className={`min-h-screen ${noPadding ? "px-0 py-0" : "px-3 py-5"} sm:h-screen xl:ml-[16%] ${className} `}
    >
      {children}
    </div>
  );
}

export default Container;
