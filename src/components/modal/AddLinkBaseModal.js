import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Input } from "../form";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux";
import {pushPlatform} from "../../context/slice/profileSlice";

const AddLinkBaseModal = ({ closeModal, data, id }) => {
  const [title, setTitle] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [path, setPath] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const extractUsername = (url) => {
    const lastSlashIndex = url.lastIndexOf("/");
    return url.substring(lastSlashIndex + 1);
  };

  const handleUpdatePath = (e) => {
    const path = e.target.value;
    setPath(path);
  };

  const handleUpdateTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  useEffect(() => {
    console.log('daaata', data)
    if (data?.baseUrl) {
      setBaseUrl(data?.baseUrl);
      setPath(data?.baseUrl);
    }
    if (data?.path) {
      setPath(data?.baseUrl + data?.path);
    }
    if (data?.label) {
      setTitle(data?.label);
    }

  }, [data?.baseUrl, data?.path, data?.label]);

  const submitUpdateLink = async (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Title Field is required.");
      return;
    }
    const finalPath = baseUrl ? path.replace(baseUrl, "") : path;
    if (finalPath === "" || finalPath.length < 2) {
        toast.error("Link Field is required with minimum of 2 characters.");
        return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post("/addPlatform", {
        platform_id: data?.user_platforms_id,
        path: finalPath,
        profile_id: id,
        label: title,
      });
      if (response.status === 200) {
        dispatch(pushPlatform({
          id: data?.id,
          user_platforms_id: data?.user_platforms_id,
          title: data?.title,
          icon: data?.icon,
          path: baseUrl ? path.replace(baseUrl, "") : path,
          label: title,
          baseUrl: data?.baseUrl,
          direct: data?.direct ?? 1,
        }))
        toast.success(response.data.message);
        closeModal();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
        setLoading(false);
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
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-900">
              {data?.path ? "Edit" : "Add"} Link Info
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-900 dark:hover:text-white"
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
              onSubmit={submitUpdateLink}
              className="space-y-4 text-center w-full"
            >
              <div className="flex justify-center items-center size-10 rounded-full bg-tertiary-green-30 mx-auto">
                <img
                  src={`${process.env.REACT_APP_SERVER}${data.icon}`}
                  className="size-6"
                  alt=""
                />
              </div>

              <h1 className="text-black dark:text-black">
                Add {data.title}
              </h1>

              <div>
                <h1 className="text-black text-left">
                  Title
                </h1>
                <Input
                    intent={"primary"}
                    size={"lg"}
                    roundness={"round-md"}
                    label={"Title"}
                    placeholder={"Enter Title"}
                    custom={"custom"}
                    classes={"w-full"}
                    name={"title"}
                    value={title}
                    eventAction={handleUpdateTitle}
                />
              </div>
              <div>
                <h1 className="text-black text-left">
                  Link
                </h1>
                <Input
                  intent={"primary"}
                  size={"lg"}
                  roundness={"round-md"}
                  label={"Link"}
                  placeholder={
                    data?.baseUrl ? data?.baseUrl : "Enter Link"
                  }
                  custom={"custom"}
                  classes={"w-full"}
                  name={"link"}
                  value={path}
                  eventAction={handleUpdatePath}
                />
              </div>

              <Button
                intent={"primary"}
                size={"md"}
                roundness={"round"}
                children={"Submit"}
                classes={"!w-1/2 !p-2 !mx-auto"}
                loading={loading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddLinkBaseModal;
