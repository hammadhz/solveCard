import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import MobNav from "../components/MobNav";

const MainLayout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobNavOpen, setIsMobNavOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleMobNav = (value) => {
    setIsMobNavOpen(value);
  };

  const handleClose = () => {
    setIsMobNavOpen(false);
  };

  return (
    <div className="">
      <Sidebar
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        isHovered={isHovered}
        sidebarRef={sidebarRef}
      />
      <MobNav
        isMobNavOpen={isMobNavOpen}
        handleMobNav={handleMobNav}
        handleClose={handleClose}
      />
      <div
        className={`p-4 bg-white min-h-screen ${
          isHovered ? "sm:ml-64" : "md:ml-32"
        }`}
      >
        <Header isMobNavOpen={isMobNavOpen} handleMobNav={handleMobNav} />
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
