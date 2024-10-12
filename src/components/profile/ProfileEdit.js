import React from "react";
import ProfileNav from "./ProfileNav";
import ProfileEd from "./ProfileEd";
import ProfileView from "./ProfileView";

const ProfileEdit = () => {
  return (
    <section className="w-full h-[480px] rounded-2xl bg-primary">
      <div className="flex">
        <ProfileNav />
        <ProfileEd />
        <ProfileView />
      </div>
    </section>
  );
};

export default ProfileEdit;
