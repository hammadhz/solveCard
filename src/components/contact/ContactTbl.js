import React, { useEffect, useState } from "react";
import { Button } from "../form";
import AddContactModal from "../modal/AddContactModal";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import EditContactModal from "../modal/EditContactModal";
import { useSelector } from "react-redux";

const ContactTbl = () => {
  const profileId = useSelector((state) => state.profile.profileId);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditOpenModal, setIsEditOpenModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({
    action: "edit",
    data: null,
  });

  const openAddContactModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const closeAddContactModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const closeEditContactModal = () => {
    setIsEditOpenModal(!isEditOpenModal);
  };

  async function getContacts() {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/phoneContacts", {
        profile_id: profileId,
      });
      if (response.status === 200) {
        setContacts(response.data.contacts);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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

  useEffect(() => {
    getContacts();
  }, [change]);

  const deleteContact = async (id) => {
    try {
      const response = await axiosInstance.post("/removeContact", {
        contact_id: id,
        profile_id: profileId,
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
      setChange(!change);
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
  };

  const handleEditContact = (data) => {
    setIsEditOpenModal(true);
    setEditData((prev) => ({
      ...prev,
      data: data,
    }));
  };

  const handleChange = () => {
    setChange(!change);
  };

  return (
    <div className="w-full min-h-[150px] bg-primary rounded-2xl p-6 mb-20">
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full h-16  rounded-xl flex justify-between items-center">
          <h1 className="font-inter font-bold text-2xl">Contacts</h1>
          <Button
            intent={"primary"}
            size={"lg"}
            children={"Add Contact"}
            roundness={"round"}
            classes={""}
            type={"button"}
            eventAction={openAddContactModal}
          />
          {isOpenModal && (
            <AddContactModal
              handleChange={handleChange}
              closeModal={closeAddContactModal}
            />
          )}
          {isEditOpenModal && (
            <EditContactModal
              editData={editData}
              handleChange={handleChange}
              closeModal={closeEditContactModal}
            />
          )}
        </div>
        <div className="w-full min-h-[150px]  bg-white rounded-xl">
          <div className="w-full h-full  overflow-auto p-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="bg-white border-b">
                    <td
                      colSpan={4}
                      className="py-3 text-center text-gray-500"
                    >
                      Loading....
                    </td>
                  </tr>
                ) : (
                  <>
                    {contacts.length === 0 ? (
                      <tr className="bg-white border-b">
                        <td
                          colSpan={4}
                          className="py-3 text-center text-gray-500"
                        >
                          No Contacts
                        </td>
                      </tr>
                    ) : (
                      <>
                        {contacts?.map((result) => {
                          return (
                            <tr
                              key={result.id}
                              className="bg-white border-b hover:bg-gray-50"
                            >
                              <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={`${process.env.REACT_APP_SERVER}${result.photo}`}
                                  alt="phot"
                                />
                                <div className="ps-3">
                                  <div className="text-base font-semibold">
                                    {result?.first_name} {result?.last_name}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">{result.email}</td>
                              <td className="px-6 py-4">{result?.phone}</td>
                              <td className="px-6 py-4">
                                <p
                                  onClick={() => handleEditContact(result)}
                                  className="font-medium cursor-pointer text-blue-600 hover:underline"
                                >
                                  Edit
                                </p>
                                <p
                                  onClick={() => deleteContact(result.id)}
                                  className="font-medium cursor-pointer text-blue-600 hover:underline"
                                >
                                  Delete
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTbl;
