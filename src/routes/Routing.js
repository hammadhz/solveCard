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
        <Route
          path="/"
          element={
            <Suspense fallback={<PageFallback />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPwd />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/insight"
              element={
                <Suspense fallback={<PageFallback />}>
                  {" "}
                  <Insights />{" "}
                </Suspense>
              }
            />
            <Route
              path="/contacts"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Contacts />
                </Suspense>
              }
            />
            <Route
              path="/settings"
              element={
                <Suspense fallback={<PageFallback />}>
                  <Settings />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Routing;
