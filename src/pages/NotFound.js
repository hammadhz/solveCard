import React from "react";
import circle from "../assets/imgs/circle.png";
import circleCut from "../assets/imgs/circle-cut.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gradient-to-r from-tertiary-green-30 to-tertiary-green-50 h-screen flex justify-center items-center relative">
      <div className=" absolute -top-32 left-0">
        <img src={circle} alt="" className="" />
      </div>
      <div className="w-full h-full absolute -top-32 left-0">
        <img src={circleCut} alt="" className="" />
      </div>
      <div className="bg-white z-10 p-10 rounded-2xl min-w-[388px] min-h-[238px] shadow-2xl">
        <div className="flex justify-center items-center gap-4 flex-col">
          <h1 className="font-inter font-extrabold text-[100px] italic text-center">
            404
          </h1>
          <p className="font-inter font-medium text-lg text-black">
            The Resource that you are looking for not present
          </p>
          <p className="font-inter font-normal font-base text-tertiary-green-40">
            <Link to={"/"}>Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
