import React from "react";
import { ReactSVG } from "react-svg";
import avatar from "../../assets/svgs/avatar.svg";
import { Button } from "../form";
import edit from "../../assets/svgs/edit.svg";
import NavLink from "../NavLink";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const userData = useSelector((state) => state.auth.userInfo);
  console.log(userData);
  return (
    <div className="bg-primary h-[300px] p-2 rounded-2xl relative flex flex-col justify-between">
      <div className="bg-tertiary-gray-700 rounded-t-2xl w-full h-32"></div>
      <div className="size-20 rounded-full bg-primary flex justify-center items-center z-40 absolute top-24 left-1/2 transform -translate-x-1/2">
        <ReactSVG src={avatar} />
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <h3 className="font-inter font-semibold text-lg">
          {userData?.user?.name}
        </h3>
        <p className="font-inter font-normal text-base">Software Engineer</p>
        <div className="flex gap-2 items-center">
          <Button
            type={"button"}
            intent={"primary"}
            size={"md"}
            children={"Share"}
            classes={""}
          />

          <NavLink
            intent={"secondary"}
            size={"md"}
            content={"Edit"}
            classes={"gap-2"}
            iconLeft={edit}
            href={"/profile"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
