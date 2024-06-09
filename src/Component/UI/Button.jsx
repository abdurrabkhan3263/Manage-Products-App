import React from "react";

function Button({ type, children, className, ...props }) {
  return (
    <div>
      <button
        type={type}
        className={`rounded-md text-xl font-medium ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
