import React from "react";
import ReactDOM from "react-dom";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { AiOutlineGlobal, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { Button, Input } from "../form";

const AddLinkBaseModal = ({ closeModal, data }) => {
  console.log(data.title, "data");
  return ReactDOM.createPortal(
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-[320px] max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Link
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <div className="space-y-4 text-center w-full">
              <img
                src={`${process.env.REACT_APP_SERVER}${data.img}`}
                className="size-10 mx-auto"
                alt=""
              />
              <h1 className="text-black dark:text-white">
                Add {data.title} Link
              </h1>
              <div>
                <Input
                  intent={"primary"}
                  size={"lg"}
                  roundness={"round-md"}
                  label={"Link Title"}
                  placeholder={"Enter link title"}
                  custom={"custom"}
                  classes={"w-full"}
                  value={data?.baseUrl}
                />
              </div>

              <Button
                intent={"primary"}
                size={"lg"}
                roundness={"round"}
                children={"Add"}
                classes={"!w-1/2 !p-2 !mx-auto"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddLinkBaseModal;
