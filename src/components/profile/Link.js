import React, { useState, useEffect } from "react";
import { Button } from "../form";
import { FaLinkedin } from "react-icons/fa";
import { FiPlus, FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { AiOutlineGlobal, AiOutlinePhone } from "react-icons/ai";
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
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(true);

  const userData = useSelector((state) => state?.auth);
  // const handleSelectColor = (color) => {
  //   dispatch(selectColor(color));
  // };

  // const handleLinkSelectColor = (color) => {
  //   dispatch(selectLinkColor(color));
  // };

  // const togglePicker = () => {
  //   setPickerOpen(!isPickerOpen);
  // };

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
      const response = await axiosInstance.post("/categories", {
        profile_id: id,
      });
      const { categories } = response.data;
      // const value = categories[0];
      setLinks(categories);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  }

  useEffect(() => {
    getLinks();
  }, [update]);

  const handleAddBaseLink = (id, title, img, baseUrl, path) => {
    console.log(id, title, img);
    setAddLinkOpenModal(true);
    setAddLinkData((prev) => ({
      ...prev,
      id: id,
      title: title,
      img: img,
      baseUrl: baseUrl,
      path: path,
    }));
  };

  const handleCloseLinkBaseModal = async () => {
    setAddLinkOpenModal(false);
    setLoading(true);
    await getLinks();
  };

  const handleUpdate = () => {
    setUpdate((prev) => ({
      ...prev,
      update: !update,
    }));
  };

  return (
    <section className="h-full flex justify-center grow bg-primary border-r-2 border-r-white">
      <div className="flex flex-col w-full p-8 bg-white rounded-lg">
        {/* Header */}
        <header className="text-start w-full z-40 flex justify-between items-center mb-8">
          <h1 className="font-inter font-bold text-2xl">Links</h1>
          {/* <Button
            intent={"secondary"}
            size={"md"}
            roundness={"round"}
            children={"Add Links"}
            classes={"!bg-black !text-white px-4 py-2"}
            eventAction={handleAddLink}
          /> */}
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
            id={id}
            handleUpdate={handleUpdate}
          />
        )}
        {/* Content Area */}
        <div
          className="h-[520px] overflow-y-auto flex flex-col gap-4 w-full"
          id="linksSection"
        >
          {/* Display Existing Links */}
          <div className="flex flex-col gap-4 w-full">
            {loading ? (
              <div className="space-y-4">
                <h2 className="text-lg font-inter font-medium text-gray-900 animate-pulse">
                  Loading...
                </h2>
                <div className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-300 w-10 h-10 rounded-full animate-pulse"></div>
                    <p className="text-base font-inter font-medium text-gray-900 animate-pulse">
                      Loading link name...
                    </p>
                  </div>
                  <div className="bg-gray-300 w-6 h-6 rounded-full animate-pulse"></div>
                </div>
                {/* Add more divs with the same structure as needed */}
                <div className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-300 w-10 h-10 rounded-full animate-pulse"></div>
                    <p className="text-base font-inter font-medium text-gray-900 animate-pulse">
                      Loading link name...
                    </p>
                  </div>
                  <div className="bg-gray-300 w-6 h-6 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                {links?.map((result) => {
                  return (
                    <div key={result?.id} className="space-y-4">
                      <h2 className="text-lg font-inter font-medium text-gray-900">
                        {result?.name}
                      </h2>

                      {/* Email Link */}
                      {result?.platforms?.filter((value) => parseInt(value?.pro) === userData.user.is_pro).map((data) => {
                        return (
                          <div
                            key={data?.id}
                            className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg"
                            //   onClick={() => handleEditLink("email")}
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={`${process.env.REACT_APP_SERVER}${data?.icon}`}
                                className="size-5"
                                alt="social_logo"
                              />
                              {/* <AiOutlineMail className="text-2xl text-gray-600" /> */}
                              <p className="text-base font-inter font-medium text-gray-900">
                                {data?.title}
                              </p>
                            </div>
                            {data?.path ? (
                              <FiEdit
                                className="text-xl text-gray-600"
                                onClick={() =>
                                  handleAddBaseLink(
                                    data?.id,
                                    data?.title,
                                    data?.icon,
                                    data?.baseURL,
                                    data?.path
                                  )
                                }
                              />
                            ) : (
                              <FiPlus
                                className="text-xl text-gray-600"
                                onClick={() =>
                                  handleAddBaseLink(
                                    data?.id,
                                    data?.title,
                                    data?.icon,
                                    data?.baseURL
                                  )
                                }
                              />
                            )}
                            {/* <div className="rounded-full size-6 flex justify-center items-center bg-gray-400 hover:bg-gray-900"> */}

                            {/* </div> */}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            )}

            {/* Phone Link */}
            {/* <div
              className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg"
             
            >
              <div className="flex items-center gap-4">
                <AiOutlinePhone className="text-2xl text-gray-600" />
                <p className="text-base font-inter font-medium text-gray-900">
                  Phone: +123456789
                </p>
              </div>
              <FiEdit className="text-xl text-gray-600" />
            </div> */}
          </div>

          {/* Suggested Links Section */}
          {/* <div className="flex flex-col gap-4 w-full">
            <h2 className="text-lg font-inter font-medium text-gray-900">
              Suggested Links
            </h2>

            <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-100 cursor-pointer rounded-lg border border-gray-300">
              <div className="flex items-center gap-4">
                <FaLinkedin className="text-2xl text-gray-600" />
                <p className="text-base font-inter font-medium text-gray-900">
                  LinkedIn
                </p>
              </div>
              <FiPlus className="text-xl text-gray-600" />
            </div>

            <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-100 cursor-pointer rounded-lg border border-gray-300">
              <div className="flex items-center gap-4">
                <AiOutlineGlobal className="text-2xl text-gray-600" />
                <p className="text-base font-inter font-medium text-gray-900">
                  Website
                </p>
              </div>
              <FiPlus className="text-xl text-gray-600" />
            </div>
          </div> */}
        </div>
        {/*<footer className=" p-4 w-full  bg-white flex justify-end items-center gap-4">*/}
        {/*  <Button*/}
        {/*    intent={"secondary"}*/}
        {/*    children={"Update"}*/}
        {/*    size={"lg"}*/}
        {/*    roundness={"round"}*/}
        {/*    classes={"!bg-black !text-white"}*/}
        {/*  />*/}
        {/*  <Button*/}
        {/*    intent={"secondary"}*/}
        {/*    children={"Cancel"}*/}
        {/*    size={"lg"}*/}
        {/*    roundness={"round"}*/}
        {/*    classes={"!bg-black !text-white"}*/}
        {/*  />*/}
        {/*</footer>*/}
      </div>
    </section>
  );
};

export default Link;
