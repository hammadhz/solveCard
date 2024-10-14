import React from "react";
import { ContactTbl, GroupConTbl } from "../../components/contact";

const Contacts = () => {
  return (
    <section className="">
      <header className="flex justify-between items-center mb-8"></header>
      <ContactTbl />

      <GroupConTbl />
    </section>
  );
};

export default Contacts;
