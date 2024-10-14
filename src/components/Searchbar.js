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
      classes={""}
      reactSvgIcon={search}
      parentDivH={"w-[450px]"}
      positionIcon={"absolute top-2 right-4"}
      nameField={"search"}
      register={register}
    />
  );
};

export default Searchbar;
