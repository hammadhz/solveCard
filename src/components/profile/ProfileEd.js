import React from "react";
import { Button, Input } from "../form";
import { useForm } from "react-hook-form";

const ProfileEd = () => {
  const { register } = useForm();
  return (
    <section className="h-[480px] flex justify-center grow bg-primary border-r-2 border-r-white">
      <div className="flex flex-col w-full">
        <header className=" text-start p-4 w-full  bg-white z-40">
          <h1 className="font-inter font-bold text-base">About</h1>
        </header>
        <div
          className="h-[520px] overflow-y-auto flex flex-col gap-4 p-3 w-full bg-white"
          id="profileEdit"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"sm"}
                classes={"w-full !p-1"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
            <div className="flex items-center w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"sm"}
                classes={"w-full !p-1"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
          </div>

          <div className="flex justify-around gap-4">
            <div className="flex flex-col gap-2 items-center">
              <p className="font-inter text-sm font-normal">Profile picture:</p>
              <div className="rounded-full size-20 bg-tertiary-gray-700"></div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="font-inter text-sm font-normal">Profile picture:</p>
              <div className="rounded-lg h-20 w-40 bg-tertiary-gray-700"></div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="font-inter text-sm font-normal">Profile picture:</p>
              <div className="rounded-full size-20 bg-tertiary-gray-700"></div>
            </div>
          </div>

          <div className="flex justify-center items-center  gap-4">
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
          </div>

          <div className="flex justify-center items-center  gap-4">
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
          </div>
          <div className="flex justify-center items-center  gap-4">
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
            <div className="flex flex-col items-start w-full gap-2">
              <p className="font-inter text-sm font-normal">Card Name:</p>
              <Input
                type={"text"}
                intent={"secondary"}
                size={"lg"}
                classes={"w-full !p-2"}
                roundness={"round-md"}
                nameField={"card"}
                register={register}
              />
            </div>
          </div>
        </div>
        <footer className=" p-4 w-full  bg-white flex justify-end items-center gap-4">
          <Button
            intent={"secondary"}
            children={"Update"}
            size={"lg"}
            roundness={"round"}
            classes={"!bg-black !text-white"}
          />
          <Button
            intent={"secondary"}
            children={"Cancel"}
            size={"lg"}
            roundness={"round"}
            classes={"!bg-black !text-white"}
          />
        </footer>
      </div>
    </section>
  );
};

export default ProfileEd;
