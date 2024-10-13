import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import LineChart from "../Graph";

const InsightCom = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4">
      <div className="rounded-2xl h-24 w-full p-4 bg-primary col-start-1 row-start-1">
        <div className="flex flex-col gap-3">
          <div className="flex items-center  gap-2">
            <p className="font-inter font-normal text-sm">Leads Generated</p>
            <IoInformationCircleOutline className="size-4" title="test" />
          </div>
          <div className="font-inter font-medium text-2xl">0</div>
        </div>
      </div>
      <div className="rounded-2xl h-24 w-full p-4 bg-primary col-start-2 row-start-1">
        <div className="flex flex-col gap-3">
          <div className="flex items-center  gap-2">
            <p className="font-inter font-normal text-sm">Links taps</p>
            <IoInformationCircleOutline className="size-4" title="test" />
          </div>
          <div className="font-inter font-medium text-2xl">0</div>
        </div>
      </div>
      <div className="rounded-2xl h-24 w-full p-4 bg-primary col-start-3 row-start-1">
        <div className="flex flex-col gap-3">
          <div className="flex items-center  gap-2">
            <p className="font-inter font-normal text-sm">Card Views</p>
            <IoInformationCircleOutline className="size-4" title="test" />
          </div>
          <div className="font-inter font-medium text-2xl">0</div>
        </div>
      </div>
      <div className="rounded-2xl h-24 w-full p-4 bg-primary col-start-4 row-start-1">
        <div className="flex flex-col gap-3">
          <div className="flex items-center  gap-2">
            <p className="font-inter font-normal text-sm">Contact Download</p>
            <IoInformationCircleOutline className="size-4" title="test" />
          </div>
          <div className="font-inter font-medium text-2xl">0</div>
        </div>
      </div>
      <div className="rounded-2xl h-96 w-full p-4 bg-primary col-span-3 row-span-6 ">
        <div className="flex flex-col gap-3">
          <p className="font-inter font-normal text-sm">Recent Activity</p>

          <LineChart />
        </div>
      </div>
      <div className="rounded-2xl h-56 w-full p-4 bg-primary  row-span-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center  gap-2">
            <p className="font-inter font-normal text-sm">Recent Activity</p>
            <IoInformationCircleOutline className="size-4" title="test" />
          </div>
          <div className="font-inter font-medium text-2xl">0</div>
        </div>
      </div>
    </div>
  );
};

export default InsightCom;
