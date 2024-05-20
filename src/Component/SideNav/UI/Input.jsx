import React from "react";

function Input({ type, placeholder }) {
  return (
    <div>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}

export default Input;
