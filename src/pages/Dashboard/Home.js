import React, { useState, useEffect } from "react";
import { ProfileCard, AddProfileCard } from "../../components/profile";
import axiosInstance from "../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardFallback from "../../components/Fallback/CardFallback";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfiles} from "../../context/slice/profilesSlice";

const Home = () => {
  const profiles = useSelector((state) => state.profiles.profiles);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
    setLoading(false);
  }, [dispatch]);

  const handleProfileAdded = () => {
    dispatch(fetchProfiles());
  };

  return (
    <section className="overflow-y-auto">
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
            {profiles?.map((result) => {
              return <ProfileCard {...result} key={result.id} />;
            })}{" "}
          </>
        )}
        <AddProfileCard onProfileAdded={handleProfileAdded} />
      </div>
      <ToastContainer />
    </section>
  );
};

export default Home;
