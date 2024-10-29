import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const sidebarRef = useRef(null);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="">
      <Sidebar
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        isHovered={isHovered}
        sidebarRef={sidebarRef}
      />
      <div
        className={`p-4 bg-white min-h-screen ${
          isHovered ? "sm:ml-64" : "sm:ml-32"
        }`}
      >
        <Header />
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
