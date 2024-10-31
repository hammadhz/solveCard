import React from "react";
import avatar from "../../assets/svgs/avatar.svg";
import { ReactSVG } from "react-svg";
import { Button } from "../form";
import { MdOutlineMail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { useSelector } from "react-redux";

const ProfileViewCard = () => {
  const profilePic = useSelector((state) => state.profile.profilePic);
  const profileCover = useSelector((state) => state.profile.coverPic);

  return (
    <div className="space-y-4">
      {/* card  */}
      <div className="relative w-full rounded-3xl bg-white h-64 p-4 shadow-lg">
        <div className="space-y-10">
          {profileCover ? (
            <img
              src={profileCover}
              className="w-full h-32 rounded-3xl object-cover"
              alt="cover-pic"
            />
          ) : (
            <div className="w-full h-32 bg-primary rounded-3xl"></div>
          )}
          <div className="absolute left-10 top-12 rounded-full size-20 bg-white flex justify-center items-center">
            <div className="  rounded-full size-[70px] bg-primary flex justify-center items-center">
              {profilePic ? (
                <img
                  src={profilePic}
                  className="rounded-full size-[70px] object-cover"
                  alt="profile"
                />
              ) : (
                <ReactSVG src={avatar} />
              )}
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="font-inter text-base font-semibold">Hammad Azam</h1>
            <p className="font-inter text-base font-medium">Sofe</p>
          </div>
        </div>
      </div>
      {/* profile data */}
      <div className="space-y-3">
        <div className="w-full p-3 bg-white rounded-xl flex justify-start items-center shadow-lg">
          Name
        </div>
        <div className="w-full p-3 bg-white rounded-xl flex justify-start items-center shadow-lg">
          Email
        </div>
        <div className="w-full p-3 bg-white rounded-xl flex justify-start items-center shadow-lg">
          Phone
        </div>
      </div>
      {/* <div
        className={`relative w-full rounded-t-3xl  border-t-2 border-r-2 border-l-2 border-black h-[490px] flex flex-col gap-[60px]`}
        style={{ background: `${selectedColor.bgColor}` }}
      >
        <div className="w-full rounded-t-3xl bg-tertiary-gray-700 h-28"></div>
        <div className="absolute left-6 top-16 rounded-full size-24 bg-white flex justify-center items-center">
          <div className="  rounded-full size-[86px] bg-primary flex justify-center items-center">
            <ReactSVG src={avatar} />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full px-3">
          <div className="flex flex-col gap-1">
            <h3
              className={`font-inter font-bold text-lg ${
                selectedColor.bgColor === "#000000"
                  ? "text-[#ffffff]"
                  : `text-[${selectedColor.textColor}]`
              } `}
            >
              Hammad Azam
            </h3>
            <p
              className={`font-inter font-normal text-base ${
                selectedColor.bgColor === "#000000"
                  ? "text-[#ffffff]"
                  : `text-[${selectedColor.textColor}]`
              } `}
            >
              Software Engineer
            </p>
            <p
              className={`font-inter font-normal text-base 
             ${
               selectedColor.bgColor === "#000000"
                 ? "text-[#ffffff]"
                 : `text-[${selectedColor.textColor}]`
             }
            `}
            >
              Pukat
            </p>
          </div>

          <div className="w-full mb-6">
            <button
              className="p-[10px] w-full rounded-3xl flex justify-center items-center"
              style={{
                background: `${selectedColor.btn.bgColor}`,
                color: `${selectedColor.btn.textColor}`,
              }}
            >
              Save Contact
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-start gap-2">
              <div
                className="flex justify-center items-center size-8 rounded-md shadow-lg"
                style={{ background: `${selectedLinkColor?.emailColor}` }}
              >
                <MdOutlineMail className="size-6 text-white" />
              </div>
              <p
                className={`font-inter text-base font-normal 
               ${
                 selectedColor.bgColor === "#000000"
                   ? "text-[#ffffff]"
                   : `text-[${selectedColor.textColor}]`
               }
              `}
              >
                Email
              </p>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div
                className="flex justify-center items-center size-8 rounded-md  shadow-lg"
                style={{ background: `${selectedLinkColor?.phoneColor}` }}
              >
                <IoMdCall className="size-6 text-white" />
              </div>
              <p
                className={`font-inter text-base font-normal 
               ${
                 selectedColor.bgColor === "#000000"
                   ? "text-[#ffffff]"
                   : `text-[${selectedColor.textColor}]`
               }
              `}
              >
                Call
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileViewCard;
