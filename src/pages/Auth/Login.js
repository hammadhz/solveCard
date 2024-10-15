import React, { useState } from "react";
import logo from "../../assets/imgs/login.png";
import { Button, Label, Input } from "../../components/form";
import rightIcon from "../../assets/svgs/right-arrow.svg";
import circle from "../../assets/imgs/circle.png";
import circleCut from "../../assets/imgs/circle-cut.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validations";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../context/slice/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/login", data, {
        headers: {
          "Content-Type": "application/json",
          "Device-Id": "123456",
        },
      });
      console.log(response);

      toast.error(response?.data?.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (response.status === 200) {
        dispatch(loginUser(response?.data));
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data.message, {
      //   position: "bottom-right",
      //   autoClose: 5000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gradient-to-r from-tertiary-green-30 to-tertiary-green-50 h-screen flex justify-center items-center relative">
      <div className=" absolute -top-32 left-0">
        <img src={circle} alt="" className="" />
      </div>
      <div className="w-full h-full absolute -top-32 left-0">
        <img src={circleCut} alt="" className="" />
      </div>
      <div className="bg-white z-10 p-10 rounded-2xl w-[688px] min-h-[438px] shadow-2xl">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="flex gap-3 flex-col">
              <div className="flex flex-col gap-1">
                <h1 className="text-black font-inter font-bold text-xl">
                  Login
                </h1>
                <span className="font-inter text-sm font-medium text-black">
                  Login your company on app
                </span>
              </div>
              <div className="w-full rounded-lg flex justify-center gap-3 items-center bg-primary p-2">
                <FcGoogle className="size-5" />{" "}
                <p className="font-inter font-normal text-sm text-black">
                  Continue with Google
                </p>
              </div>
              <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(loginSubmit)}
              >
                <div className="flex flex-col gap-2">
                  <Label labelFor={"email"} content={"Email"} />
                  <Input
                    type={"email"}
                    placeholder={"Enter your email"}
                    roundness={"round-md"}
                    intent={"primary"}
                    size={"lg"}
                    classes={"w-full"}
                    selector={"email"}
                    nameField={"email"}
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
                    name={"password"}
                    classes={"w-full"}
                    icon={showPassword ? FaEye : FaEyeSlash}
                    iconClass={"size-6"}
                    parentDivH={"w-full"}
                    positionIcon={"absolute right-4 top-4"}
                    selector={"password"}
                    nameField={"password"}
                    register={register}
                    iconAction={handleShowPass}
                  />
                  <span className="font-inter font-normal text-center text-red-600 text-sm">
                    {" "}
                    {errors && errors?.password?.message}{" "}
                  </span>
                  <span className="font-inter font-normal text-sm text-black text-end">
                    <Link to={"/forgot-password"}>Forgot Password ?</Link>
                  </span>
                </div>
                <Button
                  type={"submit"}
                  children={"Login"}
                  intent={"primary"}
                  size={"xlg"}
                  roundness={"round"}
                  iconRight={rightIcon}
                  classes={"gap-2"}
                />
              </form>
              <p className="font-inter font-medium text-lg">
                New to solveCard?{" "}
                <span className="font-inter font-bold text-lg text-tertiary-green-30">
                  <Link to={"/register"}>Register</Link>
                </span>
              </p>
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

export default Login;
