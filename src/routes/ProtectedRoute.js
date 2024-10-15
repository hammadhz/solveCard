import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const data = useSelector((state) => state?.auth);
  console.log(data, "token");
  return data?.token ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
