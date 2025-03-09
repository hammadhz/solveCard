import React, {useState, useEffect} from "react";
import { ReactSVG } from "react-svg";
import avatar from "../../assets/svgs/avatar.svg";
import {Button, Input} from "../form";
import edit from "../../assets/svgs/edit.svg";
import NavLink from "../NavLink";
import { useDispatch, useSelector } from "react-redux";
import {sectionLink, setProfileData} from "../../context/slice/profileSlice";
import {toast} from "react-toastify";
import QRCode from "react-qr-code";
import logo from "../../assets/svgs/logo.svg";


const ProfileCard = (result) => {
  const profileId = useSelector((state) => state.profile.profileId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [qrColor, setQrColor] = useState("#2A9562");

  const dispatch = useDispatch();

  useEffect(() => {
    if (result?.card_uuid) {
      setQrValue(result.card_uuid);
    }

    // Get QR color from profile if available
    if (result?.button_color) {
      setQrColor(result.button_color?.color_code || "#000000");
    }
  }, [result]);
  const profileDataDispatch = (data) => {
    dispatch(sectionLink("about"));
    dispatch(setProfileData(data));
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
                  {"Share Card"}
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
              {/* QR Code Section */}
              <div className="my-4 flex flex-col items-center">
                <h4 className="text-lg font-medium mb-2 text-center">Scan QR Code</h4>
                <div className="bg-white rounded-lg shadow-sm inline-block">
                  <div className="relative">
                    <QRCode
                        id="profile-qr-code"
                        value={qrValue}
                        size={170}
                        fgColor={result?.qr_color || qrColor}
                        style={{ maxWidth: "100%", height: "auto" }}
                        level="H"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                          src={ result?.qr_logo ? `${process.env.REACT_APP_SERVER}${result.qr_logo}` : logo}
                          className="h-11 w-11 object-contain bg-white rounded-md"
                          alt="QR logo"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Scan the code by placing camera in front of code</p>
              </div>
              <div className="px-8">
                <div className="py-6 border-t">
                  <p className="text-lg font-medium mb-2 text-center">Share Profile Link</p>
                  <div className="w-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full px-3 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap text-gray-600">
                      {result?.card_uuid}
                    </div>
                    <button
                        onClick={handleCopyLink}
                        className="bg-secondary hover:bg-tertiary-green-65 transition-colors text-white px-4 py-2 h-full flex items-center justify-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Share this link to let others view your profile
                  </p>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default ProfileCard;
