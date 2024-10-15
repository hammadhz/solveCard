import React from "react";
import { IoMdAdd } from "react-icons/io";

const AddProfileCard = () => {
  return (
    <div className="bg-primary p-4 rounded-2xl relative flex flex-col gap-2 justify-center items-center">
      <div className="bg-gradient-to-t from-tertiary-green-60 to-tertiary-green-70 size-20 rounded-full flex justify-center items-center">
        <IoMdAdd className="size-8" />
      </div>
      <p className="font-inter font-medium text-lg text-center">New Card</p>
    </div>
  );
};

export default AddProfileCard;
