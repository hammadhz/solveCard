import React, { useEffect, useState } from "react";
import { Button } from "../form";
import AddContactModal from "../modal/AddContactModal";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const ContactTbl = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [change, setChange] = useState(false);

  const openAddContactModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const closeAddContactModal = () => {
    setIsOpenModal(!isOpenModal);
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
    getContacts();
  }, [change]);

  const deleteContact = async (id) => {
    console.log(id);
    try {
      const response = await axiosInstance.post("/removeContact", {
        contact_id: id,
        profile_id: "415",
      });
      console.log(response);
      setChange(!change);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[450px] bg-primary rounded-2xl p-6 mb-20">
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
          {isOpenModal && <AddContactModal closeModal={closeAddContactModal} />}
        </div>
        <div className="w-full h-[330px]  bg-white rounded-xl">
          <div className="w-full h-full  overflow-auto p-3">
            {/* <table className="w-full border-separate rounded-xl border-2 border-tertiary-gray-700">
              <thead className="text-base font-inter font-bold uppercase">
                <tr>
                  <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Name
                  </th>

                  <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Name
                  </th>
                  <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Name
                  </th>
                  <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Name
                  </th>
                  <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Name
                  </th>
                  <th className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody className="text-base font-inter font-normal">
                <tr className="">
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                </tr>
                <tr className="">
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                </tr>
                <tr className="">
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                </tr>
                <tr className="">
                  <td className="flex-nowrap px-6 py-3 border-2 rounded-lg border-tertiary-gray-700">
                    Moiz
                  </td>
                </tr>
              </tbody>
            </table> */}

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Job Title
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
                {contacts?.map((result) => {
                  return (
                    <tr
                      key={result.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={`${process.env.REACT_APP_SERVER}${result.photo}`}
                          alt="phot"
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">
                            {result?.first_name}
                          </div>
                          <div className="font-normal text-gray-500">
                            {result.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{result.job_title}</td>
                      <td className="px-6 py-4">{result?.phone}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">
                          Edit
                        </p>
                        <p
                          onClick={() => deleteContact(result.id)}
                          className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactTbl;
