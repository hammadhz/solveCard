import React, { useState } from "react";
import logo from "../../assets/imgs/login.png";
import circle from "../../assets/imgs/circle.png";
import circleCut from "../../assets/imgs/circle-cut.png";
import rightIcon from "../../assets/svgs/right-arrow.svg";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { Label, Input, Button } from "../../components/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/validations";
import useFetch from "../../hooks/useFetch";

const Register = () => {
  const [nextStep, setNextStep] = useState(0);

  const { data, loading, error, post } = useFetch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const handleNextStepReg = () => {
    // if (nextStep !== 2) handleSubmit(registerSubmit);
    // if (!errors?.fullName && !errors?.companyName) {
    //   setNextStep(nextStep + 1);
    // } else if (!errors?.email) {
    //   setNextStep(nextStep + 1);
    // }
    setNextStep(nextStep + 1);
  };

  const registerSubmit = async (data) => {
    console.log(data);
    const postData = await post("register", data);
    console.log(postData);
    console.log(error);
  };

  console.log(errors, "error");

  return (
    <div className="bg-gradient-to-r from-tertiary-green-30 to-tertiary-green-50 min-h-screen  flex justify-center items-center relative">
      <div className=" absolute -top-32 left-0">
        <img src={circle} alt="" className="" />
      </div>
      <div className=" absolute -top-32 left-0">
        <img src={circleCut} alt="" className="" />
      </div>
      <div className="bg-white p-10  z-10 rounded-2xl w-[694px] min-h-[438px]">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              {/* steps */}
              <div className="flex items-center justify-center">
                <div
                  className="flex items-start gap-2"
                  onClick={() => setNextStep(0)}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div
                      className={`size-8 rounded-full flex justify-center items-center font-inter font-sm font-normal bg-primary ${
                        nextStep === 0 && "!bg-black text-white"
                      }`}
                    >
                      1
                    </div>
                    <span
                      className={`font-inter font-light text-sm ${
                        nextStep === 0 && "!font-bold"
                      }`}
                    >
                      Get Started
                    </span>
                  </div>
                  <MdNavigateNext className="size-6" />
                </div>
                <div
                  className="flex items-start gap-2"
                  onClick={() => setNextStep(1)}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div
                      className={`size-8 rounded-full flex justify-center items-center bg-primary font-inter font-sm font-normal ${
                        nextStep === 1 && "!bg-black text-white"
                      }`}
                    >
                      2
                    </div>
                    <span
                      className={`font-inter font-light text-sm ${
                        nextStep === 1 && "!font-bold"
                      }`}
                    >
                      Company info
                    </span>
                  </div>
                  <MdNavigateNext className="size-6" />
                </div>
                <div
                  className="flex items-start gap-2"
                  onClick={() => setNextStep(2)}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div
                      className={`size-8 rounded-full flex justify-center items-center bg-primary font-inter font-sm font-normal ${
                        nextStep === 2 && "!bg-black text-white"
                      }`}
                    >
                      3
                    </div>
                    <span
                      className={`font-inter font-light text-sm ${
                        nextStep === 2 && "!font-bold"
                      }`}
                    >
                      Setup
                    </span>
                  </div>
                </div>{" "}
              </div>

              <form className="" onSubmit={handleSubmit(registerSubmit)}>
                <div className="flex gap-2 flex-col">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-black font-inter font-bold text-xl">
                      Register
                    </h1>
                    <span className="font-inter text-sm font-medium text-black">
                      Register your company on app
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {nextStep === 0 && (
                      <>
                        <div className="flex flex-col gap-2">
                          <Label labelFor={"name"} content={"Full Name"} />
                          <Input
                            type={"text"}
                            placeholder={"Enter your name"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="name"
                            classes={"w-full gap-2"}
                            selector={"name"}
                            register={register}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors && errors?.name?.message}{" "}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label labelFor={"phone"} content={"Phone"} />

                          <Input
                            type={"tel"}
                            placeholder={"Enter your phone"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="phone"
                            classes={"w-full gap-2"}
                            selector={"phone"}
                            register={register}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors && errors?.companyName?.message}{" "}
                          </span>
                        </div>

                        {/* <Button
                          type={"button"}
                          children={"Continue"}
                          intent={"primary"}
                          size={"xlg"}
                          roundness={"round"}
                          iconRight={rightIcon}
                          classes={"gap-2 cursor-pointer"}
                          eventAction={handleNextStepReg}
                        /> */}
                      </>
                    )}
                    {nextStep === 1 && (
                      <>
                        <div className="flex flex-col gap-2">
                          <Label
                            labelFor={"company-name"}
                            content={"Company Name"}
                          />

                          <Input
                            type={"text"}
                            placeholder={"Enter your company name"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="companyName"
                            classes={"w-full gap-2"}
                            selector={"company-name"}
                            register={register}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors && errors?.companyName?.message}{" "}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label labelFor={"role"} content={"Role"} />

                          <Input
                            type={"text"}
                            placeholder={"Enter your role"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="role"
                            classes={"w-full gap-2"}
                            selector={"role"}
                            register={register}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors && errors?.role?.message}{" "}
                          </span>
                        </div>

                        {/* <Button
                          type={"button"}
                          children={"Continue"}
                          intent={"primary"}
                          size={"xlg"}
                          roundness={"round"}
                          iconRight={rightIcon}
                          classes={"gap-2 cursor-pointer"}
                          eventAction={handleNextStepReg}
                        /> */}
                      </>
                    )}{" "}
                    {nextStep === 2 && (
                      <>
                        <div className="flex flex-col gap-2">
                          <Label labelFor={"email"} content={"Email"} />

                          <Input
                            type={"email"}
                            placeholder={"Enter your email"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="email"
                            classes={"w-full gap-2"}
                            selector={"email"}
                            register={register}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors && errors?.email?.message}{" "}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label labelFor={"password"} content={"Password"} />

                          <Input
                            type={"password"}
                            placeholder={"Enter your password"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="password"
                            classes={"w-full gap-2"}
                            selector={"password"}
                            register={register}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors && errors?.password?.message}{" "}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label
                            labelFor={"confirm-password"}
                            content={"Confirm Password"}
                          />

                          <Input
                            type={"password"}
                            placeholder={"Confirm your password"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="password_confirmation"
                            classes={"w-full gap-2"}
                            selector={"confirm-password"}
                            register={register}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors &&
                              errors?.password_confirmation?.message}{" "}
                          </span>
                        </div>
                      </>
                    )}
                    {nextStep === 2 && (
                      <Button
                        type="submit"
                        children={"Continue"}
                        intent={"primary"}
                        size={"xlg"}
                        roundness={"round"}
                        iconRight={rightIcon}
                        classes={"gap-2 cursor-pointer"}
                      />
                    )}
                    {(nextStep === 0 || nextStep === 1) && (
                      <Button
                        type="button"
                        children={"Continue"}
                        intent={"primary"}
                        size={"xlg"}
                        roundness={"round"}
                        iconRight={rightIcon}
                        classes={"gap-2 cursor-pointer"}
                        eventAction={handleNextStepReg}
                      />
                    )}
                  </div>
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
