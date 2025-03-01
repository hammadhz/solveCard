import React from "react";
import { ReactSVG } from "react-svg";
import avatar from "../../assets/svgs/avatar.svg";
import { Button } from "../form";
import edit from "../../assets/svgs/edit.svg";
import NavLink from "../NavLink";
import { useDispatch, useSelector } from "react-redux";
import {sectionLink, setPlatform, setProfileData} from "../../context/slice/profileSlice";

const ProfileCard = (result) => {
  console.log("result", result);
  const profileId = useSelector((state) => state.profile.profileId);
  const dispatch = useDispatch();
  const profileDataDispatch = (data) => {
    dispatch(sectionLink("about"));
    dispatch(setProfileData(data));
    dispatch(setPlatform(data.platforms));
  };

  return (
    <div
      key={result?.id}
      className={`bg-primary  p-4 rounded-2xl relative flex flex-col justify-between ${
        Number(profileId) === result?.id
          ? "border border-tertiary-green-50"
          : ""
      }`}
    >
      <div className="bg-tertiary-gray-700 rounded-t-2xl w-full h-32">
      {result.cover_photo && (
          <img
              src={`${process.env.REACT_APP_SERVER}${result.cover_photo}`}
              className="w-full h-32 rounded-t-2xl object-cover"
              alt="cover_photo"
          />
      )}
      </div>
      {result.photo && (
          <img
              src={`${process.env.REACT_APP_SERVER}${result.photo}`}
          className="size-20 rounded-full border border-secondary object-cover flex justify-center items-center z-40 absolute top-24 left-1/2 transform -translate-x-1/2"
          alt="profile"
        />
      )}
      {!result.photo && (
        <div className="size-20 rounded-full border border-secondary bg-primary flex justify-center items-center z-40 absolute top-24 left-1/2 transform -translate-x-1/2">
          <ReactSVG src={avatar} />
        </div>
      )}
      <div className="flex flex-col justify-center items-center gap-2 mt-12">
        <h3 className="font-inter font-semibold text-lg">{result?.name}</h3>
        <p className="font-inter font-normal text-base">{result?.job_title}</p>
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
            href={`/profile/${result?.id}`}
            eventAction={() => profileDataDispatch(result)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
