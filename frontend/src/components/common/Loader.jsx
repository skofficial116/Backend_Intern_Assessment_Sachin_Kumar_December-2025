import React from "react";

const Loader = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default Loader;
