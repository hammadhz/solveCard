import React from "react";
import ProfileNav from "./ProfileNav";
import ProfileEd from "./ProfileEd";
import ProfileView from "./ProfileView";

const ProfileEdit = () => {
  return (
    <section className="w-full h-full lg:h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-4 rounded-2xl bg-primary p-4">
        <ProfileNav />
        <ProfileEd />
        <ProfileView />
    </section>
  );
};

export default ProfileEdit;
