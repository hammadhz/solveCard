import React from "react";
import logo from "../../assets/imgs/login.png";
import Button from "../../components/form/Button";
import rightIcon from "../../assets/svgs/right-arrow.svg";

const ForgotPwd = () => {
  return (
    <div className="bg-gradient-to-r from-tertiary-green-30 to-tertiary-green-50 h-screen flex justify-center items-center">
      <div className="bg-white size-36 rounded-2xl w-[688px] h-[428px] shadow-2xl">
        <div className="flex py-20 px-10 gap-4">
          <div className="flex-1">
            <div className="flex gap-3 flex-col">
              <div className="flex flex-col gap-1">
                <h1 className="text-black font-inter font-bold text-xl">
                  Register
                </h1>
                <span className="font-inter text-sm font-medium text-black">
                  Register your company on app
                </span>
              </div>
              <input
                type="text"
                placeholder="your name"
                className="bg-primary rounded-md p-4 outline-none"
              />
              {/* <button className="bg-gradient-to-r from-accent to-tertiary rounded-3xl w-full flex justify-center items-center p-2 text-white font-inter">
                Continue
              </button> */}
              <Button
                type={"submit"}
                children={"Login"}
                intent={"primary"}
                size={"xlg"}
                roundness={"round"}
                icon={rightIcon}
              />
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
