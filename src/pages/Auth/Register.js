import React, { useState, useEffect } from "react";
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
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { registerUser } from "../../context/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Register = () => {
  const [nextStep, setNextStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    companyName: "",
    role: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [nextStep]);

  const stepSchema = registerSchema.pick({
    name: nextStep === 0,
    phone: nextStep === 0,
    companyName: nextStep === 1,
    role: nextStep === 1,
    email: nextStep === 2,
    password: nextStep === 2,
    password_confirmation: nextStep === 2,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepSchema),
  });

  const registerSubmit = async (data) => {
    await stepSchema.parseAsync(data);
    if (nextStep === 0) {
      if (data?.name && data?.phone) {
        setNextStep(nextStep + 1);
        setForm((prev) => ({
          ...prev,
          name: data.name,
          phone: data.phone,
        }));
      }
    } else if (nextStep === 1) {
      if (data?.companyName && data?.role) {
        setNextStep(nextStep + 1);
        setForm((prev) => ({
          ...prev,
          companyName: data.companyName,
          role: data.role,
        }));
      }
    } else {
      // if (data?.email && data?.passowrd && data?.password_confirmation) {
      try {
        const body = {
          name: form.name,
          phone: form.phone,
          companyName: form.companyName,
          role: form.role,
          email: data?.email,
          password: data?.password,
          password_confirmation: data?.password_confirmation,
        };
        setLoading(true);
        const response = await axiosInstance.post("/register", body);
        if (response.status === 200) {
          dispatch(registerUser(response?.data));
          Cookies.set("token", response.data.token);
          navigate("/dashboard");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message, {
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
      // }
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-gradient-to-r from-tertiary-green-30 to-tertiary-green-50 min-h-screen  flex justify-center items-center relative">
      <div className=" absolute -top-32 left-0">
        <img src={circle} alt="" className="" />
      </div>
      <div className=" absolute -top-32 left-0">
        <img src={circleCut} alt="" className="" />
      </div>
      <div className="bg-white p-8 lg:p-10  z-10 rounded-2xl my-10 lg:my-0 min-w-[200px] md:min-w-[400px] lg:w-[694px] min-h-[438px]">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex flex-col gap-1 mb-8">
              <h1 className="text-black font-inter font-bold text-xl">
                Register
              </h1>
              <span className="font-inter text-sm font-medium text-black">
                Register your company on app
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {/* steps */}
              <div className="w-full grid grid-cols-5">
                <div
                  className="cursor-pointer w-full col-span-2 text-start gap-2"
                  onClick={() => setNextStep(0)}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-full flex items-center justify-center gap-4">
                      <div
                        className={`size-8 rounded-full flex justify-center items-center font-inter font-sm font-normal bg-primary ${
                          nextStep === 0 && "!bg-black text-white"
                        }`}
                      >
                        1
                      </div>
                      <MdNavigateNext className="size-6" />
                    </div>
                    <span
                      className={`font-inter font-light text-sm ${
                        nextStep === 0 && "!font-bold"
                      }`}
                    >
                      Get Started
                    </span>
                  </div>
                </div>
                <div
                  className="cursor-pointer w-full col-span-2 text-start gap-2"
                  onClick={() => setNextStep(1)}
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-full flex items-center justify-center gap-4">
                      <div
                        className={`size-8 rounded-full flex justify-center items-center bg-primary font-inter font-sm font-normal ${
                          nextStep === 1 && "!bg-black text-white"
                        }`}
                      >
                        2
                      </div>
                      <MdNavigateNext className="size-6" />
                    </div>
                    <span
                      className={`font-inter font-light text-sm ${
                        nextStep === 1 && "!font-bold"
                      }`}
                    >
                      Company info
                    </span>
                  </div>
                </div>
                <div
                  className="cursor-pointer w-full text-start gap-2"
                  onClick={() => setNextStep(2)}
                >
                  <div className="flex flex-col items-start justify-center ps-3 gap-3">
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

              <form onSubmit={handleSubmit(registerSubmit)}>
                <div className="flex gap-2 flex-col">
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
                            maxLength={"11"}
                            minLength={"10"}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors && errors?.phone?.message}{" "}
                          </span>
                        </div>
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
                            type={`${showPassword ? "text" : "password"}`}
                            placeholder={"Enter your password"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="password"
                            classes={"w-full gap-2"}
                            selector={"password"}
                            parentDivH={"w-full"}
                            icon={showPassword ? FaEye : FaEyeSlash}
                            iconClass={"size-6"}
                            positionIcon={"absolute right-4 top-3"}
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
                            placeholder={"Confirm your password"}
                            roundness={"round-md"}
                            intent={"primary"}
                            size={"lg"}
                            nameField="password_confirmation"
                            classes={"w-full gap-2"}
                            selector={"confirm-password"}
                            parentDivH={"w-full"}
                            icon={showConfirmPassword ? FaEye : FaEyeSlash}
                            iconClass={"size-6"}
                            positionIcon={"absolute right-4 top-3"}
                            register={register}
                            iconAction={handleShowConfirmPassword}
                          />
                          <span className="font-inter font-normal text-center text-red-600 text-sm">
                            {" "}
                            {errors &&
                              errors?.password_confirmation?.message}{" "}
                          </span>
                        </div>
                      </>
                    )}
                    <Button
                      type="submit"
                      children={"Continue"}
                      intent={"primary"}
                      size={"xlg"}
                      roundness={"round"}
                      iconRight={rightIcon}
                      classes={"gap-2 cursor-pointer"}
                      loading={loading}
                    />
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
          <div className="flex-1 w-full h-full hidden lg:block">
            <img src={logo} className="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
