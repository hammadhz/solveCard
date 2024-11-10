import React from "react";
import ProfileSel from "./ProfileSel";
import Avatar from "./Avatar";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ isMobNavOpen, handleMobNav }) => {
  const openMobNav = () => {
    handleMobNav(true);
  };

  return (
    <header className="flex justify-between items-center mb-8 lg:gap-0 md:gap-0 sm:gap-1">
      <div
        onClick={openMobNav}
        className="lg:hidden md:hidden sm:block size-10 flex justify-center items-center bg-tertiary-gray-700 rounded-lg"
      >
        <GiHamburgerMenu />
      </div>
      <ProfileSel />
      <Avatar />
    </header>
  );
};

export default Header;
