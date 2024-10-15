import React from "react";
import ReactDOM from "react-dom";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { AiOutlineGlobal, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { Button } from "../form";

const AddLinksModal = ({ closeModal, openLinkInfoModal }) => {
  const linkOptions = [
    {
      icon: <FaLinkedin className="text-2xl text-gray-600" />,
      name: "LinkedIn",
    },
    {
      icon: <FaInstagram className="text-2xl text-gray-600" />,
      name: "Instagram",
    },
    {
      icon: <FaFacebook className="text-2xl text-gray-600" />,
      name: "Facebook",
    },
    {
      icon: <AiOutlineGlobal className="text-2xl text-gray-600" />,
      name: "Website",
    },
    {
      icon: <AiOutlineMail className="text-2xl text-gray-600" />,
      name: "Email",
    },
    {
      icon: <AiOutlinePhone className="text-2xl text-gray-600" />,
      name: "Phone",
    },
  ];

  return ReactDOM.createPortal(
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-lg max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Links
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
            <div className="flex flex-col gap-4 w-full">
              {linkOptions.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white hover:bg-gray-100 cursor-pointer rounded-lg border border-gray-300"
                  onClick={openLinkInfoModal}
                >
                  <div className="flex items-center gap-4">
                    {link.icon}
                    <p className="text-base font-inter font-medium text-gray-900">
                      {link.name}
                    </p>
                  </div>
                  <FiPlus className="text-xl text-gray-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddLinksModal;
