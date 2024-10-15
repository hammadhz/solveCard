import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Test from "../pages/Test";
import ProtectedRoute from "./ProtectedRoute";
import { Login, Register, ForgotPwd } from "../pages/Auth";
import NotFound from "../pages/NotFound";
import { PageFallback } from "../components";
const Home = lazy(() => import("../pages/Dashboard/Home"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Insights = lazy(() => import("../pages/Insights/Insights"));
const Contacts = lazy(() => import("../pages/Contact/Contacts"));
const Settings = lazy(() => import("../pages/Settings/Settings"));

const Routing = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPwd />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/insight" element={<Insights />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
