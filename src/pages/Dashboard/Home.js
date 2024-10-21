import React, { useState, useEffect } from "react";
import { ProfileCard, AddProfileCard } from "../../components/profile";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardFallback from "../../components/Fallback/CardFallback";

const Home = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state?.auth);

  async function getProfile() {
    try {
      const response = await axiosInstance.get("/profiles");
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
      <div className="mb-8">
        <h1 className="font-inter font-bold text-2xl">
          Welcome Back, {userData?.user?.name} 👋
        </h1>
      </div>
      <div className="grid gap-3 lg:grid-cols-3 grid-cols-1">
        {loading ? (
          <CardFallback />
        ) : (
          <>
            {" "}
            {profile?.map((result) => {
              return <ProfileCard key={result?.id} {...result} />;
            })}{" "}
          </>
        )}
        <AddProfileCard />
      </div>
      <ToastContainer />
    </section>
  );
};

export default Home;
