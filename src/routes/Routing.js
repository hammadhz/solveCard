import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { Home } from "../pages/Dashboard";
import { ForgotPwd, Login, Register } from "../pages/Auth";
import Test from "../pages/Test";
import NotFound from "../pages/NotFound";
import { Profile } from "../pages/profile";
import { Insights } from "../pages/Insights";
import { Contacts } from "../pages/Contact";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPwd />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/insight" element={<Insights />} />
          <Route path="/contacts" element={<Contacts />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
