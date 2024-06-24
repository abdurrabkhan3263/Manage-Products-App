import React from "react";
import { no__data } from "../../public/Assets";

function NoDataAvailable({ className, imageClassName }) {
  return (
    <div className={`${className}`}>
      <div className={`${imageClassName} text-center`}>
        <img
          src={no__data}
          alt="no__data"
          className={`h-full w-full object-contain`}
        />
      </div>
    </div>
  );
}

export default NoDataAvailable;
