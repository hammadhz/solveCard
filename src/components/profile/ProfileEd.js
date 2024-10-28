import React from "react";
import { useSelector } from "react-redux";
import About from "./About";
import Link from "./Link";

const ProfileEd = () => {
  const linkData = useSelector((state) => state.profile.sectionLnk);

  return (
    <>
      {linkData === "about" && <About />}
      {linkData === "links" && <Link />}
      {/* {linkData === "linkView" && <LinkView />} */}
    </>
  );
};

export default ProfileEd;
