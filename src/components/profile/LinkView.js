import React from "react";
import { Button, Input } from "../form";
import { useForm } from "react-hook-form";
import { MdOutlineDeleteOutline } from "react-icons/md";

const LinkView = () => {
  return (
    <section className="h-[480px] flex justify-center grow bg-primary border-r-2 border-r-white">
      <div className="flex flex-col w-full">
        {/* Header with Links and Back Button */}
        <header className="text-start p-4 w-full bg-white z-40 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">
              {/* Back button (chevron icon) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="font-inter font-bold text-base">Links</h1>
          </div>
        </header>

        {/* Link Detail Content */}
        <div className="h-[520px] overflow-y-auto flex flex-col gap-4 p-4 w-full bg-white">
          {/* Icon and Link Info */}
          <div className="flex flex-col items-start space-y-4">
            {/* Email Icon */}
            <div className="text-4xl text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12v-2a4 4 0 10-8 0v2M12 14h.01M19 12a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {/* Email and Link Title */}
            <div className="w-full">
              <label
                htmlFor="email"
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
                classes={"w-full block p-2.5"}
                roundness={"round-sm"}
                placeholder={"user@example.com"}
                custom={"custom"}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="link-title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Link Title
              </label>
              <Input
                type={"text"}
                nameField={"link_title"}
                intent={"primary"}
                id={"link-title"}
                size={"md"}
                classes={"w-full block p-2.5"}
                roundness={"round-sm"}
                placeholder={"Email Link"}
                custom={"custom"}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <button
              className="bg-red-500 p-3 rounded-full text-white hover:bg-red-700 transition-all"
              //   onClick={handleDelete}
            >
              <MdOutlineDeleteOutline />
            </button>
            <div className="flex justify-end space-x-4">
              <Button
                intent={"secondary"}
                children={"Cancel"}
                size={"lg"}
                roundness={"round"}
                classes={"p"}
                //   onClick={handleCancel}
              />
              <Button
                intent={"primary"}
                children={"Update"}
                size={"lg"}
                roundness={"round"}
                classes={""}
                //   onClick={handleUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkView;
