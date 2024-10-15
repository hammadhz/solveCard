import React from "react";
import { Input } from "./form";
import search from "../assets/svgs/search-icon.svg";
import { useForm } from "react-hook-form";

const Searchbar = () => {
  const { register } = useForm();

  return (
    <Input
      type={"text"}
      placeholder={"Search"}
      intent={"primary"}
      size={"sm"}
      classes={"!px-5"}
      reactSvgIcon={search}
      parentDivH={"w-[450px]"}
      positionIcon={"absolute right-5 top-1/2 transform -translate-y-1/2"}
      nameField={"search"}
      register={register}
    />
  );
};

export default Searchbar;
