import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Input } from "../form";

const AddGroupContModal = ({ closeModal }) => {
  const [profilePic, setProfilePic] = useState("");
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [availableContacts] = useState([
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
  ]); // Example contacts

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSelectContact = (contact) => {
    if (!selectedContacts.includes(contact)) {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const handleAddGroupName = (e) => {
    setGroupName(e.target.value);
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
              Add Group
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
            <form className="space-y-4" action="#">
              <div>
                <label
                  htmlFor="group-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Group Name
                </label>

                <Input
                  type={"text"}
                  name=""
                  custom={"custom"}
                  intent={"primary"}
                  size={"md"}
                  placeholder={"Enter Group Name"}
                  roundness={"round-sm"}
                  classes={"w-full p-2.5"}
                  eventAction={handleAddGroupName}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="w-full outline-none block p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter group description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="search-contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Search Contact
                </label>
                <Input
                  type="text"
                  name="search-contact"
                  id="search-contact"
                  className="w-full block p-2.5"
                  placeholder="Search for contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg bg-white">
                  {availableContacts
                    .filter((contact) =>
                      contact.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((contact) => (
                      <li
                        key={contact}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSelectContact(contact)}
                      >
                        {contact}
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Selected Contacts
                </label>
                <ul className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg bg-white">
                  {selectedContacts.map((contact) => (
                    <li key={contact} className="p-2 border-b border-gray-300">
                      {contact}
                    </li>
                  ))}
                </ul>
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

export default AddGroupContModal;
