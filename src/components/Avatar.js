import React, { useState } from "react";
import avatar from "../assets/svgs/avatar.svg";
import { ReactSVG } from "react-svg";
import { IoIosLogOut, IoIosMan, IoIosUnlock, IoMdPerson } from "react-icons/io";
import axiosInstance from "../utils/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../context/slice/authSlice";

const Avatar = () => {
  const [openDropDn, setOpenDropDn] = useState(false);
  const userData = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Your logout logic here
    try {
      const response = await axiosInstance.get("/logout", {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      if (response.status === 200) {
        dispatch(logout());
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="relative">
      <div
        className="bg-white shadow-md size-10 rounded-full flex justify-center items-center cursor-pointer"
        onClick={() => setOpenDropDn(!openDropDn)}
      >
        <ReactSVG src={avatar} />
      </div>
      {openDropDn && (
        <div className="absolute right-5 top-14 w-max p-2 bg-white border drop-shadow-md z-40 flex flex-col gap-1 rounded-lg cursor-pointer">
          <div
            className="w-full hover:bg-primary p-2 flex gap-1 items-center"
            onClick={handleLogout}
          >
            <IoMdPerson className="size-5" />
            <p className=" font-inter font-normal text-base ">Profile</p>
          </div>
          <div
            className="w-full hover:bg-primary p-2 flex gap-1 items-center"
            onClick={handleLogout}
          >
            <IoIosUnlock className="size-5" />
            <p className=" font-inter font-normal text-base ">
              Change Password
            </p>
          </div>
          <div
            className="w-full hover:bg-primary p-2 flex gap-1 items-center"
            onClick={handleLogout}
          >
            <IoIosLogOut className="size-5" />
            <p className=" font-inter font-normal text-base ">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
