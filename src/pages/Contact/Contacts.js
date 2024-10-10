import React from "react";
import { ContactTbl, GroupConTbl } from "../../components/contact";

const Contacts = () => {
  return (
    <section className="min-h-screen bg-white p-4 sm:ml-64">
      <header className="flex justify-between items-center mb-8"></header>
      <ContactTbl />

      <GroupConTbl />
    </section>
  );
};

export default Contacts;
