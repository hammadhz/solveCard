import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Input } from "../form";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const AddContactModal = ({ closeModal }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const tokenValue = useSelector((state) => state?.auth?.userInfo);
  const [profilePic, setProfilePic] = useState("");
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addContactSubmit = async (data) => {
    const body = {
      ...data,
      photo: profilePic,
      profile_id: 2,
    };
    console.log({
      "Content-Type": "application/json",
      Authorization: `Bearer ${data?.token}`,
    });
    try {
      const response = await axiosInstance.post("/addPhoneContact", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue?.token}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return ReactDOM.createPortal(
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-lg max-h-full">
        {" "}
        {/* Expanded width */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Contact
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
            <form
              className="space-y-4"
              onSubmit={handleSubmit(addContactSubmit)}
            >
              <div className="flex space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="first-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
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
              {/* <div className="flex space-x-4"> */}
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <Input
                  type={"email"}
                  nameField={"email"}
                  intent={"primary"}
                  id={"email"}
                  size={"md"}
                  classes={"w-full block p-2.5 "}
                  roundness={"round-sm"}
                  placeholder={"Email"}
                  register={register}
                />
                {/* <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  /> */}
              </div>
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <Input
                  type={"tel"}
                  nameField={"phone"}
                  intent={"primary"}
                  id={"phone"}
                  size={"md"}
                  classes={"w-full block p-2.5 "}
                  roundness={"round-sm"}
                  placeholder={"phone"}
                  maxLength={"11"}
                  minLength={"10"}
                  register={register}
                />
                {/* <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="123-456-7890"
                    required
                  /> */}
              </div>
              <div className="w-full">
                <label
                  htmlFor="website"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Website
                </label>
                <Input
                  type={"text"}
                  nameField={"website"}
                  intent={"primary"}
                  id={"website"}
                  size={"md"}
                  classes={"w-full block p-2.5 "}
                  roundness={"round-sm"}
                  placeholder={"Add website link"}
                  register={register}
                />
                {/* <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="123-456-7890"
                    required
                  /> */}
              </div>
              {/* </div> */}
              <div>
                <label
                  htmlFor="profile-pic"
                  className="block mb-2 text-center text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile Picture
                </label>
                <div className="flex items-center justify-center mb-4">
                  <label htmlFor="profile-pic" className="cursor-pointer">
                    <div className="relative w-16 h-16 overflow-hidden bg-gray-200 rounded-full">
                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt="Profile"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="flex items-center justify-center w-full h-full text-gray-400">
                          +
                        </span>
                      )}
                    </div>
                  </label>
                  <input
                    type="file"
                    id="profile-pic"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </div>
              </div>
              <Button
                intent={"primary"}
                size={"lg"}
                children={"Add"}
                classes={"w-full !p-2"}
                roundness={"round"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddContactModal;
