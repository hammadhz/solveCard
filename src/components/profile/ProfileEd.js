import React from "react";
import { useSelector } from "react-redux";
import About from "./About";
import Link from "./Link";
import QrCodeEdit from "./QrCodeEdit";

const ProfileEd = () => {
  const linkData = useSelector((state) => state.profile.sectionLnk);

  return (
    <div className={`w-full lg:w-[55%] overflow-hidden rounded-2xl`}>
      {linkData === "about" && <About />}
      {linkData === "links" && <Link />}
      {linkData === "qrCode" && <QrCodeEdit />}
    </div>
  );
};

export default ProfileEd;
