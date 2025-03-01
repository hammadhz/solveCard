import React from "react";
import { useSelector } from "react-redux";
import About from "./About";
import Link from "./Link";

const ProfileEd = () => {
  const linkData = useSelector((state) => state.profile.sectionLnk);

  return (
    <div className={`w-full lg:w-[55%] overflow-hidden rounded-2xl`}>
      {linkData === "about" && <About />}
      {linkData === "links" && <Link />}
      {/* {linkData === "linkView" && <LinkView />} */}
    </div>
  );
};

export default ProfileEd;
