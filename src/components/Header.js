import React from "react";
import ProfileSel from "./ProfileSel";
import Avatar from "./Avatar";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <ProfileSel />
      <Avatar />
    </header>
  );
};

export default Header;
