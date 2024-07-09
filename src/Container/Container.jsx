import React from "react";

function Container({ children, className }) {
  return (
    <div
      className={`min-h-screen px-3 py-5 sm:ml-[16%] sm:h-screen ${className} `}
    >
      {children}
    </div>
  );
}

export default Container;
