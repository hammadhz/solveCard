import React, {useState} from "react";
import { ReactSVG } from "react-svg";
import avatar from "../../assets/svgs/avatar.svg";
import {Button, Input} from "../form";
import edit from "../../assets/svgs/edit.svg";
import NavLink from "../NavLink";
import { useDispatch, useSelector } from "react-redux";
import {sectionLink, setPlatform, setProfileData} from "../../context/slice/profileSlice";
import {toast} from "react-toastify";

const ProfileCard = (result) => {
  const profileId = useSelector((state) => state.profile.profileId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const profileDataDispatch = (data) => {
    dispatch(sectionLink("about"));
    dispatch(setProfileData(data));
    dispatch(setPlatform(data.platforms));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(result?.card_uuid);
    toast.success("Link copied to clipboard!");
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
          className="size-20 rounded-full border border-secondary object-cover flex justify-center items-center z-10 absolute top-24 left-1/2 transform -translate-x-1/2"
          alt="profile"
        />
      )}
      {!result.photo && (
        <div className="size-20 rounded-full border border-secondary bg-primary flex justify-center items-center z-10 absolute top-24 left-1/2 transform -translate-x-1/2">
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
            eventAction={() => setIsModalOpen(true)}
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
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg shadow w-full max-w-lg">
              <div className="flex items-center justify-between p-2 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  {"Share Profile"}
                </h3>
                <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                >
                  <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                  >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4">
                <p className="text-xl text-black mb-2">Profile Link</p>
                <div className="w-full flex items-center justify-between gap-4">
                  <Input
                      type="text"
                      name="company"
                      value={result?.card_uuid}
                      intent="primary"
                      size="md"
                      classes="w-full block p-2.5"
                      parentDivH="w-full"
                      roundness="round-sm"
                      placeholder="Company"
                      custom="custom"
                  />
                  <Button
                      type="button"
                      intent="primary"
                      size="sm"
                      children="Copy Link"
                      classes="ml-2 text-nowrap"
                      eventAction={handleCopyLink}
                  />
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default ProfileCard;
