import React, { useState, useRef } from "react";
import { Button, Input, TextArea } from "../form";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import {
  MdColorize,
  MdGifBox,
  MdOutlinePhotoLibrary,
  MdPhotoLibrary,
} from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { TiCancel } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  resetColor,
  resetLinkColor,
  selectColor,
  selectLinkColor,
} from "../../context/slice/profileSlice";
import ColorPicker from "react-pick-color";
import About from "./About";
import Link from "./Link";
import LinkView from "./LinkView";

const ProfileEd = () => {
  const linkData = useSelector((state) => state.profile.sectionLnk);

  const [pickerColor, setPickerColor] = useState("#ffffff");
  const [isPickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  const dispatch = useDispatch();
  const { register } = useForm();

  const handleSelectColor = (color) => {
    dispatch(selectColor(color));
  };

  const handleLinkSelectColor = (color) => {
    dispatch(selectLinkColor(color));
  };

  const togglePicker = () => {
    setPickerOpen(!isPickerOpen);
  };

  // const handleOutsideClick = (event) => {
  //   // Close the picker if clicked outside
  //   if (pickerRef.current && !pickerRef.current.contains(event.target)) {
  //     setPickerOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, []);

  return (
    <>
      {linkData === "about" && <About />}
      {linkData === "links" && <Link />}
      {/* {linkData === "linkView" && <LinkView />} */}
    </>
  );
};

export default ProfileEd;
