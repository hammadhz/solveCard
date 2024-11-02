import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Input } from "../form";

const AddLinkInfoModal = ({ closeModal, selectedLink }) => {
  const [form, setForm] = useState({
    linkTitle: selectedLink?.name || "",
    linkURL: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as saving the link
  };

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
              Add Link Information
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-4">
                {selectedLink?.icon}
                <h4 className="text-lg font-inter font-medium text-gray-900">
                  {selectedLink?.name}
                </h4>
              </div>
              <div className="w-full">
                <label
                  htmlFor="link-title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Link Title
                </label>
                <Input
                  type={"text"}
                  nameField={"linkTitle"}
                  intent={"primary"}
                  id={"link-title"}
                  size={"md"}
                  classes={"w-full block p-2.5 "}
                  roundness={"round-sm"}
                  custom={"custom"}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="link-url"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Link URL
                </label>
                <Input
                  type={"url"}
                  nameField={"linkURL"}
                  intent={"primary"}
                  id={"link-url"}
                  size={"md"}
                  classes={"w-full block p-2.5 "}
                  roundness={"round-sm"}
                  custom={"custom"}
                  placeholder={"https://example.com"}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  intent={"secondary"}
                  children={"Cancel"}
                  size={"md"}
                  roundness={"round"}
                  classes={""}
                  onClick={closeModal}
                />
                <Button
                  intent={"primary"}
                  children={"Add"}
                  size={"lg"}
                  roundness={"round"}
                  classes={"!bg-blue-500 !text-white"}
                  type={"submit"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddLinkInfoModal;
