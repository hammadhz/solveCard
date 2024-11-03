import React, { useEffect, useState } from "react";
import { Button } from "../form";
import AddGroupContModal from "../modal/AddGroupContModal";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import EditGrpContact from "../modal/EditGrpContact";
import { useSelector } from "react-redux";

const GroupConTbl = () => {
  const profileId = useSelector((state) => state.profile.profileId);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditConModal, setIsOpenEditConModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupData, setGroupData] = useState({
    isEdit: false,
    isAdd: false,
    data: "",
  });
  const [editGrpConData, setEditGrpConData] = useState({
    data: "",
  });
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);

  const openAddContactModal = () => {
    setIsOpenModal(!isOpenModal);
    setGroupData((prev) => ({
      ...prev,
      isAdd: true,
    }));
  };

  const closeAddContactModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  async function getGroups() {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/groups", {
        profile_id: profileId,
      });
      if (response.status === 200) {
        setGroups(response.data.groups);
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
      console.error(error?.response);
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
      // toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    getGroups();
  }, [change]);

  const editGroup = (data, isEdit) => {
    setIsOpenModal(true);
    setGroupData((prev) => ({
      ...prev,
      data: data,
      isEdit: isEdit,
      isAdd: false,
    }));
  };

  const handleChange = () => {
    setChange(!change);
  };

  async function deleteGroup(id) {
    try {
      const response = await axiosInstance.post("/removeGroup", {
        group_id: id,
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

  const handleEditGrpContact = (data) => {
    setIsOpenEditConModal(true);
    setEditGrpConData(data);
  };

  const closeEditGrpContactModal = () => {
    setIsOpenEditConModal(!isOpenEditConModal);
  };

  return (
    <div className="w-full min-h-[150px] bg-primary rounded-2xl p-6 mb-20">
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full h-16  rounded-xl flex justify-between items-center">
          <h1 className="font-inter font-bold text-2xl">Groups</h1>
          <Button
            intent={"primary"}
            size={"lg"}
            children={"Add Group"}
            roundness={"round"}
            classes={""}
            type={"button"}
            eventAction={openAddContactModal}
          />
          {isOpenModal && (
            <AddGroupContModal
              handleChange={handleChange}
              grpData={groupData}
              closeModal={closeAddContactModal}
            />
          )}
          {isOpenEditConModal && (
            <EditGrpContact
              handleChange={handleChange}
              grpData={editGrpConData}
              closeModal={closeEditGrpContactModal}
            />
          )}
        </div>
        <div className="w-full min-h-[130px]  bg-white rounded-xl">
          <div className="w-full h-full  overflow-auto p-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Contacts
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Numbers
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      colSpan={4}
                      className="py-3 text-center text-gray-500 dark:text-gray-400"
                    >
                      Loading....
                    </td>
                  </tr>
                ) : (
                  <>
                    {groups.length === 0 ? (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td
                          colSpan={4}
                          className="py-3 text-center text-gray-500 dark:text-gray-400"
                        >
                          No Group Record
                        </td>
                      </tr>
                    ) : (
                      <>
                        {groups?.map((result) => {
                          return (
                            <tr
                              key={result.id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <td className="px-6 py-4">{result.title}</td>
                              <td className="px-6 py-4">
                                <div className="bg-secondary px-4 py-1 rounded-full w-max text-white">
                                  {result.total_contacts}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="bg-secondary px-4 py-1 rounded-full w-max text-white">
                                  {result.total_members}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div
                                    onClick={() => editGroup(result, true)}
                                  className="font-medium text-blue-600 cursor-pointer hover:underline"
                                >
                                  Edit Group
                                </div>
                                <div
                                  onClick={() => deleteGroup(result.id)}
                                  className="font-medium text-blue-600 cursor-pointer hover:underline"
                                >
                                  Delete Group
                                </div>
                                <div
                                  onClick={() => handleEditGrpContact(result)}
                                  className="font-medium text-blue-600 cursor-pointer hover:underline"
                                >
                                  Add Contact
                                </div>
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

export default GroupConTbl;
