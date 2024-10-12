import React from "react";
import avatar from "../../assets/svgs/avatar.svg";
import { ReactSVG } from "react-svg";
import { Button } from "../form";
import { MdOutlineMail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";

const ProfileViewCard = () => {
  return (
    <div className="relative w-full rounded-t-3xl  border-t-2 border-r-2 border-l-2 border-black h-[490px] bg-white flex flex-col gap-[60px]">
      <div className="w-full rounded-t-3xl bg-tertiary-gray-700 h-28"></div>
      <div className="absolute left-6 top-16 rounded-full size-24 bg-white flex justify-center items-center">
        <div className="  rounded-full size-[86px] bg-primary flex justify-center items-center">
          <ReactSVG src={avatar} />
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full px-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-inter font-bold text-lg text-black">
            Hammad Azam
          </h3>
          <p className="font-inter font-normal text-base text-black">
            Software Engineer
          </p>
          <p className="font-inter font-normal text-base text-black">Pukat</p>
        </div>

        <div className="w-full mb-6">
          <Button
            intent={"secondary"}
            classes={"!bg-black w-full !p-[10px] !text-white"}
            size={"lg"}
            roundness={"round"}
            children={"Save Contact"}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-2">
            <MdOutlineMail className="size-8" />
            <p className="font-inter text-base font-normal">Email</p>
          </div>
          <div className="flex items-center justify-start gap-2">
            <IoMdCall className="size-8" />
            <p className="font-inter text-base font-normal">Call</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewCard;
