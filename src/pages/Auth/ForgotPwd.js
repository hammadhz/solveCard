import React, { useState } from "react";
import logo from "../../assets/imgs/login.png";
import circle from "../../assets/imgs/circle.png";
import circleCut from "../../assets/imgs/circle-cut.png";
import rightIcon from "../../assets/svgs/right-arrow.svg";
import { Label, Input, Button } from "../../components/form";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { forgotPwdSchema } from "../../utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPwd = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [getEmail, setGetEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPwdSchema),
  });

  const forgotPwdEmailSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/forgotPassword", data, {
        headers: {
          "Content-Type": "application/json",
          "Device-Id": "123456",
        },
      });
      if (response.status === 200) {
        setIsEmailSent(true);
        setGetEmail(data?.email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const forgotPwdSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(
        "/resetPassword",
        {
          email: getEmail,
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Device-Id": "123456",
          },
        }
      );
      if (response.status === 200) {
        setIsEmailSent(true);
      }
    } catch (err) {
      console.log(err);
    }
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
              <div className="">
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
                  {isEmailSent && (
                    <form
                      onSubmit={handleSubmit(forgotPwdSubmit)}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex flex-col gap-2">
                        <Label labelFor={"otp"} content={"OTP"} />
                        <Input
                          type={"text"}
                          placeholder={"Enter your otp"}
                          roundness={"round-md"}
                          intent={"primary"}
                          size={"lg"}
                          nameField={"otp"}
                          classes={"w-full gap-2"}
                          selector={"otp"}
                          register={register}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label labelFor={"password"} content={"Password"} />
                        <Input
                          type={"password"}
                          placeholder={"Enter your Password"}
                          roundness={"round-md"}
                          intent={"primary"}
                          size={"lg"}
                          nameField={"password"}
                          classes={"w-full gap-2"}
                          selector={"password"}
                          register={register}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label
                          labelFor={"confirm-password"}
                          content={"Confirm Password"}
                        />
                        <Input
                          type={"password"}
                          placeholder={"Confirm your Password"}
                          roundness={"round-md"}
                          intent={"primary"}
                          size={"lg"}
                          nameField={"password_confirmation"}
                          classes={"w-full gap-2"}
                          selector={"confirm-password"}
                          register={register}
                        />
                      </div>
                      <Button
                        type={"submit"}
                        children={"Submit"}
                        intent={"primary"}
                        size={"xlg"}
                        roundness={"round"}
                        classes={"gap-2 cursor-pointer"}
                      />
                    </form>
                  )}
                  {!isEmailSent && (
                    <form
                      onSubmit={handleSubmit(forgotPwdEmailSubmit)}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex flex-col gap-2">
                        <Label labelFor={"email"} content={"Email"} />
                        <Input
                          type={"email"}
                          placeholder={"Enter your email"}
                          roundness={"round-md"}
                          intent={"primary"}
                          size={"lg"}
                          nameField={"email"}
                          classes={"w-full gap-2"}
                          selector={"name"}
                          register={register}
                        />
                        <span className="font-inter font-normal text-center text-red-600 text-sm">
                          {" "}
                          {errors && errors?.email?.message}{" "}
                        </span>
                      </div>
                      <Button
                        type={"submit"}
                        children={"Submit"}
                        intent={"primary"}
                        size={"xlg"}
                        roundness={"round"}
                        classes={"gap-2 cursor-pointer"}
                      />
                    </form>
                  )}
                </div>
              </div>
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
