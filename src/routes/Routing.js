import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import { Login, Register } from "../pages/Auth";
import Test from "../pages/Test";
import NotFound from "../pages/NotFound";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/dashboard" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Routing;
