import React, { useState, useRef, useEffect } from "react";
import { Button, Input, TextArea } from "../form";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdColorize, MdOutlinePhotoLibrary, MdCancel } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  profileCoverUpdate,
  profilePicUpdate,
  resetColor,
  selectColor,
  setProfileviewData,
} from "../../context/slice/profileSlice";
import ColorPicker from "react-pick-color";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base64ToBlob } from "../../utils/base64ToBlob";

const About = () => {
  const [pickerColor, setPickerColor] = useState("#ffffff");
  const [isPickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef(null);
  const profilePicInputRef = useRef(null);
  const coverPicInputRef = useRef(null);
  const { id } = useParams();
  const userData = useSelector((state) => state.profile.profileData);
  const [loading, setLoading] = useState(false);
  const [picData, setPicData] = useState({
    profilePic: "",
    coverPic: "",
  });
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    company: "",
    phone: "",
    user_direct: "",
    job_title: "",
    profilePic: "",
    coverPic: "",
    dob: "",
    gender: "",
  });
  const [blobCon, setBlobCon] = useState({
    profilePic: "",
    coverPic: "",
  });

  const maxFileSize = 6 * 1024 * 1024;

  const dispatch = useDispatch();
  const { register } = useForm();

  const handleSelectColor = (color) => {
    // dispatch(selectColor(color));
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
    if (userData) {
      console.log("userData", userData);
      setUserProfile((prev) => ({
        ...prev,
        name: userData.name ? userData.name : "",
        email: userData.email ? userData.email : "",
        bio: userData.bio ? userData.bio : "",
        address: userData.address ? userData.address : "",
        company: userData.company ? userData.company : "",
        phone: userData.phone ? userData.phone : "",
        user_direct: userData.user_direct ? userData.user_direct : 0,
        private: userData.private ? userData.private : 0,
        job_title: userData.job_title ? userData.job_title : "",
        dob: userData.dob ? userData.dob : "",
        gender: userData.gender ? userData.gender : "",
      }));
      setPicData((prev) => ({
        ...prev,
        profilePic: userData.photo ? userData.photo : "",
        coverPic: userData.cover_photo ? userData.cover_photo : "",
      }));
    }
  }, [userData]);

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
        toast.error("Profile picture size must be less than 6MB.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
          setBlobCon((prev) => ({
            ...prev,
            profilePic: base64ToBlob(reader.result),
          }));
          setUserProfile((prev) => ({
            ...prev,
            profilePic: reader.result,
          }));
        };
        reader.readAsDataURL(compressedFile);
        // profileUpdate()
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
      if (file.size > maxFileSize) {
        toast.error("Cover picture size must be less than 6MB.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      try {
        const options = {
          maxSizeMB: 6,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setBlobCon((prev) => ({
            ...prev,
            coverPic: base64ToBlob(reader.result),
          }));
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

  const ProfileBlobConverter = () => {
    const reader = new FileReader();
    reader.readAsDataURL(profilePicInputRef.current.files[0]);
    reader.onloadend = () => {
      setBlobCon((prev) => ({
        ...prev,
        profilePic: base64ToBlob(reader.result),
      }));
      setUserProfile((prev) => ({
        ...prev,
        profilePic: reader.result,
      }));
    };
  }

  const CoverBlobConverter = () => {
    const reader = new FileReader();
    reader.readAsDataURL(coverPicInputRef.current.files[0]);
    reader.onloadend = () => {
      setBlobCon((prev) => ({
        ...prev,
        coverPic: base64ToBlob(reader.result),
      }));
      setUserProfile((prev) => ({
        ...prev,
        coverPic: reader.result,
      }));
    };
  }

  const submitUpdateProfile = async (e) => {
    e.preventDefault();
    console.log(userProfile, "userProfile");
    console.log(blobCon.coverPic, "coverPic");
    console.log(blobCon.profilePic, "profilePic");

    // if (blobCon.coverPic){
    //     await CoverBlobConverter();
    // }
    //
    // if (blobCon.profilePic){
    //     await ProfileBlobConverter();
    // }

    // debugger;
    let body = {
      bio: userProfile.bio,
      gender: userProfile.gender,
      dob: userProfile.dob,
      name: userProfile.name,
      cover_photo: blobCon.coverPic,
      photo: blobCon.profilePic,
      address: userProfile.address,
      job_title: userProfile.job_title,
      company: userProfile.company,
      phone: userProfile.phone,
      branding_color: "#d5d5d5",
      profile_id: id,
      email: userProfile.email,
    };

    if (!blobCon.coverPic){
        delete body.cover_photo;
    }

    if (!blobCon.profilePic){
        delete body.photo;
    }

    // debugger;
    setLoading(true);
    const {
      address,
      bio,
      company,
      coverPic,
      dob,
      email,
      gender,
      job_title,
      name,
      phone,
      profilePic,
    } = userProfile;
    if (name === "") {
      toast.error("Please, enter your name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (email === "") {
      toast.error("Please, enter your email", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (dob === "") {
      toast.error("Please, enter your dob", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (company === "") {
      toast.error("Please, enter company name", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (gender === "") {
      toast.error("Please, select your gender", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (bio === "") {
      toast.error("Please, enter your bio", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (phone === "") {
      toast.error("Please, enter your phone", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (address === "") {
      toast.error("Please, enter your address", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (job_title === "") {
      toast.error("Please, enter your job title", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        const response = await axiosInstance.post("/updateProfile", body);
        if (response.status === 200) {
          if (userData.user_direct !== userProfile.user_direct) {
            await axiosInstance.post("/profileDirect", {
              profile_id: id,
            });
          }
          if (userData.private !== userProfile.private) {
            await axiosInstance.post("/privateProfile", {
              profile_id: id,
            });
          }
          setLoading(false);
          dispatch(
            setProfileviewData({
              bio: userProfile.bio,
              gender: userProfile.gender,
              dob: userProfile.dob,
              name: userProfile.name,
              cover_photo: userProfile.coverPic
                ? userProfile.coverPic
                : picData.coverPic,
              photo: userProfile.profilePic
                ? userProfile.profilePic
                : picData.profilePic,
              address: userProfile.address,
              job_title: userProfile.job_title,
              company: userProfile.company,
              phone: userProfile.phone,
              profile_id: id,
              email: userProfile.email,
            })
          );
          toast.success(response.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
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

  const rmProfilePicData = () => {
    setPicData((prev) => ({
      ...prev,
      profilePic: "",
    }));
  };

  const rmCoverPicData = () => {
    setPicData((prev) => ({
      ...prev,
      coverPic: "",
    }));
  };

  const rmProfilePic = () => {
    setUserProfile((prev) => ({
      ...prev,
      profilePic: "",
    }));
  };

  const rmCoverPic = () => {
    setUserProfile((prev) => ({
      ...prev,
      coverPic: "",
    }));
  };

  // const submitUserDirect = async () => {
  //   try {
  //     const response = await axiosInstance.post("/profileDirect", {
  //       profile_id: 11,
  //       user_direct: userProfile.user_direct,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.message, {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

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
          encType="multipart/form-data"
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
                name={"name"}
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
                name={"email"}
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
              {userData?.photo && picData?.profilePic && (
                <div className="h-full w-full relative">
                  <img
                    src={`${process.env.REACT_APP_SERVER}${picData.profilePic}`}
                    className="size-28 rounded-full object-cover"
                    alt="profile_pic"
                  />
                  <MdCancel
                    className="absolute top-5 right-4 text-white cursor-pointer"
                    onClick={rmProfilePicData}
                  />
                </div>
              )}
              {/* Profile Picture Upload Area */}
              {userProfile.profilePic && (
                <div className="size-full rounded-full relative">
                  <img
                    src={userProfile.profilePic}
                    className="rounded-full size-28 object-cover"
                    alt=""
                  />
                  <MdCancel
                    className="absolute top-5 right-4 text-white cursor-pointer"
                    onClick={rmProfilePic}
                  />
                </div>
              )}
              {!picData.profilePic && !userProfile.profilePic && (
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
              {userData?.cover_photo && picData?.coverPic && (
                <div className="h-full w-full relative">
                  <img
                    src={`${process.env.REACT_APP_SERVER}${picData?.coverPic}`}
                    className="h-28 w-64 rounded-lg object-cover"
                    alt="cover_pic"
                  />
                  <MdCancel
                    className="absolute top-0 right-0 text-white cursor-pointer"
                    onClick={rmCoverPicData}
                  />
                </div>
              )}
              {/* Cover Photo Upload Area */}
              {userProfile?.coverPic && (
                <div className="h-full w-full relative">
                  <img
                    src={userProfile?.coverPic}
                    className="h-28 w-64 rounded-lg object-cover"
                    alt="cover_pic"
                  />
                  <MdCancel
                    className="absolute top-0 right-0 text-white cursor-pointer"
                    onClick={rmCoverPic}
                  />
                </div>
              )}
              {!picData.coverPic && !userProfile.coverPic && (
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
                htmlFor="job_title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Job Title
              </label>
              <Input
                type={"text"}
                name={"job_title"}
                intent={"primary"}
                id={"job_title"}
                size={"md"}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"Job Title"}
                custom={"custom"}
                value={userProfile.job_title}
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
                  <input
                      type="checkbox"
                      name="private"
                      value={userProfile.private}
                      checked={userProfile.private}
                      className="sr-only peer"
                      onChange={handleCheckChange}
                  />
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
                    checked={userProfile.user_direct}
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
              loading={loading}
            />
            {/* <Button
              intent={"secondary"}
              children={"Cancel"}
              size={"lg"}
              roundness={"round"}
              classes={"!bg-black !text-white"}
            /> */}
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
