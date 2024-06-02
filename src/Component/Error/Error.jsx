import React from "react";

function Error({ message, parentStyle, childStyle }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-blue-">
      <div className="w-full h-[69%]">
        <img
          src="https://img.freepik.com/free-vector/alert-concept-illustration_114360-368.jpg?t=st=1717233841~exp=1717237441~hmac=b3a5465c5462d78e0c239a46d90e76280aedceb4aec079956aba49afafefed18&w=740"
          alt={message}
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-xl font-semibold text-red-500">{message}</p>
    </div>
  );
}

export default Error;
