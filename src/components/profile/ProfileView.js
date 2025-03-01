import React from "react";
import ProfileViewCard from "./ProfileViewCard";
import { CiShare1 } from "react-icons/ci";
import {BsShare} from "react-icons/bs";
import {Link} from "react-router-dom";

const ProfileView = () => {
  return (
    <section
      className="w-full lg:w-3/12 lg:col-span-2 justify-center overflow-y-auto"
      id="profileView"
    >
      <div className="w-full flex-col gap-4 py-4 h-full">
        <div className="flex flex-col gap-4 text-center mb-2">
          <div className="text-start w-full">
            <h1 className="font-inter font-bold text-xl">
              Card live preview
            </h1>
          </div>
          <Link className="font-normal text-md text-blue-400" to={""}>
            View Card <CiShare1 className="font-extrabold text-base inline-block" />
          </Link>
        </div>
        <ProfileViewCard />
      </div>
    </section>
  );
};

export default ProfileView;
