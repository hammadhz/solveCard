import React from "react";

const InsightCom = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4">
      <div className="rounded-2xl h-24 w-full p-3 bg-primary col-start-1 row-start-1"></div>
      <div className="rounded-2xl h-24 w-full p-3 bg-primary col-start-2 row-start-1"></div>
      <div className="rounded-2xl h-24 w-full p-3 bg-primary col-start-3 row-start-1"></div>
      <div className="rounded-2xl h-24 w-full p-3 bg-primary col-start-4 row-start-1"></div>
      <div className="rounded-2xl h-56 w-full p-3 bg-primary col-span-3 row-span-2 "></div>
      <div className="rounded-2xl h-56 w-full p-3 bg-primary  row-span-2"></div>
    </div>
  );
};

export default InsightCom;
