import React from "react";
import { Label, Input, Button } from "../../components/form";
import { useForm } from "react-hook-form";

const Settings = () => {
  const { register } = useForm();

  return (
    <section className="">
      <div className="mb-12"></div>

      <div className="bg-primary w-full min-h-96 rounded-2xl p-6 overflow-y-auto">
        <div className="">
          <h1 className="font-inter font-semibold text-xl text-black mb-6">
            Account Settings
          </h1>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-3">
              <Label labelFor={"profile-url"} content={"Profile URL"} />
              <Input
                intent={"primary"}
                type={"text"}
                size={"md"}
                roundness={"round-sm"}
                classes={"bg-white w-full"}
                nameField={"profile"}
                register={register}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label labelFor={"email"} content={"Email"} />
              <Input
                intent={"primary"}
                type={"email"}
                size={"md"}
                roundness={"round-sm"}
                classes={"bg-white w-full"}
                nameField={"email"}
                register={register}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label labelFor={"custom-domain"} content={"Custom Domain"} />
              <Input
                intent={"primary"}
                type={"text"}
                size={"md"}
                roundness={"round-sm"}
                classes={"bg-white w-full"}
                nameField={"customDomain"}
                register={register}
              />
            </div>

            <div className="flex gap-3 items-center justify-end">
              <Button
                type={"button"}
                children={"Cancel"}
                roundness={"round"}
                size={"md"}
                intent={"primary"}
              />
              <Button
                type={"button"}
                children={"Save"}
                roundness={"round"}
                size={"md"}
                intent={"primary"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
