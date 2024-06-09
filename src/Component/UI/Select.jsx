import React, { forwardRef } from "react";

function Select({ className, option = [], ...props }, ref) {
  return (
    <div>
      <select
        ref={ref}
        {...props}
        className={`bg-[#D9D9D9] outline-none ${className}`}
      >
        {option.map((optionData, index) => (
          <option
            key={index}
            value={[parseFloat(optionData.price), optionData.name]}
          >
            {optionData.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default forwardRef(Select);
