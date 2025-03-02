import React, {useState} from "react";
import { IoMdAdd } from "react-icons/io";
import QRCodeModal from "../modal/QRCodeModal";
import {useSelector} from "react-redux";
import AddProfileModal from "../modal/AddProfileModal";

const AddProfileCard = ({ onProfileAdded }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ModalType, setModalType] = useState("");
    const userData = useSelector((state) => state?.auth?.user);

    const handleOpenModal = () => {
        if (userData?.is_pro && userData?.is_subscribed) {
            setModalType("addProfile")
            setIsModalOpen(true);
        } else {
            setModalType("qrCode")
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
  return (
      <>
          <div
              className="bg-primary p-4 rounded-2xl h-full min-h-64 relative flex flex-col gap-2 justify-center items-center cursor-pointer"
              onClick={handleOpenModal}
          >
              <div className="bg-gradient-to-t from-tertiary-green-60 to-tertiary-green-70 size-16 rounded-full flex justify-center items-center">
                  <IoMdAdd className="size-8" />
              </div>
              <p className="font-inter font-medium text-lg text-center">New Card</p>
          </div>
          {isModalOpen && ModalType === 'qrCode' && <QRCodeModal onClose={handleCloseModal} />}
          {isModalOpen && ModalType === 'addProfile' && <AddProfileModal onClose={handleCloseModal} onProfileAdded={onProfileAdded} />}
      </>
  );
};

export default AddProfileCard;
