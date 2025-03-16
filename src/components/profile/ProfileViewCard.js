import React, { useEffect, useState } from "react";
import avatar from "../../assets/svgs/avatar.svg";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";
import {Button} from "../form";

const ProfileViewCard = () => {
  const userData = useSelector((state) => state.profile.profileViewData);
  const selectedThemeColor = useSelector((state) => state.profile.themeColor);
  const selectedTextColor = useSelector((state) => state.profile.textColor);
  const [layout, setLayout] = useState("center");

  console.log(userData, 'userData');
  const [photoData, setProfilePicData] = useState({
    url: "",
    base64Str: "",
  });

  const [coverPhotoData, setCoverPicData] = useState({
    url: "",
    base64Str: "",
  });

  useEffect(() => {
    setLayout(userData?.work_position ?? "center");
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

  // console.log(photoData, 'photoData');
  //   console.log(coverPhotoData, 'coverPhotoData');

  return (
    <div className="space-y-4 h-full">

      <div className={`w-full min-h-full rounded-t-3xl shadow-lg border`} style={{ background: selectedThemeColor }}>
        <div className="h-32 relative">
          <div className={"w-full h-full rounded-t-3xl"}>
            {userData?.cover_photo ? (
                  <>
                    {coverPhotoData?.base64Str ? (
                        <img
                            src={userData?.cover_photo}
                            className="w-full h-full rounded-t-3xl object-cover"
                            alt="cover-pic"
                        />
                    ) : coverPhotoData?.url ? (
                        <img
                            src={`${process.env.REACT_APP_SERVER}${coverPhotoData.url}`}
                            className="w-full h-full rounded-t-3xl object-cover"
                            alt="cover-pic"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-500 rounded-t-3xl"></div>
                    )}
                  </>
              ) :
              <div className="w-full h-full bg-tertiary-gray-700 rounded-t-3xl"></div>
            }
          </div>
          <div className={`absolute ${layout === 'left' ? 'left-4'
              : (layout === 'right' ? 'right-4' : 'left-1/2 -translate-x-1/2') } -bottom-1/2 w-[40%] aspect-square overflow-hidden rounded-full border-white border-4`}>
            {userData?.photo ? (
                <>
                  {photoData.base64Str ? (
                      <img
                          src={userData.photo}
                          className="rounded-full w-full h-full object-cover"
                          alt="profile"
                      />
                  ) : photoData?.url ? (
                      <img
                          src={`${process.env.REACT_APP_SERVER}${photoData.url}`}
                          className="rounded-full w-full h-full object-cover"
                          alt="profile"
                      />
                  ) : (
                      <ReactSVG src={avatar} />
                  )}
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <img src={avatar} alt="" className={"w-1/2"}/>
                </div>
            )}
          </div>
        </div>
        <div className={`w-full flex flex-col 
            ${layout === 'left' ? 'justify-start items-start text-left' 
            : (layout === 'right' ? 'justify-end items-end text-right' : 'justify-center items-center text-center') }
             mt-20 px-4`}>
          <h3 style={{ color: selectedTextColor }}>{userData?.name}</h3>
          <p style={{ color: selectedTextColor }}>{userData?.job_title}</p>
          <p style={{ color: selectedTextColor }}>{userData?.company}</p>
          <p style={{ color: selectedTextColor }}>{userData?.address}</p>
          <p style={{ color: selectedTextColor }} className={`break-all mt-1`}>{userData?.bio}</p>
        </div>
        <div className={"w-full flex justify-center items-center mt-4 px-4"}>
          <Button
              style={{ background: selectedTextColor, color: 'white', borderColor: selectedTextColor }}
              intent={"secondary"}
              children={"Update"}
              size={"md"}
              roundness={"round"}
              classes={`w-full`}
          />
        </div>
        <div className={
          layout === 'left' ? 'w-full flex flex-col items-start text-left gap-2 px-4 my-4' : layout === 'right' ? 'w-full flex flex-col items-end text-right gap-2 px-4 my-4' : 'w-full flex flex-wrap items-start justify-center gap-2 px-4 my-4'
        }>
          {userData?.platforms?.filter(platform => platform.direct).map((platform, index) => (
              <div key={index}
                   className={
                     layout === 'left' ? 'w-full flex flex-row items-center justify-start gap-2' : layout === 'right' ? 'w-full flex flex-row-reverse items-center justify-start gap-2' : 'flex flex-col items-center justify-start gap-2'
                   }
                   style={{ width: layout === 'center' ? 'calc(33.33% - 8px)' : '100%' }}>
                <div style={{ width: layout === 'center' ? '100%' : '80px' }}>
                  <img className="w-full" src={`${process.env.REACT_APP_SERVER}${platform.icon}`} alt={platform.title}/>
                </div>
                <p className={`font-inter text-base font-normal text-center`} style={{ color: selectedTextColor }}>
                  {platform.label ?? platform.title}
                </p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileViewCard;
