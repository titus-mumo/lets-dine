import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { ToastMessage } from "../utils";
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) {
    ToastMessage("warning", "Please login first")
    return <Navigate to="/login" />
};
  return (
    <div>
  <Outlet />
  </div>
);
};

export default PrivateRoute;

