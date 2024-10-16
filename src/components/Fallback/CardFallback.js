import React from "react";

const CardFallback = () => {
  return (
    <div className="bg-primary p-4 rounded-2xl relative flex flex-col justify-between animate-pulse">
      <div className="bg-tertiary-gray-700 rounded-t-2xl w-full h-32 shimmer"></div>
      <div className="size-20 rounded-full bg-primary flex justify-center items-center z-40 absolute top-24 left-1/2 transform -translate-x-1/2">
        <div className="w-20 h-20 bg-gray-300 rounded-full shimmer" />
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-12">
        <div className="w-32 h-4 bg-gray-300 rounded shimmer" />
        <div className="w-24 h-4 bg-gray-300 rounded shimmer" />
        <div className="flex gap-2 items-center">
          <div className="w-28 h-10 bg-gray-300 rounded shimmer" />
          <div className="w-28 h-10 bg-gray-300 rounded shimmer" />
        </div>
      </div>
    </div>
  );
};

export default CardFallback;
