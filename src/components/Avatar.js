import React, { useState } from "react";
import avatar from "../assets/svgs/avatar.svg";
import { ReactSVG } from "react-svg";
import { IoIosLogOut } from "react-icons/io";

const Avatar = () => {
  const [openDropDn, setOpenDropDn] = useState(false);
  return (
    <div className="relative">
      <div
        className="bg-white shadow-md size-10 rounded-full flex justify-center items-center"
        onClick={() => setOpenDropDn(!openDropDn)}
      >
        <ReactSVG src={avatar} />
      </div>
      {openDropDn && (
        <div className="absolute right-5 top-14 max-h-24 w-36 p-4 bg-white shadow-md flex flex-col gap-1  rounded-lg">
          <div className="w-full hover:bg-primary p-1 hover:rounded-lg flex gap-1 items-center">
            <IoIosLogOut className="size-5" />
            <p className=" font-inter font-normal text-base ">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
