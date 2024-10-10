import React from "react";
import { CiUser } from "react-icons/ci";
import { AiOutlineLink } from "react-icons/ai";
import { RiFilterLine } from "react-icons/ri";
import { MdOutlineEmail, MdOutlineQrCode2 } from "react-icons/md";

const ProfileNav = () => {
  return (
    <nav
      className="h-[450px] flex justify-center w-48 px-2 overflow-y-auto border-r-2 border-r-white"
      id="profileNav"
    >
      <div className="flex flex-col  gap-4 items-start  py-6 w-full">
        <div className="flex flex-col w-full gap-1">
          <h3 className="pl-3 font-inter font-medium text-base uppercase">
            content
          </h3>
          <div className="flex gap-2 justify-start items-center py-1 px-2 rounded-lg hover:bg-tertiary-gray-700">
            <CiUser className="size-[18px]" />
            <p className="font-inter font-normal text-sm mt-1">About</p>
          </div>
          <div className="flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-tertiary-gray-700">
            <AiOutlineLink className="size-[18px]" />
            <p className="font-inter font-normal text-sm my-1">Links</p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-1">
          <h3 className="pl-3 font-inter font-medium text-base uppercase">
            Lead Capture
          </h3>
          <div className="flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-tertiary-gray-700">
            <RiFilterLine className="size-[18px]" />
            <p className="font-inter font-normal text-sm mt-1">
              Lead Capture Form
            </p>
          </div>
          <div className="flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-tertiary-gray-700">
            <MdOutlineEmail className="size-[18px]" />
            <p className="font-inter font-normal text-sm mt-1">
              Follow Up Email
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <h3 className="pl-3 font-inter font-medium text-base uppercase">
            Lead Capture
          </h3>
          <div className="flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-tertiary-gray-700">
            <MdOutlineQrCode2 className="size-[18px]" />
            <p className="font-inter font-normal text-sm mt-1">QR Code</p>
          </div>
          <div className="flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-tertiary-gray-700">
            <MdOutlineEmail className="size-[18px]" />
            <p className="font-inter font-normal text-sm mt-1">
              Follow Up Email
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNav;
