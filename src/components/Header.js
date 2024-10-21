import React from "react";
import Searchbar from "./Searchbar";
import Avatar from "./Avatar";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <Searchbar />
      <Avatar />
    </header>
  );
};

export default Header;
