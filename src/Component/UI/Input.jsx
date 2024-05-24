import React, { forwardRef, useId } from "react";

function Input({ type, className, label, ...props }, ref) {
  const id = useId();
  return (
    <div>
      {label && (
        <label
          className="mr-2 inline-block text-[16px] font-semibold"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        {...props}
        className={`outline-none bg-[#D9D9D9] focus:bg-[#c5c5c5] w-20 px-1 py-1 rounded-md ${className}`}
      />
    </div>
  );
}

export default forwardRef(Input);
