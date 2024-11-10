import React from "react";
import logo from "../assets/svgs/logo.svg";
import { ReactSVG } from "react-svg";
import user from "../assets/svgs/user.svg";
import contact from "../assets/svgs/contact.svg";
import insight from "../assets/svgs/insight.svg";
import setting from "../assets/svgs/setting.svg";
import { Link } from "react-router-dom";
import { GiCancel } from "react-icons/gi";

const MobNav = ({ isMobNavOpen, handleMobNav, handleClose }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-gradient-to-br from-tertiary-green-60 to-tertiary-green-65 transition-all duration-300 ease-in-out lg:hidden md:hidden block ${
        isMobNavOpen
          ? "translate-x-0 w-full opeacity-100 pointer-events-auto"
          : "translate-x-full w-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="h-full px-3 py-8 flex flex-col items-center">
        <button onClick={handleClose} className="absolute top-3 right-4">
          <GiCancel className="h-6 w-6 text-white" />
        </button>
        <ReactSVG src={logo} className="" />

        <nav className="flex flex-col items-center mt-10">
          <ul className="space-y-8 list-none">
            <li>
              <Link
                to="/dashboard"
                onClick={handleClose}
                className="flex flex-col items-center"
              >
                <ReactSVG src={user} className="" />
                <span className="font-inter font-normal text-sm text-white">
                  My Card
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/contacts"
                onClick={handleClose}
                className="flex flex-col items-center"
              >
                <ReactSVG src={contact} className="" />
                <span className="font-inter font-normal text-sm text-white">
                  Contacts
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/insight"
                onClick={handleClose}
                className="flex flex-col items-center"
              >
                <ReactSVG src={insight} className="" />
                <span className="font-inter font-normal text-sm text-white">
                  Insight
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                onClick={handleClose}
                className="flex flex-col items-center"
              >
                <ReactSVG src={setting} className="" />
                <span className="font-inter font-normal text-sm text-white">
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MobNav;
