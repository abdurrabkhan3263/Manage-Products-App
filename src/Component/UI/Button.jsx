import React from "react";

function Button({ type, children, className, ...props }) {
  return (
    <div>
      <button
        type={type}
        className={`text-xl font-medium rounded-md ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
