import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { FiPlus } from "react-icons/fi";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import AddLinkInfoModal from "./AddLinkInfoModal";
import AddLinkBaseModal from "./AddLinkBaseModal";
import {useSelector} from "react-redux";

const AddLinksModal = ({ id, closeModal }) => {
  const userData = useSelector((state) => state?.auth?.user);

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLinkInfoOpenModal, setIsLinkInfoOpenModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const categoryRefs = useRef({});
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.post("/categories", {
        profile_id: id,
      });
      setCategories(response.data.categories);
      setActiveCategory(response.data.categories[0]?.id || null);
    } catch (error) {
      console.log(error.data)
      toast.error(error?.data?.message ?? "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [id]);

  const handleTabClick = (categoryId) => {
    setActiveCategory(categoryId);
    categoryRefs.current[categoryId]?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlatformClick = (platform) => {
    if (userData.is_pro === 0 && platform.pro === "1") {
        toast.error("Upgrade to pro to use this link");
        return;
    }

    setSelectedPlatform({
      id: Date.now(),
      user_platforms_id: platform?.id,
      title: platform.title,
      icon: platform.icon,
      baseUrl: platform.baseURL,
      path: "",
      label: "",
    });
    setIsLinkInfoOpenModal(true);
  };

  const handleCloseModalLink = () => {
    setIsLinkInfoOpenModal(false);
    setLoading(true);
    fetchCategories();
  };

  return ReactDOM.createPortal(
      <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="false"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-4xl max-h-full">
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
              {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <span className="loader"></span>
                  </div>
              ) : (
                  <>
                    {/* Tabs for Categories */}
                    <div className="flex overflow-x-auto space-x-4 mb-4">
                      {categories.map((category) => (
                          <button
                              key={category.id}
                              className={`px-4 py-2 rounded-lg ${
                                  activeCategory === category.id
                                      ? "bg-gray-200 text-gray-900"
                                      : "bg-gray-100 text-gray-600"
                              }`}
                              onClick={() => handleTabClick(category.id)}
                          >
                            {category.name}
                          </button>
                      ))}
                    </div>
                    {/* Categories and Platforms */}
                    <div className="flex flex-col gap-4 w-full pr-3 max-h-[400px] overflow-y-auto">
                      {categories.map((category) => (
                          <div
                              key={category.id}
                              ref={(el) => (categoryRefs.current[category.id] = el)}
                              className="space-y-4"
                          >
                            <h4 className="text-lg font-semibold text-gray-900">
                              {category.name}
                            </h4>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              {category.platforms.map((platform) => (
                                  <div
                                      key={platform.id}
                                      className="flex items-center justify-between p-4 bg-white hover:bg-gray-100 cursor-pointer rounded-lg border border-gray-300"
                                      onClick={() => handlePlatformClick(platform)}
                                  >
                                    <div className="flex items-center gap-4">
                                      <img
                                          src={`${process.env.REACT_APP_SERVER}${platform.icon}`}
                                          className="size-5 text-center"
                                          alt={platform.title[0]}
                                      />
                                      <p className="text-base font-inter font-medium text-gray-900">
                                        {platform.title}
                                      </p>
                                    </div>
                                    <div className="flex items-center justify-center gap-1">
                                      {platform.pro === '1' && (
                                          <div
                                              className="bg-black text-xs w-7 h-7 rounded-full text-white flex items-center justify-center">
                                            Pro
                                          </div>
                                      )}
                                      {platform.Total_used > 0 && (
                                          <div
                                              className="bg-black text-xs w-7 h-7 rounded-full text-white flex items-center justify-center">
                                            {platform.Total_used}
                                          </div>
                                      )}
                                      <FiPlus className="text-xl text-gray-600"/>
                                    </div>
                                  </div>
                              ))}
                            </div>
                          </div>
                      ))}
                    </div>
                  </>
              )}
            </div>
          </div>
        </div>
        {isLinkInfoOpenModal && (
            <AddLinkBaseModal
                closeModal={handleCloseModalLink}
                data={selectedPlatform}
                id={id}
            />
        )}
      </div>,
      document.body
  );
};

export default AddLinksModal;