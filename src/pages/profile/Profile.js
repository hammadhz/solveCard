import React from "react";
import { ProfileEdit } from "../../components/profile";
import Searchbar from "../../components/Searchbar";
import Avatar from "../../components/Avatar";

const Profile = () => {
  return (
    <div className="">
      <header className="flex justify-between items-center mb-8">
        <Searchbar />
        <Avatar />
      </header>

      {/* profile edit */}
      <ProfileEdit />
    </div>
  );
};

export default Profile;
