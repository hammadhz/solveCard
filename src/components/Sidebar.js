import React from "react";
import logo from "../assets/svgs/logo.svg";
import { ReactSVG } from "react-svg";
import user from "../assets/svgs/user.svg";
import contact from "../assets/svgs/contact.svg";
import insight from "../assets/svgs/insight.svg";
import support from "../assets/svgs/support.svg";
import setting from "../assets/svgs/setting.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64">
      <div className="h-full px-3 py-8 overflow-y-auto bg-gradient-to-br from-tertiary-green-30 to-tertiary-green-50">
        <div className="flex flex-col gap-3 items-center">
          <ReactSVG src={logo} className="" />
          <div className="flex items-end mb-6">
            <p className="font-inter font-bold text-3xl text-white">Solve</p>
            <span className="font-inter font-medium text-xl text-white">
              Card
            </span>
          </div>

          <nav>
            <ul className="space-y-7 list-none">
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center justify-center gap-4"
                >
                  <ReactSVG src={user} className="" />
                  <span className="font-inter font-normal text-base text-white">
                    My Card
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/contacts"}
                  className="flex items-center justify-center gap-4"
                >
                  <ReactSVG src={contact} className="" />
                  <span className="font-inter font-normal text-base text-white">
                    Contacts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/insight"}
                  className="flex items-center justify-center gap-4"
                >
                  <ReactSVG src={insight} className="" />
                  <span className="font-inter font-normal text-base text-white">
                    Insight
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/support"}
                  className="flex items-center justify-center gap-4"
                >
                  <ReactSVG src={support} className="" />
                  <span className="font-inter font-normal text-base text-white">
                    Support
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/settings"}
                  className="flex items-center justify-center gap-4"
                >
                  <ReactSVG src={setting} className="" />
                  <span className="font-inter font-normal text-base text-white">
                    Settings
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
