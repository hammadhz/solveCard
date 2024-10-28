import React, { useState, useRef, useEffect } from "react";
import { Button, Input, TextArea } from "../form";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdColorize, MdOutlinePhotoLibrary } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { resetColor, selectColor } from "../../context/slice/profileSlice";
import ColorPicker from "react-pick-color";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";

const About = () => {
  const [pickerColor, setPickerColor] = useState("#ffffff");
  const [isPickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef(null);
  const profilePicInputRef = useRef(null);
  const coverPicInputRef = useRef(null);
  const { id } = useParams();
  const userData = useSelector((state) => state.auth);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    company: "",
    phone: "",
    user_direct: "",
    role: "",
    profilePic: "",
    coverPic: "",
    dob: "",
    gender: "",
  });

  const maxFileSize = 4 * 1024 * 1024;

  const dispatch = useDispatch();
  const { register } = useForm();

  const handleSelectColor = (color) => {
    dispatch(selectColor(color));
  };

  // const handleLinkSelectColor = (color) => {
  //   dispatch(selectLinkColor(color));
  // };

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

  useEffect(() => {
    if (userData?.user) {
      setUserProfile((prev) => ({
        ...prev,
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
        address: userData.user.address,
        company: userData.user.company,
        phone: userData.user.phone,
        user_direct: userData.user.user_direct,
        role: userData.user.work_position,
        dob: userData.user.dob,
        gender: userData.user.gender,
      }));
    }
  }, [userData?.user]);

  const handleProfilePic = () => {
    profilePicInputRef.current.click();
  };

  const handleCoverPhoto = () => {
    coverPicInputRef.current.click();
  };

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxFileSize) {
        console.log("Profile picture size must be less than 4MB.");
        return;
      }
      try {
        const options = {
          maxSizeMB: 4,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserProfile((prev) => ({
            ...prev,
            profilePic: reader.result,
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setUserProfile((prev) => ({
    //     ...prev,
    //     profilePic: reader.result,
    //   }));
    // };
    // reader.readAsDataURL(file);
  };

  const handleCoverPicUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file.size, "size", maxFileSize);
      if (file.size > maxFileSize) {
        console.log("Cover picture size must be less than 4MB.");
        return;
      }
      try {
        const options = {
          maxSizeMB: 4,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserProfile((prev) => ({
            ...prev,
            coverPic: reader.result,
          }));
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setUserProfile((prev) => ({
    //     ...prev,
    //     coverPic: reader.result,
    //   }));
    // };
    // reader.readAsDataURL(file);
  };

  const submitUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/updateProfile", {
        bio: userProfile.bio,
        gender: userProfile.gender,
        dob: userProfile.dob,
        name: userProfile.name,
        cover_photo: userProfile.coverPic,
        photo: userProfile.profilePic,
        address: userProfile.address,
        job_title: userProfile.role,
        company: userProfile.company,
        phone: userProfile.phone,
        branding_color: "",
        profile_id: id,
        email: userProfile.email,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setUserProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckChange = (e) => {
    setUserProfile((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.checked),
    }));
  };

  return (
    <section className="h-full flex justify-center grow bg-primary border-r-2 border-r-white">
      <div className="h-full flex flex-col w-full p-8 rounded-lg bg-white">
        <header className="text-start w-full z-40 mb-8">
          <h1 className="font-inter font-bold text-2xl">About</h1>
        </header>
        <form
          onSubmit={submitUpdateProfile}
          className=" flex flex-col gap-4 w-full"
          id="profileEdit"
        >
          {/* <div className="flex justify-between gap-2 items-center">
            <div className="flex items-center w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"sm"}
                classes={"w-full !p-1"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
            <div className="flex items-center w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <select className="bg-primary w-[140px] flex justify-center items-center font-inter outline-none p-1 rounded-lg">
                <option>none</option>
                <option>data</option>
              </select>
            </div>
          </div> */}

          <div className="flex space-x-4">
            <div className="w-full">
              <label
                htmlFor="first-name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <Input
                type={"text"}
                nameField={"first_name"}
                intent={"primary"}
                id={"first-name"}
                size={"md"}
                value={userProfile?.name}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"first name"}
                custom={"custom"}
                eventAction={handleChange}
              />
              {/* <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John"
                    required
                  /> */}
            </div>
            <div className="w-full">
              <label
                htmlFor="last-name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <Input
                type={"email"}
                nameField={"email"}
                intent={"primary"}
                id={"email"}
                size={"md"}
                value={userProfile?.email}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"Email"}
                custom={"custom"}
                eventAction={handleChange}
              />
              {/* <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Doe"
                    required
                  /> */}
            </div>
          </div>

          <div className="flex justify-around gap-6 py-4">
            {/* Profile Picture Section */}
            <div className="flex flex-col gap-4 items-center">
              {/* Title with Information Icon */}
              <div className="flex items-center gap-2">
                <p className="font-inter text-sm font-medium text-gray-900">
                  Profile Picture
                </p>
                <IoInformationCircleOutline
                  className="text-xl text-gray-500"
                  title="Maximum size: 2MB"
                />
              </div>

              {/* Profile Picture Upload Area */}
              {userProfile.profilePic && (
                <div className="size-full rounded-full">
                  <img
                    src={userProfile.profilePic}
                    className="rounded-full size-28 object-cover"
                    alt=""
                  />
                </div>
              )}
              {!userProfile.profilePic && (
                <div
                  onClick={handleProfilePic}
                  className="flex justify-center items-center rounded-full w-28 h-28 border border-dashed border-gray-400 bg-white hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <RxAvatar className="text-4xl text-gray-500" />
                    <p className="font-inter text-xs text-gray-500 text-center">
                      Select or drag file
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                ref={profilePicInputRef}
                accept=".jpg, .png, .jpeg"
                className="hidden"
                onChange={handleProfilePicUpload}
              />
            </div>

            {/* Cover Photo Section */}
            <div className="flex flex-col gap-4 items-center">
              {/* Title with Information Icon */}
              <div className="flex items-center gap-2">
                <p className="font-inter text-sm font-medium text-gray-900">
                  Cover Photo
                </p>
                <IoInformationCircleOutline
                  className="text-xl text-gray-500"
                  title="Maximum size: 5MB"
                />
              </div>

              {/* Cover Photo Upload Area */}
              {userProfile.coverPic && (
                <div className="h-full w-full">
                  <img
                    src={userProfile.coverPic}
                    className="h-28 w-64 rounded-lg object-cover"
                    alt="cover_pic"
                  />
                </div>
              )}
              {!userProfile.coverPic && (
                <div
                  onClick={handleCoverPhoto}
                  className="flex items-center justify-center rounded-lg h-28 w-64 border border-dashed border-gray-400 bg-white hover:bg-gray-100 transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-2">
                    <MdOutlinePhotoLibrary className="text-3xl text-gray-500" />
                    <p className="font-inter text-xs text-gray-500 text-center">
                      Select image, gif, video, or drag & drop
                    </p>
                  </div>
                </div>
              )}
            </div>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              ref={coverPicInputRef}
              className="hidden"
              onChange={handleCoverPicUpload}
            />
          </div>

          {/* <div className="flex justify-center items-center  gap-4">
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
          </div>

          <div className="flex justify-center items-center  gap-4">
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
          </div> */}

          <div className="flex space-x-4">
            <div className="w-full">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <Input
                type={"text"}
                name={"role"}
                intent={"primary"}
                id={"role"}
                size={"md"}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"Role"}
                custom={"custom"}
                eventAction={handleChange}
              />
              {/* <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John"
                    required
                  /> */}
            </div>
            <div className="w-full">
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-inter font-medium text-gray-900"
              >
                Company
              </label>
              <Input
                type={"text"}
                name={"company"}
                intent={"primary"}
                id={"company"}
                size={"md"}
                value={userProfile.company}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"company"}
                custom={"custom"}
                eventAction={handleChange}
              />
              {/* <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Doe"
                    required
                  /> */}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-full">
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                DOB
              </label>
              <Input
                type={"date"}
                name={"dob"}
                intent={"primary"}
                id={"dob"}
                size={"md"}
                value={userProfile.dob}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"dob"}
                custom={"custom"}
                eventAction={handleChange}
              />
              {/* <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="John"
                    required
                  /> */}
            </div>
            <div className="w-full">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-inter font-medium text-gray-900"
              >
                Gender
              </label>
              <select
                onChange={handleChange}
                name="gender"
                className="w-full block px-2.5 py-3.5  font-inter outline-none bg-primary placeholder:text-sm placeholder:font-normal rounded-md"
              >
                <option value={"1"}>Male</option>
                <option value={"2"}>Female</option>
                <option value={"3"}>Not Share</option>
              </select>

              {/* <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Doe"
                    required
                  /> */}
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-inter font-medium text-gray-900"
            >
              Address
            </label>
            <Input
              type={"text"}
              name={"address"}
              intent={"primary"}
              id={"address"}
              size={"md"}
              value={userProfile.address}
              classes={"w-full block p-2.5 "}
              roundness={"round-sm"}
              placeholder={"Address"}
              custom={"custom"}
              eventAction={handleChange}
            />
            {/* <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Doe"
                    required
                  /> */}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-inter font-medium text-gray-900"
            >
              Bio
            </label>
            <TextArea
              rows={"3"}
              cols={"10"}
              intent={"primary"}
              classes={"w-full !rounded-md p-2"}
              name={"bio"}
              value={userProfile?.bio}
              eventAction={handleChange}
            ></TextArea>
          </div>

          {/* theme */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="last-name"
              className="block mb-2 text-sm font-inter font-medium text-gray-900 "
            >
              Choose Theme:
            </label>
            <div className="w-full bg-primary min-h-16 rounded-lg p-2">
              <div className="flex flex-col gap-4">
                {/* card theme */}
                <div className="w-full rounded-lg flex items-center justify-between bg-white border border-primary p-4">
                  <label
                    htmlFor=""
                    className="block text-sm font-inter font-medium text-gray-900 "
                  >
                    Card Theme
                  </label>
                  <div className="flex items-center gap-2">
                    <TiCancel
                      className="text-2xl text-gray-500 cursor-pointer" // Increased size
                      onClick={() => {
                        dispatch(resetColor());
                      }}
                    />

                    {/* Color options with uniform size */}
                    <div
                      className="rounded-full w-6 h-6 bg-[#000000] cursor-pointer"
                      onClick={() => handleSelectColor("#000000")}
                    ></div>
                    <div
                      className="rounded-full w-6 h-6 bg-[#eab308] cursor-pointer"
                      onClick={() => handleSelectColor("#eab308")}
                    ></div>
                    <div
                      className="rounded-full w-6 h-6 bg-[#22c55e] cursor-pointer"
                      onClick={() => handleSelectColor("#22c55e")}
                    ></div>
                    <div
                      className="rounded-full w-6 h-6 bg-[#f97316] cursor-pointer"
                      onClick={() => handleSelectColor("#f97316")}
                    ></div>
                    <div
                      className="rounded-full w-6 h-6 bg-[#3b82f6] cursor-pointer"
                      onClick={() => handleSelectColor("#3b82f6")}
                    ></div>
                    <div
                      className="rounded-full w-6 h-6 bg-[#a855f7] cursor-pointer"
                      onClick={() => handleSelectColor("#a855f7")}
                    ></div>

                    {/* MdColorize icon with better visibility */}
                    <div
                      ref={pickerRef}
                      className="relative rounded-full w-6 h-6 bg-white border-2 border-tertiary-gray-700 flex justify-center items-center cursor-pointer"
                    >
                      <MdColorize
                        className="text-lg text-gray-600" // Adjusted size and color
                        onClick={togglePicker}
                      />
                    </div>
                  </div>

                  {/* Color picker visibility */}
                  {isPickerOpen && (
                    <div className="absolute top-0 z-40">
                      <ColorPicker
                        color={pickerColor}
                        onChange={(newColor) => {
                          if (newColor && newColor.hex) {
                            setPickerColor(newColor.hex);
                            handleSelectColor(newColor.hex);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* link color */}
                {/* <div className="w-full rounded-lg flex flex-col gap-2 bg-white border border-primary p-4">
                  <div className="border-b border-b-black pb-4 flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="block text-sm font-inter font-medium text-gray-900 dark:text-white"
                    >
                      Link Color
                    </label>
                    <div className="flex items-center gap-2">
                      <TiCancel
                        className="text-2xl text-gray-500 cursor-pointer" // Increased size
                        onClick={() => dispatch(resetLinkColor())}
                      />

                      <div
                        className="rounded-full w-6 h-6 bg-[#000000] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#000000")}
                      ></div>
                      <div
                        className="rounded-full w-6 h-6 bg-[#eab308] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#eab308")}
                      ></div>
                      <div
                        className="rounded-full w-6 h-6 bg-[#22c55e] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#22c55e")}
                      ></div>
                      <div
                        className="rounded-full w-6 h-6 bg-[#f97316] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#f97316")}
                      ></div>
                      <div
                        className="rounded-full w-6 h-6 bg-[#3b82f6] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#3b82f6")}
                      ></div>
                      <div
                        className="rounded-full w-6 h-6 bg-[#a855f7] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#a855f7")}
                      ></div>
                      <div className="rounded-full w-6 h-6 bg-white border-2 border-tertiary-gray-700 flex justify-center items-center">
                        <MdColorize className="text-lg text-gray-600" />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="block text-sm font-inter font-medium text-gray-900 dark:text-white"
                    >
                      Match Link Icons to Card Theme
                    </label>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="w-full bg-primary rounded-lg p-2">
            <div className="bg-white p-1.5 rounded-lg flex items-center justify-between">
              <label
                htmlFor="last-name"
                className="block  text-sm font-inter font-medium text-gray-900"
              >
                Card Private
              </label>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="w-full bg-primary rounded-lg p-2">
            <div className="bg-white p-1.5 rounded-lg flex items-center justify-between">
              <label
                htmlFor="last-name"
                className="block  text-sm font-inter font-medium text-gray-900"
              >
                User Direct
              </label>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="user_direct"
                    value={userProfile.user_direct}
                    className="sr-only peer"
                    onChange={handleCheckChange}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
          </div>
          <div className=" p-4 w-full  bg-white flex justify-end items-center gap-4">
            <Button
              type={"submit"}
              intent={"secondary"}
              children={"Update"}
              size={"lg"}
              roundness={"round"}
              classes={"!bg-black !text-white"}
            />
            <Button
              intent={"secondary"}
              children={"Cancel"}
              size={"lg"}
              roundness={"round"}
              classes={"!bg-black !text-white"}
            />
          </div>
        </form>
        {/* <footer className=" p-4 w-full  bg-white flex justify-end items-center gap-4">
          <Button
            intent={"secondary"}
            children={"Update"}
            size={"lg"}
            roundness={"round"}
            classes={"!bg-black !text-white"}
          />
          <Button
            intent={"secondary"}
            children={"Cancel"}
            size={"lg"}
            roundness={"round"}
            classes={"!bg-black !text-white"}
          />
        </footer> */}
      </div>
    </section>
  );
};

export default About;
