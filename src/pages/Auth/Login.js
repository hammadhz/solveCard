import React from "react";
import logo from "../../assets/imgs/login.png";
import { Button, Label, Input } from "../../components/form";
import rightIcon from "../../assets/svgs/right-arrow.svg";
import hidePwd from "../../assets/svgs/hide-pwd.svg";
import circle from "../../assets/imgs/circle.png";
import circleCut from "../../assets/imgs/circle-cut.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
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
              <form className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <Label labelFor={"email"} content={"Email"} />
                  <Input
                    type={"email"}
                    placeholder={"Enter your email"}
                    roundness={"round-md"}
                    intent={"primary"}
                    size={"lg"}
                    name={"email"}
                    classes={"w-full"}
                    selector={"email"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label labelFor={"password"} content={"Password"} />
                  <Input
                    type={"password"}
                    placeholder={"Enter your password"}
                    roundness={"round-md"}
                    intent={"primary"}
                    size={"lg"}
                    name={"password"}
                    classes={"w-full"}
                    icon={hidePwd}
                    parentDivH={"w-full"}
                    positionIcon={"absolute right-4 top-4"}
                    selector={"password"}
                  />
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
      </div>
    </div>
  );
};

export default Login;
