import React, { forwardRef } from "react";

function Select({ className, option = [], ...props }, ref) {
  return (
    <div>
      <select
        ref={ref}
        {...props}
        className={`outline-none bg-[#D9D9D9] ${className}`}
      >
        {option.map((optionData, index) => (
          <option key={index} value={[optionData.price, optionData.name]}>
            {optionData.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default forwardRef(Select);
