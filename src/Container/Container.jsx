import React from "react";

function Container({ children, className }) {
  return (
    <div className={`ml-[16%] h-screen py-5 pr-5 ${className} overflow-hidden`}>
      {children}
    </div>
  );
}

export default Container;
