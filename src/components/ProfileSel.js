import React, { useState } from "react";
import { Input } from "./form";
import search from "../assets/svgs/search-icon.svg";

const ProfileSel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the options after selecting
  };
  return (
    <div className="relative w-[250px]">
      <div
        className={`w-full px-5 py-3 font-inter font-normal text-base bg-primary rounded-3xl outline-none cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || "Select an option"}
      </div>

      {isOpen && (
        <div className="absolute top-16 z-10 w-full bg-white rounded-lg shadow-md">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-5 py-3 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  // <select className="w-[450px] px-5 py-3 font-inter font-normal text-base bg-primary rounded-3xl outline-none">
  //   <option value="all">All</option>
  // </select>
  // <Input
  //   type={"text"}
  //   placeholder={"Search"}
  //   intent={"primary"}
  //   size={"sm"}
  //   classes={"!px-5"}
  //   reactSvgIcon={search}
  //   parentDivH={"w-[450px]"}
  //   positionIcon={"absolute right-5 top-1/2 transform -translate-y-1/2"}
  //   nameField={"search"}
  //   register={register}
  // />
  // );
};

export default ProfileSel;
