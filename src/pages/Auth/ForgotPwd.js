import React, { useState } from "react";
import logo from "../../assets/imgs/login.png";
import circle from "../../assets/imgs/circle.png";
import circleCut from "../../assets/imgs/circle-cut.png";
import rightIcon from "../../assets/svgs/right-arrow.svg";
import { Label, Input, Button } from "../../components/form";

const ForgotPwd = () => {
  const [nextStep, setNextStep] = useState(1);

  const handleNextStepReg = () => {
    setNextStep(nextStep + 1);
  };

  return (
    <div className="bg-gradient-to-r from-tertiary-green-30 to-tertiary-green-50 h-screen  flex justify-center items-center relative">
      <div className=" absolute -top-32 left-0">
        <img src={circle} alt="" className="" />
      </div>
      <div className=" absolute -top-32 left-0">
        <img src={circleCut} alt="" className="" />
      </div>
      <div className="bg-white p-10  z-10 rounded-2xl w-[694px] h-[338px]">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex flex-col gap-8">
              <form className="">
                <div className="flex gap-3 flex-col">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-black font-inter font-bold text-xl">
                      Reset your password
                    </h1>
                    <span className="font-inter text-sm font-medium text-black">
                      We all forget sometimes. Submit your email and we will
                      send you instructions to reset your password.
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label labelFor={"email"} content={"Email"} />
                    <Input
                      type={"email"}
                      placeholder={"Enter your email"}
                      roundness={"round-md"}
                      intent={"primary"}
                      size={"lg"}
                      name={"email"}
                      classes={"w-full gap-2"}
                      selector={"name"}
                    />
                  </div>
                  <Button
                    type={"button"}
                    children={"Submit"}
                    intent={"primary"}
                    size={"xlg"}
                    roundness={"round"}
                    classes={"gap-2 cursor-pointer"}
                    eventAction={handleNextStepReg}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="flex-1 w-full h-full">
            <img src={logo} className="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPwd;
