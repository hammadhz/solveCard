import React, { useState, useEffect } from "react";
import {FiPlus, FiEdit, FiTrash2} from "react-icons/fi";
import {useDispatch, useSelector} from "react-redux";
import AddLinksModal from "../modal/AddLinksModal";
import AddLinkInfoModal from "../modal/AddLinkInfoModal";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import AddLinkBaseModal from "../modal/AddLinkBaseModal";
import { toast } from "react-toastify";
import {Button} from "../form";
import {pushPlatform, removePlatform} from "../../context/slice/profileSlice";

const Link = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addLinkOpenModal, setAddLinkOpenModal] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [platformToDelete, setPlatformToDelete] = useState(null);
  const [addLinkData, setAddLinkData] = useState({
    id: "",
    title: "",
    img: "",
    baseUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const { profileData } = useSelector((state) => state.profile);

  const handleAddLink = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleAddBaseLink = (id, title, icon, baseUrl, path, label, plaformId) => {
    setAddLinkOpenModal(true);
    setAddLinkData((prev) => ({
      ...prev,
      id: id,
      user_platforms_id: plaformId,
      title: title,
      icon: icon,
      baseUrl: baseUrl,
      path: path,
      label: label,
    }));
  };

  const handleCloseLinkBaseModal = async () => {
    setAddLinkOpenModal(false);
  };

  const openConfirmationModal = (platformId) => {
    setPlatformToDelete(platformId);
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
    setPlatformToDelete(null);
  };

  const handleDeletePlatform = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/removePlatform", {
        user_platform_id: platformToDelete,
      });
      dispatch(removePlatform(platformToDelete));
      toast.success("Platform removed successfully");
      closeConfirmationModal();
    } catch (error) {
      toast.error("Failed to remove platform");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPlatform = async (platform) => {
    try {
      await axiosInstance.post("/platformDirect", {
        user_platform_id: platform.id,
        profile_id: id,
      });
      dispatch(pushPlatform({
        ...platform,
        direct: !platform.direct,
      }))
      toast.success("Platform direct status updated successfully");
    } catch (error) {
      toast.error("Failed to update platform direct");
    }
  };

  return (
      <section className="h-full flex justify-center grow bg-primary border-r-2 border-r-white">
        <div className="flex flex-col w-full p-8 bg-white rounded-lg">
          {/* Header */}
          <header className="text-start w-full z-40 flex justify-between items-center mb-8">
            <h1 className="font-inter font-bold text-2xl">Links</h1>
            <Button
                intent={"primary"}
                children={"Add Link"}
                size={"md"}
                roundness={"round"}
                eventAction={handleAddLink}
            />
          </header>
          {isOpenModal && (
              <AddLinksModal
                  id={id}
                  closeModal={handleCloseModal}
              />
          )}
          {addLinkOpenModal && (
              <AddLinkBaseModal
                  closeModal={handleCloseLinkBaseModal}
                  data={addLinkData}
                  id={id}
              />
          )}
          {/* Content Area */}
          <div
              className="lg:h-[520px] md:h-[420px] h-[320px] overflow-y-auto flex flex-col gap-4 w-full"
              id="linksSection"
          >
            {/* Display Existing Links */}
            <div className="flex flex-col gap-4 w-full">
              {profileData?.platforms.length > 0 ? (
                  <>
                    {profileData?.platforms?.map((platform) => (
                        <div key={platform.id} className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg">
                            <div className="flex items-center gap-4">
                              <img
                                  src={`${process.env.REACT_APP_SERVER}${platform.icon}`}
                                  className="size-5 text-center"
                                  alt={platform.label}
                              />
                              <p className="text-base font-inter font-medium text-gray-900">
                                {platform.label}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox"
                                       className="sr-only peer"
                                       checked={platform.direct}
                                        onChange={() => handleDirectPlatform(platform)}
                                />
                                <div
                                    className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                              </label>
                              <FiEdit
                                  className="text-xl text-gray-600"
                                  onClick={() =>
                                      handleAddBaseLink(
                                          platform.id,
                                          platform.title,
                                          platform.icon,
                                          platform.baseUrl,
                                          platform.path,
                                          platform.label,
                                          platform.user_platforms_id,
                                      )
                                  }
                              />
                              <FiTrash2
                                  className="text-xl text-gray-600"
                                  onClick={() => openConfirmationModal(platform.user_platforms_id)}
                              />
                            </div>
                          </div>
                        </div>
                    ))}
                  </>
              ) : (
                  <div className="space-y-4">
                    <h2 className="font-inter font-medium animate-pulse">
                      This profile doesn’t have any linked content yet.
                    </h2>
                  </div>
              )}
            </div>
          </div>
        </div>
        {confirmationModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                <p className="mb-6">Are you sure you want to delete?</p>
                <div className="flex justify-end gap-4">
                  <Button
                      type="button"
                      intent={"secondary"}
                      children={"Cancel"}
                      size={"sm"}
                      roundness={"round"}
                      eventAction={closeConfirmationModal}
                  />
                  <Button
                      type="button"
                      intent={"primary"}
                      children={"Confirm"}
                      size={"sm"}
                      roundness={"round"}
                      loading={loading}
                      eventAction={handleDeletePlatform}
                  />
                </div>
              </div>
            </div>
        )}
      </section>
  );
};

export default Link;
