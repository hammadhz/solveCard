import React from "react";
import Button from "../components/form/Button";
import rightIcon from "../assets/svgs/right-arrow.svg";
import edit from "../assets/svgs/edit.svg";
import hidePwd from "../assets/svgs/hide-pwd.svg";
import searchIcon from "../assets/svgs/search-icon.svg";
import Input from "../components/form/Input";
import TextArea from "../components/form/TextArea";

const Test = () => {
  return (
    <>
      <div className="p-4 space-y-4">
        <Button
          type={"submit"}
          children={"Login"}
          intent={"primary"}
          size={"xlg"}
          roundness={"round"}
          iconRight={rightIcon}
          classes={"gap-2"}
        />

        <Button
          type={"submit"}
          children={"view articles"}
          intent={"primary"}
          size={"lg"}
          roundness={"round"}
        />

        <Button
          type={"submit"}
          children={"start chat"}
          intent={"primary"}
          size={"sm"}
          roundness={"round"}
        />

        <Button
          type={"submit"}
          children={"Edit"}
          intent={"secondary"}
          size={"md"}
          roundness={"round"}
          classes={"gap-2"}
          iconLeft={edit}
        />

        <Button
          type={"submit"}
          children={"Edit"}
          intent={"primary"}
          size={"md"}
          roundness={"round"}
          iconLeft={edit}
          classes={"gap-2"}
        />

        <Button
          type={"click"}
          intent={"primary"}
          size={"cr"}
          roundness={"pill"}
          iconLeft={edit}
        />
      </div>

      <div className="w-[230px] mb-3">
        <Input
          type={"text"}
          intent={"primary"}
          roundness={"round-md"}
          size={"lg"}
          placeholder={"Enter your name"}
          icon={hidePwd}
          classes={""}
          positionIcon={"absolute top-4 right-2"}
        />
      </div>
      <Input
        type={"text"}
        intent={"secondary"}
        roundness={"round-md"}
        size={"md"}
        placeholder={"Enter your name"}
        classes={"mb-8"}
      />
      <Input
        type={"text"}
        intent={"secondary"}
        roundness={"round-lg"}
        size={"sm"}
        placeholder={"Enter your name"}
        classes={"pl-4 mb-8"}
        icon={searchIcon}
        parentDivH={"w-[450px]"}
        positionIcon={"absolute top-2 right-4"}
      />

      <TextArea
        name={""}
        placeholder={"Disclaimer"}
        cols={50}
        rows={4}
        roundness={"round-md"}
        intent={"primary"}
        size={"lg"}
      />
    </>
  );
};

export default Test;
