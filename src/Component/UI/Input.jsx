import React, { forwardRef, useId } from "react";

function Input({ type, className, parentClass, label, ...props }, ref) {
  const id = useId();
  return (
    <div className={parentClass}>
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
        className={`w-20 rounded-md px-3 py-1 outline-none ${className}`}
      />
    </div>
  );
}

export default forwardRef(Input);
