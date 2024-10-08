import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/dashboard" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routing;
