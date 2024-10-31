import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Input } from "../form";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const AddGroupContModal = ({ data, closeModal, handleChange }) => {
  const [description, setDescription] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const [selectedContact, setSelectedContact] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (contact) => {
    setSelectedContact(contact);
    setIsOpen(false);
    addContactIntoGroup(contact);
  };

  async function addContactIntoGroup(contactData) {
    try {
      const response = await axiosInstance.post("/addContactIntoGroup", {
        contact_id: contactData.id,
        group_id: data.id,
        profile_id: "415",
      });
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
      }
    } catch (error) {
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
  }

  const handleSelectContact = (contact) => {
    if (!selectedContacts.includes(contact)) {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const submitAddGroup = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/addGroup", {
        title: data.title,
        profile_id: "415",
      });
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

  async function getContacts() {
    try {
      const response = await axiosInstance.post("/phoneContacts", {
        profile_id: "415",
      });
      console.log(response);
      setContacts(response.data.contacts);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if (data?.isEdit) {
      getContacts();
    }
  }, [data?.isEdit]);

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
            <h3 className="text-xl font-semibold text-gray-900 ">Add Group</h3>
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
                  Group Name
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

              <div>
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
              </div>
              {data?.isEdit && (
                <>
                  <div>
                    <label
                      htmlFor="select-contact"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Select Contact
                    </label>
                    <div className="custom-dropdown relative">
                      <div
                        className="selected-option rounded-xl bg-primary border p-2 text-black cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {selectedContact ? (
                          <div className="flex flex-row gap-3 items-center">
                            <img
                              src={`${process.env.REACT_APP_SERVER}${selectedContact.photo}`}
                              className="rounded-full w-8 h-8 object-cover"
                              alt={data.first_name}
                            />
                            <p> {selectedContact.first_name}</p>
                          </div>
                        ) : (
                          "Select a contact"
                        )}
                      </div>
                      {isOpen && (
                        <div className="dropdown-options absolute w-full bg-white rounded-xl border shadow-lg mt-1">
                          {contacts?.map((data) => (
                            <div
                              className="dropdown-option flex items-center p-2 cursor-pointer hover:bg-gray-200 hover:rounded-xl"
                              key={data.id}
                              onClick={() => handleSelect(data)}
                            >
                              <img
                                src={`${process.env.REACT_APP_SERVER}${data.photo}`}
                                className="rounded-full w-8 h-8 mr-2 object-cover"
                                alt={data.first_name}
                              />
                              <span>{data.first_name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Selected Contacts
                    </label>
                    <ul className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg bg-white">
                      {selectedContacts.map((contact) => (
                        <li
                          key={contact}
                          className="p-2 border-b border-gray-300"
                        >
                          {contact}
                        </li>
                      ))}
                    </ul>
                  </div> */}
                </>
              )}

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
