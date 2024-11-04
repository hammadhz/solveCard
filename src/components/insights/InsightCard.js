import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

const InsightCard = ({ data }) => {
  console.log(data);
  return (
    <div className="rounded-2xl h-36 w-full p-4 bg-primary">
      <div className="flex flex-col gap-3">
        <div className="flex items-center  gap-2">
          <p className="font-inter font-semibold text-lg">{data?.title}</p>
          <IoInformationCircleOutline className="size-5" title="test" />
        </div>
        <div className="font-inter font-medium text-2xl">{data?.value}</div>
      </div>
    </div>
  );
};

export default InsightCard;
