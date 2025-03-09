import React, { useState } from "react";
import avatar from "../assets/svgs/avatar.svg";
import { ReactSVG } from "react-svg";
import { IoIosLogOut, IoIosUnlock, IoMdPerson } from "react-icons/io";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../context/slice/authSlice";
import Cookies from "js-cookie";
import rightIcon from "../assets/svgs/right-arrow.svg";
import {Button} from "./form";

const Avatar = () => {
  const [openDropDn, setOpenDropDn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/logout");
      if (response.status === 200) {
        dispatch(logout());
        navigate("/");
        Cookies.remove("token");
      }
    } catch (err) {
      console.error(err);
    } finally {
        setLoading(false);
      setShowLogoutModal(false);
    }
  };
  return (
    <div className="relative">
      <div
          className="w-full hover:bg-primary p-2 flex gap-1 items-center cursor-pointer"
          onClick={handleLogoutClick}
      >
        <IoIosLogOut className="size-5" />
        <p className=" font-inter font-normal text-base ">Logout</p>
      </div>

      {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
              <p className="mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-2">
                <Button
                    type={"button"}
                    children={"Cancel"}
                    intent={"secondary"}
                    size={"sm"}
                    classes={"gap-2"}
                    eventAction={cancelLogout}
                />
                <Button
                    type={"submit"}
                    children={"Logout"}
                    intent={"secondary"}
                    size={"sm"}
                    classes={"gap-2 !bg-red-600 text-white !hover:bg-red-700 transition border-none"}
                    loading={loading}
                    eventAction={handleLogout}
                />
              </div>
            </div>
          </div>
      )}
      {/*<div*/}
      {/*  className="bg-white shadow-md size-10 rounded-full flex justify-center items-center cursor-pointer"*/}
      {/*  onClick={() => setOpenDropDn(!openDropDn)}*/}
      {/*>*/}
      {/*  <ReactSVG src={avatar} />*/}
      {/*</div>*/}
      {/*{openDropDn && (*/}
      {/*  <div className="absolute right-5 top-14 w-max p-2 bg-white border drop-shadow-md z-40 flex flex-col gap-1 rounded-lg cursor-pointer">*/}
      {/*    <div*/}
      {/*      className="w-full hover:bg-primary p-2 flex gap-1 items-center"*/}
      {/*      onClick={handleLogout}*/}
      {/*    >*/}
      {/*      <IoMdPerson className="size-5" />*/}
      {/*      <p className=" font-inter font-normal text-base ">Profile</p>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="w-full hover:bg-primary p-2 flex gap-1 items-center"*/}
      {/*      onClick={handleLogout}*/}
      {/*    >*/}
      {/*      <IoIosUnlock className="size-5" />*/}
      {/*      <p className=" font-inter font-normal text-base ">*/}
      {/*        Change Password*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="w-full hover:bg-primary p-2 flex gap-1 items-center"*/}
      {/*      onClick={handleLogout}*/}
      {/*    >*/}
      {/*      <IoIosLogOut className="size-5" />*/}
      {/*      <p className=" font-inter font-normal text-base ">Logout</p>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default Avatar;
