import React from "react";
import { CiUser } from "react-icons/ci";
import { AiOutlineLink } from "react-icons/ai";
import { RiFilterLine } from "react-icons/ri";
import { MdOutlineEmail, MdOutlineQrCode2 } from "react-icons/md";
import { useDispatch } from "react-redux";
import { sectionLink } from "../../context/slice/profileSlice";

const ProfileNav = () => {
  const dispatch = useDispatch();

  const handleLinks = (link) => {
    dispatch(sectionLink(link));
  };

  return (
    <nav
      className="h-full flex justify-center w-56 px-2 overflow-y-auto rounded-xl bg-white"
      id="profileNav"
    >
      <div className="flex flex-col gap-8 items-start py-6 w-full">
        {/* Section: Content */}
        <div className="flex flex-col w-full gap-2">
          <h3 className="pl-3 font-inter font-semibold text-xl text-gray-600 uppercase">
            Content
          </h3>

          {/* About Link */}
          <div
            className="flex gap-2 items-center p-2 rounded hover:bg-gray-200 cursor-pointer transition duration-300 group"
            onClick={() => handleLinks("about")}
          >
            <CiUser className="text-lg text-black group-hover:text-black transition duration-300" />
            <p className="font-inter font-medium text-sm text-gray-700 group-hover:text-black transition duration-300">
              About
            </p>
          </div>

          {/* Links Link */}
          <div
            className="flex gap-2 items-center p-2 rounded hover:bg-gray-200 cursor-pointer transition duration-300 group"
            onClick={() => handleLinks("links")}
          >
            <AiOutlineLink className="text-lg text-black group-hover:text-black transition duration-300" />
            <p className="font-inter font-medium text-sm text-gray-700 group-hover:text-black transition duration-300">
              Links
            </p>
          </div>

          {/* Links View */}
          {/*<div*/}
          {/*  className="flex gap-2 items-center p-2 rounded hover:bg-gray-200 cursor-pointer transition duration-300 group"*/}
          {/*  onClick={() => handleLinks("linkView")}*/}
          {/*>*/}
          {/*  <AiOutlineLink className="text-lg text-black group-hover:text-black transition duration-300" />*/}
          {/*  <p className="font-inter font-medium text-sm text-gray-700 group-hover:text-black transition duration-300">*/}
          {/*    Links View*/}
          {/*  </p>*/}
          {/*</div>*/}
        </div>

        {/* Section: Lead Capture */}
        {/*<div className="flex flex-col w-full gap-2">*/}
        {/*  <h3 className="pl-3 font-inter font-semibold text-xl text-gray-600 uppercase">*/}
        {/*    Lead Capture*/}
        {/*  </h3>*/}

        {/*  /!* Lead Capture Form *!/*/}
        {/*  <div className="flex gap-2 items-center p-2 rounded hover:bg-gray-200 cursor-pointer transition duration-300 group">*/}
        {/*    <RiFilterLine className="text-lg text-black group-hover:text-black transition duration-300" />*/}
        {/*    <p className="font-inter font-medium text-sm text-gray-700 group-hover:text-black transition duration-300">*/}
        {/*      Lead Capture Form*/}
        {/*    </p>*/}
        {/*  </div>*/}

        {/*  /!* Follow Up Email *!/*/}
        {/*  <div className="flex gap-2 items-center p-2 rounded hover:bg-gray-200 cursor-pointer transition duration-300 group">*/}
        {/*    <MdOutlineEmail className="text-lg text-black group-hover:text-black transition duration-300" />*/}
        {/*    <p className="font-inter font-medium text-sm text-gray-700 group-hover:text-black transition duration-300">*/}
        {/*      Follow Up Email*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Section: QR Code */}
        {/*<div className="flex flex-col w-full gap-2">*/}
        {/*  <h3 className="pl-3 font-inter font-semibold text-xl text-gray-600 uppercase">*/}
        {/*    QR Code*/}
        {/*  </h3>*/}

        {/*  /!* QR Code *!/*/}
        {/*  <div className="flex gap-2 items-center p-2 rounded hover:bg-gray-200 cursor-pointer transition duration-300 group">*/}
        {/*    <MdOutlineQrCode2 className="text-lg text-black group-hover:text-black transition duration-300" />*/}
        {/*    <p className="font-inter font-medium text-sm text-gray-700 group-hover:text-black transition duration-300">*/}
        {/*      QR Code*/}
        {/*    </p>*/}
        {/*  </div>*/}

        {/*  /!* Follow Up Email *!/*/}
        {/*  <div className="flex gap-2 items-center p-2 rounded hover:bg-gray-200 cursor-pointer transition duration-300 group">*/}
        {/*    <MdOutlineEmail className="text-lg text-black group-hover:text-black transition duration-300" />*/}
        {/*    <p className="font-inter font-medium text-sm text-gray-700 group-hover:text-black transition duration-300">*/}
        {/*      Follow Up Email*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </nav>
  );
};

export default ProfileNav;
