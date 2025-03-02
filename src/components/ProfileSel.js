import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {useDispatch, useSelector} from "react-redux";
import { profileIdSelect } from "../context/slice/profileSlice";
import {fetchProfiles} from "../context/slice/profilesSlice";

const ProfileSel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const profiles = useSelector((state) => state.profiles.profiles);
  const [selectedOption, setSelectedOption] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
    handleSelect(profiles[0]);
  }, [dispatch]);

  const handleSelect = (option) => {
    setSelectedOption(option?.name);
    setIsOpen(false);
    let id = String(option?.id);
    dispatch(profileIdSelect(id));
  };

  return (
    <div className="relative w-[250px]">
      <div
        className={`w-full px-5 py-3 font-inter font-normal text-base bg-primary rounded-3xl outline-none cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || "Select default profile"}
      </div>

      {isOpen && (
        <div className="absolute top-16 z-10 w-full bg-white rounded-lg shadow-md">
          {profiles.map((option) => (
            <div
              key={option?.id}
              className="px-5 py-3 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option?.name}
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
