import React, { useState } from "react";
import logo from "../../assets/imgs/login.png";
import circle from "../../assets/imgs/circle.png";
import circleCut from "../../assets/imgs/circle-cut.png";
import { Label, Input, Button } from "../../components/form";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { forgotPwdSchema } from "../../utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const ForgotPwd = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [getEmail, setGetEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPwdSchema(isEmailSent)),
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
        toast.success(response?.data?.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  // };

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
        console.log(response);
        toast.success(response?.data?.message, {
          position: "bottom-right",
          autoClose: 50000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setIsEmailSent(true);
      }
    } catch (err) {
      reset();
      console.log(err);
      toast.error(err?.response?.data?.message, {
        position: "bottom-right",
        autoClose: 50000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  console.log(errors);

  return (
    <div className="bg-gradient-to-r from-tertiary-green-30 to-tertiary-green-50 h-screen  flex justify-center items-center relative">
      <div className=" absolute -top-32 left-0">
        <img src={circle} alt="" className="" />
      </div>
      <div className=" absolute -top-32 left-0">
        <img src={circleCut} alt="" className="" />
      </div>
      <div className="bg-white p-10  z-10 rounded-2xl w-[694px] min-h-[338px]">
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
                          maxLength={"4"}
                          register={register}
                        />
                        <span className="font-inter font-normal text-center text-red-600 text-sm">
                          {" "}
                          {errors && errors?.otp?.message}{" "}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label labelFor={"password"} content={"Password"} />
                        <Input
                          type={`${showPassword ? "text" : "password"}`}
                          placeholder={"Enter your Password"}
                          roundness={"round-md"}
                          intent={"primary"}
                          size={"lg"}
                          nameField={"password"}
                          classes={"w-full gap-2"}
                          selector={"password"}
                          parentDivH={"w-full"}
                          icon={showPassword ? FaEye : FaEyeSlash}
                          iconClass={"size-6"}
                          positionIcon={"absolute right-4 top-4"}
                          register={register}
                          iconAction={handleShowPassword}
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
                          type={`${
                            setShowConfirmPassword ? "text" : "password"
                          }`}
                          placeholder={"Confirm your Password"}
                          roundness={"round-md"}
                          intent={"primary"}
                          size={"lg"}
                          nameField={"password_confirmation"}
                          classes={"w-full gap-2"}
                          selector={"confirm-password"}
                          parentDivH={"w-full"}
                          icon={showConfirmPassword ? FaEye : FaEyeSlash}
                          iconClass={"size-6"}
                          positionIcon={"absolute right-4 top-4"}
                          register={register}
                          iconAction={handleShowConfirmPassword}
                        />
                        <span className="font-inter font-normal text-center text-red-600 text-sm">
                          {" "}
                          {errors &&
                            errors?.password_confirmation?.message}{" "}
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
                        {/* <Input
                        type={"email"}
                        placeholder={"Enter your email"}
                        roundness={"round-md"}
                        intent={"primary"}
                        size={"lg"}
                        name={"email"}
                        value={email}
                        classes={"w-full gap-2"}
                        selector={"name"}
                        custom={"custom"}
                        eventAction={handleEmail}
                      /> */}
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPwd;
