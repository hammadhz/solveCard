import React, { useState, useRef } from "react";
import { Button, Input, TextArea } from "../form";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdColorize, MdOutlinePhotoLibrary } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { resetColor, selectColor } from "../../context/slice/themeSlice";
import ColorPicker from "react-pick-color";

const About = () => {
  const [pickerColor, setPickerColor] = useState("#ffffff");
  const [isPickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef(null);

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

  return (
    <section className="h-full flex justify-center grow bg-primary border-r-2 border-r-white">
      <div className="h-full flex flex-col w-full p-8 rounded-lg bg-white">
        <header className="text-start w-full z-40 mb-8">
          <h1 className="font-inter font-bold text-2xl">About</h1>
        </header>
        <div className=" flex flex-col gap-4 w-full" id="profileEdit">
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
                Card Name
              </label>
              <Input
                type={"text"}
                nameField={"first_name"}
                intent={"primary"}
                id={"first-name"}
                size={"md"}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"first name"}
                register={register}
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
                Company Name
              </label>
              <Input
                type={"text"}
                nameField={"last_name"}
                intent={"primary"}
                id={"last-name"}
                size={"md"}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"Last Name"}
                register={register}
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
              <div className="flex justify-center items-center rounded-full w-28 h-28 border border-dashed border-gray-400 bg-white hover:bg-gray-100 transition-all cursor-pointer">
                <div className="flex flex-col items-center justify-center gap-1">
                  <RxAvatar className="text-4xl text-gray-500" />
                  <p className="font-inter text-xs text-gray-500 text-center">
                    Select or drag file
                  </p>
                </div>
              </div>
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
              <div className="flex items-center justify-center rounded-lg h-28 w-64 border border-dashed border-gray-400 bg-white hover:bg-gray-100 transition-all cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <MdOutlinePhotoLibrary className="text-3xl text-gray-500" />
                  <p className="font-inter text-xs text-gray-500 text-center">
                    Select image, gif, video, or drag & drop
                  </p>
                </div>
              </div>
            </div>
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
                htmlFor="first-name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <Input
                type={"text"}
                nameField={"first_name"}
                intent={"primary"}
                id={"first-name"}
                size={"md"}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"first name"}
                register={register}
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
                className="block mb-2 text-sm font-inter font-medium text-gray-900"
              >
                Address
              </label>
              <Input
                type={"text"}
                nameField={"last_name"}
                intent={"primary"}
                id={"last-name"}
                size={"md"}
                classes={"w-full block p-2.5 "}
                roundness={"round-sm"}
                placeholder={"Last Name"}
                register={register}
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
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="last-name"
              className="block mb-2 text-sm font-inter font-medium text-gray-900"
            >
              Bio
            </label>
            <TextArea
              rows={"3"}
              cols={"10"}
              intent={"primary"}
              classes={"w-full !rounded-md p-2"}
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
                            console.log(newColor.hex);
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
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <footer className=" p-4 w-full  bg-white flex justify-end items-center gap-4">
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
        </footer>
      </div>
    </section>
  );
};

export default About;
