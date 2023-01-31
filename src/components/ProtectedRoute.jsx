import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("user-token");
  const { pathname } = useLocation();

  return token ? <Outlet /> : <Navigate to="/" replace state={pathname} />;
};

export default ProtectedRoute;
