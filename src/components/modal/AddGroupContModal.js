import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Input } from "../form";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AddGroupContModal = ({ grpData, closeModal, handleChange }) => {
  // const [description, setDescription] = useState("");
  const profileId = useSelector((state) => state.profile.profileId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (grpData) {
      reset({
        title: grpData?.data?.title,
      });
    }
  }, [grpData, reset]);

  const submitAddGroup = async (data) => {
    try {
      setLoading(true);
      let response;
      if (grpData?.isEdit) {
        response = await axiosInstance.post("/updateGroup", {
          title: data.title,
          group_id: grpData?.data?.id,
          profile_id: profileId,
          active: "1",
        });
      } else {
        response = await axiosInstance.post("/addGroup", {
          title: data.title,
          profile_id: profileId,
        });
      }
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleChange();
        closeModal();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">{grpData?.isEdit ? "Edit" : "Add"} Group</h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
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
            <form className="space-y-4" onSubmit={handleSubmit(submitAddGroup)}>
              <div>
                <label
                  htmlFor="group-name"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Group Title
                </label>

                <Input
                  type={"text"}
                  nameField="title"
                  intent={"primary"}
                  size={"md"}
                  placeholder={"Enter Group Name"}
                  roundness={"round-sm"}
                  classes={"w-full p-2.5"}
                  register={register}
                />
              </div>

              {/* <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full outline-none block p-2.5 bg-primary  text-gray-900 text-sm rounded-lg   "
                  placeholder="Enter group description"
                  {...register("description")}
                ></textarea>
              </div> */}

              <Button
                type={"submit"}
                intent={"primary"}
                size={"lg"}
                children={"Add"}
                classes={"w-full !p-2"}
                roundness={"round"}
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

export default AddGroupContModal;
