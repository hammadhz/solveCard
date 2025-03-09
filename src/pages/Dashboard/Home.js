import React, { useState, useEffect } from "react";
import { ProfileCard, AddProfileCard } from "../../components/profile";
import "react-toastify/dist/ReactToastify.css";
import CardFallback from "../../components/Fallback/CardFallback";
import {useDispatch, useSelector} from "react-redux";
import {fetchProfiles} from "../../context/slice/profilesSlice";

const Home = () => {
  const profiles = useSelector((state) => state.profiles.profiles);
  const status = useSelector((state) => state.profiles.status);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
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
        {status === "loading" ? (
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
    </section>
  );
};

export default Home;
