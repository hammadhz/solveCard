import React from "react";
import ProfileViewCard from "./ProfileViewCard";

const ProfileView = () => {
  return (
    <section
      className=" flex justify-center lg:mx-0 mx-auto lg:w-80 md:w-80 w-full overflow-y-auto"
      id="profileView"
    >
      <div className="w-full px-6 pt-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 text-center">
            <p className="font-inter font-semibold text-2xl text-black">
              Card live preview
            </p>
            <p className="font-inter font-normal text-xl text-black">
              View Card
            </p>
          </div>
          <ProfileViewCard />
        </div>
      </div>
    </section>
  );
};

export default ProfileView;
