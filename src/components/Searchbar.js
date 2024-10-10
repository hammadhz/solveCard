import React from "react";
import { Input } from "./form";
import search from "../assets/svgs/search-icon.svg";

const Searchbar = () => {
  return (
    <Input
      type={"text"}
      placeholder={"Search"}
      name={"search"}
      intent={"primary"}
      size={"sm"}
      classes={""}
      icon={search}
      parentDivH={"w-[450px]"}
      positionIcon={"absolute top-2 right-4"}
    />
  );
};

export default Searchbar;
