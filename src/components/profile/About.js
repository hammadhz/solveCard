import React, {useState, useRef, useEffect} from "react";
import {Button, Input, TextArea} from "../form";
import {useForm} from "react-hook-form";
import {RxAvatar} from "react-icons/rx";
import {IoInformationCircleOutline} from "react-icons/io5";
import {MdColorize, MdOutlinePhotoLibrary, MdCancel} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {
    profileCoverUpdate,
    photoUpdate,
    setThemeColor as updateThemeColor,
    setTextColor as updateTextColor,
    setProfileViewData, setProfileData, setPlatform,
} from "../../context/slice/profileSlice";
import axiosInstance from "../../utils/axiosInstance";
import {useParams} from "react-router-dom";
import imageCompression from "browser-image-compression";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {base64ToBlob} from "../../utils/base64ToBlob";
import {TiCancel} from "react-icons/ti";
import NavLink from "../NavLink";
import edit from "../../assets/svgs/edit.svg";

const MAX_FILE_SIZE = 6 * 1024 * 1024;
const About = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { register } = useForm();
    const userData = useSelector((state) => state.profile.profileData);

    const photoInputRef = useRef(null);
    const coverPhotoInputRef = useRef(null);

    const [themeColor, setThemeColor] = useState("");
    const [textColor, setTextColor] = useState("");
    const [backgroundColors, setBackgroundColors] = useState([]);
    const [buttonColors, setButtonColors] = useState([]);

    const [loading, setLoading] = useState(false);
    const [picData, setPicData] = useState({ photo: "", cover_photo: "" });
    const [blobCon, setBlobCon] = useState({ photo: "", cover_photo: "" });
    const [userProfile, setUserProfile] = useState({
        card_title: "", name: "", company: "", job_title: "", address: "", bio: "",
        photo: "", cover_photo: "", work_position: "", user_direct: 0, private: 0
    });

    useEffect(() => {
        if (userData) {
            setUserProfile(prev => ({ ...prev, ...userData }));
            console.log("userData", userData.photo, userData.cover_photo);
            setPicData({ photo: userData.photo || "", cover_photo: userData.cover_photo || "" });
            setThemeColor(userData.background_color_code);
            dispatch(updateThemeColor(userData.background_color_code));
            dispatch(updateTextColor(userData.button_color_code ?? "#000000"));
            setTextColor(userData.button_color_code);
            // dispatch(setProfileViewData(userData));
        }
    }, [userData, dispatch]);

    useEffect(() => {
        dispatch(setProfileViewData(userProfile));
    }, [userProfile, dispatch]);

    useEffect(() => {
        const fetchBackgroundColors = async () => {
            try {
                const response = await axiosInstance.get("/backgroundColors");
                setBackgroundColors(response.data.Backgrounds);
            } catch (error) {
                console.error("Error fetching background colors:", error);
            }
        };
        const fetchButtonColors = async () => {
            try {
                const response = await axiosInstance.get("/buttonColors");
                setButtonColors(response.data.buttonColors);
            } catch (error) {
                console.error("Error fetching button colors:", error);
            }
        }
        fetchBackgroundColors();
        fetchButtonColors();
    }, []);

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file || file.size > MAX_FILE_SIZE) {
            toast.error(`${type} picture size must be less than 6MB.`);
            return;
        }

        try {
            const compressedFile = await imageCompression(file, { maxSizeMB: 4, useWebWorker: true });
            const reader = new FileReader();
            reader.onloadend = () => {
                setBlobCon(prev => ({ ...prev, [type]: base64ToBlob(reader.result) }));
                setUserProfile(prev => ({ ...prev, [type]: reader.result }));
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error(`Error compressing ${type} image:`, error);
        }
    };

    const handleInputChange = (e) => {
        setUserProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCheckChange = (e) => {
        setUserProfile(prev => ({ ...prev, [e.target.name]: Number(e.target.checked) }));
    };

    const removeImage = (type) => {
        setUserProfile(prev => ({ ...prev, [type]: "" }));
        setPicData(prev => ({ ...prev, [type]: "" }));
    };

    const handleThemeColor = (id, color) => {
        setThemeColor(id);
        dispatch(updateThemeColor(color));
    };

    const handleTextColor = (id, color) => {
        setTextColor(id);
        dispatch(updateTextColor(color));
    };

    const submitUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        const requiredFields = ["card_title", "name", "company", "job_title", "address", "bio", "work_position"];
        for (const field of requiredFields) {
            if (!userProfile[field]) {
                toast.error(`Please enter your ${field.replace("_", " ")}`);
                setLoading(false);
                return;
            }
        }

        let body = { ...userProfile, profile_id: id, branding_color: "#d5d5d5",
            cover_photo: blobCon.cover_photo || undefined,
            photo: blobCon.photo || undefined
        };

        const selectedTheme = backgroundColors.find(
            (theme) => theme.id === themeColor || theme.color_code === themeColor
        );
        let selectedTextColor = buttonColors.find(
            (theme) => theme.id === textColor || theme.color_code === textColor
        );

        if (!selectedTextColor) {
            setTextColor(buttonColors[0].id);
            selectedTextColor = buttonColors[0];
        }
        setThemeColor(selectedTheme.id);
        setTextColor(selectedTextColor.id);

        console.log('direct', userData.user_direct, userProfile.user_direct, body)
        try {
            const response = await axiosInstance.post("/updateProfile", body);
            if (response.status === 200) {
                // if (userData.user_direct !== userProfile.user_direct) {
                //     const directResponse = await axiosInstance.post("/profileDirect", { profile_id: id });
                //     console.log('directResponse', directResponse.data)
                // }
                // if (userData.private !== userProfile.private) {
                //     await axiosInstance.post("/privateProfile", { profile_id: id });
                // }
                await axiosInstance.post("/updateBackgroundColor", { profile_id: id, bg_color_id: selectedTheme.id });
                await axiosInstance.post("/updateButtonColor", { profile_id: id, btn_color_id: selectedTextColor.id });
                toast.success(response.data.message);
                dispatch(setProfileData({ ...userProfile, cover_photo: picData.cover_photo, photo: picData.photo, background_color_code: selectedTheme.color_code, button_color_code: selectedTextColor.color_code }));
                console.log('final', response.data)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full h-full lg:p-4 py-8 px-6 rounded-lg bg-white overflow-hidden">
            <form
                onSubmit={submitUpdateProfile}
                className="relative w-full h-full bg-white"
                id="profileEdit"
                encType="multipart/form-data"
            >
                <div className="sticky top-0 bg-white pb-4 z-10">
                    <h1 className="font-inter font-bold text-xl">About</h1>
                </div>

                <div className="h-[calc(100%-7rem)] absolute overflow-y-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full pr-2">
                    <div className="w-full">
                        <label
                            htmlFor="card-title"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Card Title
                        </label>
                        <Input
                            type={"text"}
                            name={"card_title"}
                            intent={"primary"}
                            id={"card-title"}
                            size={"md"}
                            value={userProfile?.card_title}
                            classes={"w-full block p-2.5"}
                            roundness={"round-sm"}
                            placeholder={"Card Title"}
                            custom={"custom"}
                            eventAction={handleInputChange}
                        />
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="work_position"
                            className="block mb-2 text-sm font-inter font-medium text-gray-900"
                        >
                            Card Layout
                        </label>
                        <select
                            onChange={handleInputChange}
                            name="work_position"
                            value={userProfile?.work_position}
                            className="w-full block px-2.5 py-3.5 font-inter outline-none bg-primary placeholder:text-sm placeholder:font-normal rounded-md"
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                    </div>

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
                        {userData?.photo && picData?.photo && (
                            <div className="h-full w-full  relative">
                                <img
                                    src={`${process.env.REACT_APP_SERVER}${picData.photo}`}
                                    className="rounded-full h-full aspect-square w-2/5 mx-auto object-cover"
                                    alt="profile_pic"
                                />
                                <MdCancel
                                    className="absolute size-5 -top-2 right-1/2 -translate-x-1/2 text-red-500 bg-white rounded-full cursor-pointer"
                                    onClick={() => removeImage("photo")}
                                />
                            </div>
                        )}
                        {/* Profile Picture Upload Area */}
                        {userProfile.photo && !picData?.photo && (
                            <div className="w-full h-full relative">
                                <img
                                    src={userProfile.photo}
                                    className="rounded-full h-full aspect-square mx-auto object-cover"
                                    alt=""
                                />
                                <MdCancel
                                    className="absolute size-5 -top-2 right-1/2 -translate-x-1/2 text-red-500 bg-white rounded-full cursor-pointer"
                                    onClick={() => removeImage("photo")}
                                />
                            </div>
                        )}
                        {!picData.photo && !userProfile.photo && (
                            <div
                                onClick={() => photoInputRef.current.click()}
                                className="flex justify-center items-center rounded-full w-28 h-28 border border-dashed border-gray-400 bg-white hover:bg-gray-100 transition-all cursor-pointer"
                            >
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <RxAvatar className="text-4xl text-gray-500"/>
                                    <p className="font-inter text-xs text-gray-500 text-center">
                                        Select or drag file
                                    </p>
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={photoInputRef}
                            accept=".jpg, .png, .jpeg"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "photo")}
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
                        {userData?.cover_photo && picData?.cover_photo && (
                            <div className="h-full w-full relative">
                                <img
                                    src={`${process.env.REACT_APP_SERVER}${picData?.cover_photo}`}
                                    className="max-h-24 w-full rounded-lg object-cover"
                                    alt="cover_pic"
                                />
                                <MdCancel
                                    className="absolute top-0 right-0 text-red-500 bg-white rounded-full cursor-pointer"
                                    onClick={() => removeImage("cover_photo")}
                                />
                            </div>
                        )}
                        {/* Cover Photo Upload Area */}
                        {userProfile?.cover_photo && !picData?.cover_photo && (
                            <div className="h-full w-full relative">
                                <img
                                    src={userProfile?.cover_photo}
                                    className="max-h-24 w-full rounded-lg object-cover"
                                    alt="cover_pic"
                                />
                                <MdCancel
                                    className="absolute top-0 right-0 text-red-500 bg-white rounded-full cursor-pointer"
                                    onClick={() => removeImage("cover_photo")}
                                />
                            </div>
                        )}
                        {!picData.cover_photo && !userProfile.cover_photo && (
                            <div
                                onClick={() => coverPhotoInputRef.current.click()}
                                className="flex items-center justify-center rounded-lg h-28 w-full border border-dashed border-gray-400 bg-white hover:bg-gray-100 transition-all cursor-pointer"
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <MdOutlinePhotoLibrary className="text-3xl text-gray-500"/>
                                    <p className="font-inter text-xs text-gray-500 text-center">
                                        Select image, gif, video, or drag & drop
                                    </p>
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            ref={coverPhotoInputRef}
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, "cover_photo")}
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
                            eventAction={handleInputChange}
                        />
                        {/* <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
                    placeholder="John"
                    required
                  /> */}
                    </div>
                  {/*  <div className="w-full">*/}
                  {/*      <label*/}
                  {/*          htmlFor="last-name"*/}
                  {/*          className="block mb-2 text-sm font-medium text-gray-900"*/}
                  {/*      >*/}
                  {/*          Email*/}
                  {/*      </label>*/}
                  {/*      <Input*/}
                  {/*          type={"email"}*/}
                  {/*          name={"email"}*/}
                  {/*          intent={"primary"}*/}
                  {/*          id={"email"}*/}
                  {/*          size={"md"}*/}
                  {/*          value={userProfile?.email}*/}
                  {/*          classes={"w-full block p-2.5 "}*/}
                  {/*          roundness={"round-sm"}*/}
                  {/*          placeholder={"Email"}*/}
                  {/*          custom={"custom"}*/}
                  {/*          eventAction={handleInputChange}*/}
                  {/*      />*/}
                  {/*      /!* <input*/}
                  {/*  type="text"*/}
                  {/*  name="last-name"*/}
                  {/*  id="last-name"*/}
                  {/*  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"*/}
                  {/*  placeholder="Doe"*/}
                  {/*  required*/}
                  {/*/> *!/*/}
                  {/*  </div>*/}

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
                            eventAction={handleInputChange}
                        />
                        {/* <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400"
                    placeholder="Doe"
                    required
                  /> */}
                    </div>
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
                            eventAction={handleInputChange}
                        />
                    </div>


                    {/*<div className="w-full">*/}
                    {/*    <label*/}
                    {/*        htmlFor="dob"*/}
                    {/*        className="block mb-2 text-sm font-medium text-gray-900"*/}
                    {/*    >*/}
                    {/*        DOB*/}
                    {/*    </label>*/}
                    {/*    <Input*/}
                    {/*        type={"date"}*/}
                    {/*        name={"dob"}*/}
                    {/*        intent={"primary"}*/}
                    {/*        id={"dob"}*/}
                    {/*        size={"md"}*/}
                    {/*        value={userProfile.dob}*/}
                    {/*        classes={"w-full block p-2.5 "}*/}
                    {/*        roundness={"round-sm"}*/}
                    {/*        placeholder={"dob"}*/}
                    {/*        custom={"custom"}*/}
                    {/*        eventAction={handleInputChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="w-full">*/}
                    {/*    <label*/}
                    {/*        htmlFor="gender"*/}
                    {/*        className="block mb-2 text-sm font-inter font-medium text-gray-900"*/}
                    {/*    >*/}
                    {/*        Gender*/}
                    {/*    </label>*/}
                    {/*    <select*/}
                    {/*        onChange={handleInputChange}*/}
                    {/*        name="gender"*/}
                    {/*        className="w-full block px-2.5 py-3.5  font-inter outline-none bg-primary placeholder:text-sm placeholder:font-normal rounded-md"*/}
                    {/*    >*/}
                    {/*        <option value={"1"}>Male</option>*/}
                    {/*        <option value={"2"}>Female</option>*/}
                    {/*        <option value={"3"}>Not Share</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}

                    <div className="w-full">
                        <label
                            htmlFor="address"
                            className="block mb-2 text-sm font-inter font-medium text-gray-900"
                        >
                            Address
                        </label>
                        <TextArea
                            rows={"2"}
                            intent={"primary"}
                            classes={"w-full !rounded-md p-2"}
                            name={"address"}
                            placeholder={"Address"}
                            value={userProfile?.address}
                            eventAction={handleInputChange}
                        ></TextArea>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label
                            htmlFor="bio"
                            className="block text-sm font-inter font-medium text-gray-900"
                        >
                            Bio
                        </label>
                        <TextArea
                            rows={"2"}
                            intent={"primary"}
                            placeholder={"Bio"}
                            classes={"w-full !rounded-md p-2"}
                            name={"bio"}
                            value={userProfile?.bio}
                            eventAction={handleInputChange}
                        ></TextArea>
                    </div>

                    {/* theme */}
                    <div className="lg:col-span-2 flex flex-col gap-2 w-full">
                        <label
                            htmlFor="last-name"
                            className="block mb-2 text-sm font-inter font-medium text-gray-900 "
                        >
                            Choose Theme:
                        </label>
                        <div className="w-full bg-primary min-h-16 rounded-lg py-2 px-3">
                            <div className="flex flex-col gap-4">
                                {/* card theme */}
                                <div
                                    className="w-full rounded-lg flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 items-center justify-between bg-white border border-primary p-4">
                                    <label
                                        htmlFor=""
                                        className="block text-sm font-inter font-medium text-gray-900 "
                                    >
                                        Profile/Card Theme
                                    </label>
                                    <div className="flex items-center justify-end flex-grow gap-2">
                                        {backgroundColors?.map((color) => (
                                            <div
                                                key={color.id}
                                                className="rounded-full w-6 h-6 cursor-pointer border"
                                                style={{ backgroundColor: color.color_code }}
                                                onClick={() => handleThemeColor(color.id, color.color_code)}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* link color */}
                                <div
                                    className="w-full rounded-lg flex flex-col gap-2 bg-white border border-primary p-4">
                                    <div className="pb-4 flex items-center justify-between">
                                        <label
                                            htmlFor=""
                                            className="block text-sm font-inter font-medium text-gray-900 "
                                        >
                                            Link Color
                                        </label>
                                        <div className="flex items-center justify-end flex-grow gap-2">
                                            {buttonColors?.map((color) => (
                                                <div
                                                    key={color.id}
                                                    className="rounded-full w-6 h-6 cursor-pointer border"
                                                    style={{ backgroundColor: color.color_code }}
                                                    onClick={() => handleTextColor(color.id, color.color_code)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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
                                    <div
                                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
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
                                    <div
                                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>
                        </div>
                    </div>

            {/*        <div className="lg:col-span-2 w-full flex justify-center items-center">*/}
            {/*            <Button*/}
            {/*                type={"submit"}*/}
            {/*                intent={"secondary"}*/}
            {/*                children={"Update"}*/}
            {/*                size={"lg"}*/}
            {/*                roundness={"round"}*/}
            {/*                classes={"!bg-black !text-white"}*/}
            {/*                loading={loading}*/}
            {/*            />*/}
            {/*            /!* <Button*/}
            {/*  intent={"secondary"}*/}
            {/*  children={"Cancel"}*/}
            {/*  size={"lg"}*/}
            {/*  roundness={"round"}*/}
            {/*  classes={"!bg-black !text-white"}*/}
            {/*/> *!/*/}
            {/*        </div>*/}

                </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 pt-4 w-full bg-white flex justify-end items-center gap-4">
                    <Button
                        intent={"primary"}
                        children={"Update"}
                        size={"lg"}
                        loading={loading}
                        roundness={"round"}
                        classes={"!bg-black !text-white"}
                    />
                    <NavLink
                        intent={"secondary"}
                        size={"lg"}
                        content={"Cancel"}
                        classes={"gap-2 !py-3 !px-6"}
                        href={`/dashboard`}
                    />
                </div>
            </form>
        </div>
    );
};

export default About;
