import React from "react";
import ProfileNav from "./ProfileNav";
import ProfileEd from "./ProfileEd";
import ProfileView from "./ProfileView";
import {useSelector} from "react-redux";
import QrCodePreview from "./QrCodePreview";
const ProfileEdit = () => {
    const linkData = useSelector((state) => state.profile.sectionLnk);

    return (
    <section className="w-full h-full lg:h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-4 rounded-2xl bg-primary p-4">
        <ProfileNav />
        <ProfileEd />
        {linkData === "qrCode" ?  <QrCodePreview /> : <ProfileView />}
    </section>
  );
};

export default ProfileEdit;
