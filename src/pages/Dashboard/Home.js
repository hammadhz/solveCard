import React, { useState, useEffect } from "react";
import Searchbar from "../../components/Searchbar";
import { Avatar } from "../../components";
import { ProfileCard, AddProfileCard } from "../../components/profile";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state?.auth);

  async function getProfile() {
    try {
      const response = await axiosInstance.get("/profiles", {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      if (response.status === 200) {
        setProfile(response.data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message, {
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
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="">
      <header className="flex justify-between items-center mb-8">
        <Searchbar />
        <Avatar />
      </header>
      <div className="mb-8">
        <h1 className="font-inter font-bold text-2xl">
            Welcome Back, {userData?.user?.name} 👋
        </h1>
      </div>
      <div className="grid gap-3 lg:grid-cols-3 grid-cols-1">
        {loading ? (
            <div className="bg-primary p-4 rounded-2xl relative flex flex-col justify-between animate-pulse">
              <div className="bg-tertiary-gray-700 rounded-t-2xl w-full h-32 shimmer"></div>
              <div className="size-20 rounded-full bg-primary flex justify-center items-center z-40 absolute top-24 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-20 bg-gray-300 rounded-full shimmer"/>
              </div>
              <div className="flex flex-col justify-center items-center gap-4 mt-12">
                <div className="w-32 h-4 bg-gray-300 rounded shimmer"/>
                <div className="w-24 h-4 bg-gray-300 rounded shimmer"/>
                <div className="flex gap-2 items-center">
                  <div className="w-28 h-10 bg-gray-300 rounded shimmer"/>
                  <div className="w-28 h-10 bg-gray-300 rounded shimmer"/>
                </div>
              </div>
            </div>
        ) : (
            <>
              {" "}
              {profile?.map((result) => {
                return <ProfileCard key={result?.id} {...result} />;
              })}{" "}
            </>
        )}
        <AddProfileCard/>
      </div>
      <ToastContainer/>
    </section>
  );
};

export default Home;
