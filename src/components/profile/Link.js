import React, { useState, useRef, useEffect } from "react";
import { Button, Input, TextArea } from "../form";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaLinkedin, FaPen } from "react-icons/fa";
import { FiPlus, FiEdit } from "react-icons/fi";
import {
  MdColorize,
  MdGifBox,
  MdOutlinePhotoLibrary,
  MdPhotoLibrary,
} from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { TiCancel } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  resetColor,
  resetLinkColor,
  selectColor,
  selectLinkColor,
} from "../../context/slice/themeSlice";
import ColorPicker from "react-pick-color";
import { AiOutlineGlobal, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import AddLinksModal from "../modal/AddLinksModal";
import AddLinkInfoModal from "../modal/AddLinkInfoModal";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import AddLinkBaseModal from "../modal/AddLinkBaseModal";

const Link = () => {
  const { id } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLinkInfoOpenModal, setIsLinkInfoOpenModal] = useState(false);
  const [addLinkOpenModal, setAddLinkOpenModal] = useState(false);
  const [addLinkData, setAddLinkData] = useState({
    id: "",
    title: "",
    img: "",
    baseUrl: "",
  });
  const [links, setLinks] = useState([]);
  const [pickerColor, setPickerColor] = useState("#ffffff");
  const [isPickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef(null);

  const userData = useSelector((state) => state?.auth);

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

  const handleAddLink = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleAddInfo = () => {
    setIsLinkInfoOpenModal(true);
  };

  const handleCloseModalLink = () => {
    setIsLinkInfoOpenModal(false);
  };

  async function getLinks() {
    try {
      const response = await axiosInstance.post(
        "/categories",
        { profile_id: id },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      const { categories } = response.data;
      const value = categories[0];
      setLinks(value.platforms);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(links);
  useEffect(() => {
    getLinks();
  }, []);

  const handleAddBaseLink = (id, title, img, baseUrl) => {
    console.log(id, title, img);
    setAddLinkOpenModal(true);
    setAddLinkData((prev) => ({
      ...prev,
      id: id,
      title: title,
      img: img,
      baseUrl: baseUrl,
    }));
  };
  console.log(addLinkData, "data link");
  const handleCloseLinkBaseModal = () => {
    setAddLinkOpenModal(false);
  };

  return (
    <section className="h-full flex justify-center grow bg-primary border-r-2 border-r-white">
      <div className="flex flex-col w-full p-8 bg-white rounded-lg">
        {/* Header */}
        <header className="text-start w-full z-40 flex justify-between items-center mb-8">
          <h1 className="font-inter font-bold text-2xl">Links</h1>
          <Button
            intent={"secondary"}
            size={"md"}
            roundness={"round"}
            children={"Add Links"}
            classes={"!bg-black !text-white px-4 py-2"}
            eventAction={handleAddLink}
          />
        </header>
        {isOpenModal && (
          <AddLinksModal
            close={handleCloseModal}
            openLinkInfoModal={handleAddInfo}
          />
        )}
        {isLinkInfoOpenModal && (
          <AddLinkInfoModal closeModal={handleCloseModalLink} />
        )}
        {addLinkOpenModal && (
          <AddLinkBaseModal
            closeModal={handleCloseLinkBaseModal}
            data={addLinkData}
          />
        )}
        {/* Content Area */}
        <div
          className="h-[520px] overflow-y-auto flex flex-col gap-4 w-full"
          id="linksSection"
        >
          {/* Display Existing Links */}
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-lg font-inter font-medium text-gray-900">
              Your Links
            </h2>

            {/* Email Link */}
            {links?.map((result) => {
              return (
                <div
                  key={result?.id}
                  className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg"
                  //   onClick={() => handleEditLink("email")}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`${process.env.REACT_APP_SERVER}${result?.icon}`}
                      className="size-5"
                      alt="social_logo"
                    />
                    {/* <AiOutlineMail className="text-2xl text-gray-600" /> */}
                    <p className="text-base font-inter font-medium text-gray-900">
                      {result?.title}
                    </p>
                  </div>
                  {result?.path && <FiEdit className="text-xl text-gray-600" />}
                  {/* <div className="rounded-full size-6 flex justify-center items-center bg-gray-400 hover:bg-gray-900"> */}
                  <FiPlus
                    className="text-xl text-gray-600"
                    onClick={() =>
                      handleAddBaseLink(
                        result?.id,
                        result?.title,
                        result?.icon,
                        result?.baseURL
                      )
                    }
                  />
                  {/* </div> */}
                </div>
              );
            })}

            {/* Phone Link */}
            <div
              className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg"
              //   onClick={() => handleEditLink("phone")}
            >
              <div className="flex items-center gap-4">
                <AiOutlinePhone className="text-2xl text-gray-600" />
                <p className="text-base font-inter font-medium text-gray-900">
                  Phone: +123456789
                </p>
              </div>
              <FiEdit className="text-xl text-gray-600" />
            </div>
          </div>

          {/* Suggested Links Section */}
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-lg font-inter font-medium text-gray-900">
              Suggested Links
            </h2>

            {/* Suggested: LinkedIn */}
            <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-100 cursor-pointer rounded-lg border border-gray-300">
              <div className="flex items-center gap-4">
                <FaLinkedin className="text-2xl text-gray-600" />
                <p className="text-base font-inter font-medium text-gray-900">
                  LinkedIn
                </p>
              </div>
              <FiPlus className="text-xl text-gray-600" />
            </div>

            {/* Suggested: Website */}
            <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-100 cursor-pointer rounded-lg border border-gray-300">
              <div className="flex items-center gap-4">
                <AiOutlineGlobal className="text-2xl text-gray-600" />
                <p className="text-base font-inter font-medium text-gray-900">
                  Website
                </p>
              </div>
              <FiPlus className="text-xl text-gray-600" />
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

export default Link;
