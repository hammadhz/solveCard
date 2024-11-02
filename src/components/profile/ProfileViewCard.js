import React, { useEffect, useState } from "react";
import avatar from "../../assets/svgs/avatar.svg";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";

const ProfileViewCard = () => {
  const userData = useSelector((state) => state.profile.profileViewData);
  const [profilePicData, setProfilePicData] = useState({
    url: "",
    base64Str: "",
  });

  const [coverPicData, setCoverPicData] = useState({
    url: "",
    base64Str: "",
  });

  useEffect(() => {
    if (userData?.photo) {
      if (userData?.photo.startsWith("data:image/")) {
        setProfilePicData((prev) => ({
          ...prev,
          base64Str: userData.photo,
        }));
      }
      if (userData?.photo.startsWith("uploads/")) {
        setProfilePicData((prev) => ({
          ...prev,
          url: userData.photo,
        }));
      }
    }
    if (userData?.cover_photo) {
      if (userData?.cover_photo.startsWith("data:image/")) {
        setCoverPicData((prev) => ({
          ...prev,
          base64Str: userData.cover_photo,
        }));
      }
      if (userData?.cover_photo.startsWith("uploads/")) {
        setCoverPicData((prev) => ({
          ...prev,
          url: userData.cover_photo,
        }));
      }
    }
  }, [userData]);

  return (
    <div className="space-y-4">
      {/* card  */}
      <div className="relative w-full rounded-3xl bg-white h-64 p-4 shadow-lg">
        <div className="space-y-10">
          {userData.cover_photo && (
            <>
              {coverPicData?.base64Str ? (
                <img
                  src={userData.cover_photo}
                  className="w-full h-32 rounded-3xl object-cover"
                  alt="cover-pic"
                />
              ) : coverPicData?.url ? (
                <img
                  src={`${process.env.REACT_APP_SERVER}${coverPicData.url}`}
                  className="w-full h-32 rounded-3xl object-cover"
                  alt="cover-pic"
                />
              ) : (
                <div className="w-full h-32 bg-primary rounded-3xl"></div>
              )}
            </>
          )}
          <div className="absolute left-10 top-12 rounded-full size-20 bg-white flex justify-center items-center">
            <div className="  rounded-full size-[70px] bg-primary flex justify-center items-center">
              {userData?.photo && (
                <>
                  {profilePicData.base64Str ? (
                    <img
                      src={userData.photo}
                      className="rounded-full size-[70px] object-cover"
                      alt="profile"
                    />
                  ) : profilePicData?.url ? (
                    <img
                      src={`${process.env.REACT_APP_SERVER}${profilePicData.url}`}
                      className="rounded-full size-[70px] object-cover"
                      alt="profile"
                    />
                  ) : (
                    <ReactSVG src={avatar} />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="font-inter text-base font-semibold">
              {userData?.name ? userData.name : "User"}
            </h1>
            <p className="font-inter text-base font-medium">
              {userData?.job_title ? userData.job_title : "Engineer"}
            </p>
          </div>
        </div>
      </div>
      {/* profile data */}
      {userData && (
        <div className="space-y-3">
          <div className="w-full p-3 bg-white rounded-xl flex justify-start items-center shadow-lg">
            {userData?.email}
          </div>
          <div className="w-full p-3 bg-white rounded-xl flex justify-start items-center shadow-lg">
            {userData?.dob}
          </div>
          <div className="w-full p-3 bg-white rounded-xl flex justify-start items-center shadow-lg">
            {userData?.phone}
          </div>
          <div className="w-full p-3 bg-white rounded-xl flex justify-start items-center shadow-lg">
            {userData?.company}
          </div>
          <div className="w-full p-3 h-24 bg-white rounded-xl flex justify-start items-start shadow-lg">
            {userData?.address}
          </div>
          <div className="w-full h-24 p-3 bg-white rounded-xl flex justify-start items-start shadow-lg">
            {userData?.bio}
          </div>
        </div>
      )}
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
