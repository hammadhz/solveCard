import React from "react";
import ProfileNav from "./ProfileNav";
import ProfileEd from "./ProfileEd";
import ProfileView from "./ProfileView";

const ProfileEdit = () => {
  return (
    <section className="w-full h-full rounded-2xl bg-primary p-8">
      <div className="flex gap-8 h-full">
        <ProfileNav />
        <ProfileEd />
        <ProfileView />
      </div>
    </section>
  );
};

export default ProfileEdit;
