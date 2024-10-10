import React from "react";
import Searchbar from "../../components/Searchbar";
import { Avatar } from "../../components";
import { ProfileCard, AddProfileCard } from "../../components/profile";

const Home = () => {
  return (
    <section className=" p-4 sm:ml-64 bg-white min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <Searchbar />
        <Avatar />
      </header>
      <div className="grid gap-4 grid-cols-3 ">
        <ProfileCard />
        <AddProfileCard />
      </div>
    </section>
  );
};

export default Home;
