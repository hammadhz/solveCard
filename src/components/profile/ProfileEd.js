import React, { useState, useRef } from "react";
import { Button, Input, TextArea } from "../form";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import { MdColorize, MdGifBox } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { TiCancel } from "react-icons/ti";
import { useDispatch } from "react-redux";
import {
  resetColor,
  resetLinkColor,
  selectColor,
  selectLinkColor,
} from "../../context/slice/themeSlice";
import ColorPicker from "react-pick-color";

const ProfileEd = () => {
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
    <section className="h-[480px] flex justify-center grow bg-primary border-r-2 border-r-white">
      <div className="flex flex-col w-full">
        <header className=" text-start p-4 w-full  bg-white z-40">
          <h1 className="font-inter font-bold text-base">About</h1>
        </header>
        <div
          className="h-[520px] overflow-y-auto flex flex-col gap-4 p-3 w-full bg-white"
          id="profileEdit"
        >
          <div className="flex justify-between gap-2 items-center">
            <div className="flex items-center w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"sm"}
                classes={"w-[100px] !p-1"}
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
          </div>

          <div className="flex justify-around gap-2">
            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center gap-1">
                <p className="font-inter text-sm font-normal">
                  Profile picture
                </p>
                <IoInformationCircleOutline className="size-5" title="max wi" />
              </div>
              <div className="flex justify-center items-center  rounded-full size-24 border border-tertiary-gray-700 bg-white">
                <div className="flex flex-col items-center justify-center gap-1">
                  <RxAvatar className="size-5" />
                  <p className="font-inter text-[8px] w-[70%] text-black">
                    Select file or drag and drop
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2  items-center">
              <div className="flex items-center gap-1">
                <p className="font-inter text-sm font-normal">Cover photo</p>
                <IoInformationCircleOutline className="size-5" title="max wi" />
              </div>
              <div className="flex items-center justify-center rounded-lg h-24 w-48 border border-tertiary-gray-700 bg-white">
                <div className="flex flex-col gap-2 items-center">
                  <div className="flex items-center gap-2">
                    <MdGifBox className="size-5" />
                    <MdGifBox className="size-5" />

                    <CiVideoOn className="size-5" />

                    {/* <BiSolidFileGif /> */}
                    {/* <MdOndemandVideo /> */}
                  </div>
                  <p className="font-inter text-xs text-[8pxx] w-36">
                    Select image, gif, video, drag and drop one here
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <div className="flex items-center gap-1">
                <p className="font-inter text-sm font-normal">Company logo</p>
                <IoInformationCircleOutline className="size-5" title="max wi" />
              </div>
              <div className="flex justify-center items-center  rounded-full size-24 border border-tertiary-gray-700 bg-white">
                <div className="flex flex-col items-center justify-center gap-1">
                  <FaPen className="size-5" />
                  <p className="font-inter text-[8px] w-[70%] text-black">
                    Select file or drag and drop
                  </p>
                </div>
              </div>
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
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="font-inter text-sm font-normal">Bio:</p>
            <TextArea
              rows={"3"}
              cols={"10"}
              intent={"primary"}
              classes={"w-full !rounded-md p-3"}
            ></TextArea>
          </div>

          {/* theme */}
          <div className="flex flex-col gap-2 w-full">
            <p className="font-inter text-sm font-normal">Choose Theme:</p>
            <div className="w-full bg-primary min-h-36 rounded-lg p-2">
              <div className="flex flex-col gap-4">
                {/* card theme */}
                <div className="w-full rounded-lg flex items-center justify-between bg-white border border-primary p-4">
                  <p className="text-black text-sm font-normal">Card Theme</p>
                  <div className="flex items-center gap-2">
                    <div className="">
                      <TiCancel
                        className="size-6"
                        onClick={() => {
                          dispatch(resetColor());
                        }}
                      />
                    </div>

                    <div
                      className="rounded-full size-5 bg-[#000000] cursor-pointer"
                      onClick={() => handleSelectColor("#000000")}
                    ></div>
                    <div
                      className="rounded-full size-5 bg-[#eab308] cursor-pointer"
                      onClick={() => handleSelectColor("#eab308")}
                    ></div>
                    <div
                      className="rounded-full size-5 bg-[#22c55e] cursor-pointer"
                      onClick={() => handleSelectColor("#22c55e")}
                    ></div>
                    <div
                      className="rounded-full size-5 bg-[#f97316] cursor-pointer"
                      onClick={() => handleSelectColor("#f97316")}
                    ></div>
                    <div
                      className="rounded-full size-5 bg-[#3b82f6] cursor-pointer"
                      onClick={() => handleSelectColor("#3b82f6")}
                    ></div>
                    <div
                      className="rounded-full size-5 bg-[#a855f7] cursor-pointer"
                      onClick={() => handleSelectColor("#a855f7")}
                    ></div>
                    <div
                      ref={pickerRef}
                      className="relative rounded-full size-5 bg-white border-2 border-tertiary-gray-700 flex justify-center items-center"
                    >
                      <MdColorize className="size-3" onClick={togglePicker} />
                    </div>
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
                </div>
                {/* link color */}
                <div className="w-full rounded-lg flex flex-col gap-2 bg-white border border-primary p-4">
                  <div className="border-b border-b-black pb-4 flex items-center justify-between">
                    <p className="text-black text-sm font-normal">Link Color</p>
                    <div className="flex items-center gap-2">
                      <div className="">
                        <TiCancel
                          className="size-6"
                          onClick={() => dispatch(resetLinkColor())}
                        />
                      </div>

                      <div
                        className="rounded-full size-5 bg-[#000000] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#000000")}
                      ></div>
                      <div
                        className="rounded-full size-5 bg-[#eab308] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#eab308")}
                      ></div>
                      <div
                        className="rounded-full size-5 bg-[#22c55e] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#22c55e")}
                      ></div>
                      <div
                        className="rounded-full size-5 bg-[#f97316] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#f97316")}
                      ></div>
                      <div
                        className="rounded-full size-5 bg-[#3b82f6] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#3b82f6")}
                      ></div>
                      <div
                        className="rounded-full size-5 bg-[#a855f7] cursor-pointer"
                        onClick={() => handleLinkSelectColor("#a855f7")}
                      ></div>
                      <div className="rounded-full size-5 bg-white border-2 border-tertiary-gray-700 flex justify-center items-center">
                        <MdColorize className="size-3" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-black text-sm font-normal">
                      Match Link Icons to Card Theme
                    </p>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black"></div>
                      </label>
                    </div>
                  </div>
                </div>
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

export default ProfileEd;
