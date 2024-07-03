import React from "react";
import "./AddButton.css";

function AddButton({ type, className, children, ...props }) {
  return (
    <button type={type} className={`CartBtn ${className}`} {...props}>
      {children}
    </button>
  );
}

export default AddButton;
