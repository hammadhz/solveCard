import React from "react";
import logo from "../assets/svgs/logo.svg";
import { ReactSVG } from "react-svg";
import user from "../assets/svgs/user.svg";
import contact from "../assets/svgs/contact.svg";
import insight from "../assets/svgs/insight.svg";
import setting from "../assets/svgs/setting.svg";
import { Link } from "react-router-dom";

const Sidebar = ({
  // handleMouseOut,
  // handleMouseOver,
  // isHovered,
  sidebarRef,
}) => {
  return (
    <aside
      ref={sidebarRef}
      className={`w-52 h-screen fixed lg:block md:block hidden transition-all duration-300 ease-in-out`}
    >
      <div className="h-full py-8  bg-gradient-to-br from-tertiary-green-60 to-tertiary-green-65">
        <div className="flex flex-col gap-3 items-center">
          <ReactSVG src={logo} className={""} />

          <div className={`flex items-end mb-20`}>
            <p className="font-inter font-bold text-3xl text-white">
              Solve
            </p>
            <span className="font-inter font-medium text-xl text-white">
              Card
            </span>
          </div>

          <nav>
            <ul className="space-y-12 list-none">
              <li>
                <Link to={"/dashboard"} className="flex items-center  gap-4">
                  <ReactSVG src={user} className="" />
                    <span className="font-inter font-normal text-xl text-white">
                      My Card
                    </span>
                </Link>
              </li>
              <li>
                <Link to={"/contacts"} className="flex items-center  gap-4">
                  <ReactSVG src={contact} className="" />
                  <span className="font-inter font-normal text-xl text-white">
                    Contacts
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"/insight"} className="flex items-center  gap-4">
                  <ReactSVG src={insight} className="" />
                    <span className="font-inter font-normal text-xl text-white">
                      Insight
                    </span>
                </Link>
              </li>

              {/*<li>*/}
              {/*  <Link to={"/settings"} className="flex items-center  gap-4">*/}
              {/*    <ReactSVG src={setting} className="" />*/}
              {/*      <span className="font-inter font-normal text-xl text-white">*/}
              {/*        Settings*/}
              {/*      </span>*/}
              {/*  </Link>*/}
              {/*</li>*/}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
