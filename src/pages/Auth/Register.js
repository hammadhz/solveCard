import React, { useState } from "react";
import logo from "../../assets/imgs/login.png";
import circle from "../../assets/imgs/circle.png";
import circleCut from "../../assets/imgs/circle-cut.png";
import rightIcon from "../../assets/svgs/right-arrow.svg";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { Label, Input, Button } from "../../components/form";

const Register = () => {
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
      <div className="bg-white p-10  z-10 rounded-2xl w-[694px] h-[438px]">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex flex-col gap-8">
              {/* steps */}
              <div className="flex items-center justify-center">
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div
                      className={`size-8 rounded-full flex justify-center items-center bg-primary font-inter font-sm font-normal ${
                        nextStep === 1 && "bg-black text-white"
                      }`}
                    >
                      1
                    </div>
                    <span
                      className={`font-inter font-light text-sm ${
                        nextStep === 1 && "!font-bold"
                      }`}
                    >
                      Get Started
                    </span>
                  </div>
                  <MdNavigateNext className="size-6" />
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div
                      className={`size-8 rounded-full flex justify-center items-center bg-primary font-inter font-sm font-normal ${
                        nextStep === 2 && "bg-black text-white"
                      }`}
                    >
                      2
                    </div>
                    <span
                      className={`font-inter font-light text-sm ${
                        nextStep === 2 && "!font-bold"
                      }`}
                    >
                      Company info
                    </span>
                  </div>
                  <MdNavigateNext className="size-6" />
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div
                      className={`size-8 rounded-full flex justify-center items-center bg-primary font-inter font-sm font-normal ${
                        nextStep === 3 && "bg-black text-white"
                      }`}
                    >
                      3
                    </div>
                    <span
                      className={`font-inter font-light text-sm ${
                        nextStep === 3 && "!font-bold"
                      }`}
                    >
                      Setup
                    </span>
                  </div>
                </div>{" "}
              </div>
              {/* TODO: google signup */}
              {/* google option
               <div className="w-full ">
                
                </div>            */}
              <form className="">
                <div className="flex gap-3 flex-col">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-black font-inter font-bold text-xl">
                      Register
                    </h1>
                    <span className="font-inter text-sm font-medium text-black">
                      Register your company on app
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label labelFor={"name"} content={"Full Name"} />
                    <Input
                      type={"text"}
                      placeholder={"Enter your name"}
                      roundness={"round-md"}
                      intent={"primary"}
                      size={"lg"}
                      name={"name"}
                      classes={"w-full gap-2"}
                      selector={"name"}
                    />
                  </div>
                  <Button
                    type={"button"}
                    children={"Continue"}
                    intent={"primary"}
                    size={"xlg"}
                    roundness={"round"}
                    iconRight={rightIcon}
                    classes={"gap-2 cursor-pointer"}
                    eventAction={handleNextStepReg}
                  />
                </div>
              </form>

              <p className="font-inter font-medium text-lg">
                Already use solveCard?{" "}
                <span className="font-inter font-bold text-lg text-tertiary-green-30">
                  <Link to={"/"}>Login</Link>
                </span>
              </p>
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

export default Register;
