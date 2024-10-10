import React from "react";
import ProfileNav from "./ProfileNav";
import ProfileEd from "./ProfileEd";
import ProfileView from "./ProfileView";

const ProfileEdit = () => {
  return (
    <section className="w-full h-[450px] rounded-2xl px-4 bg-primary">
      <div className="flex">
        <ProfileNav />
        <ProfileEd />
        <ProfileView />
      </div>
    </section>
  );
};

export default ProfileEdit;
