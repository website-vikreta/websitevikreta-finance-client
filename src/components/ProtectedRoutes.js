import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoutes() {
  let auth = localStorage.getItem('user-info');
  return (
    auth ? <Outlet/> : <Navigate to='/' />
  );
}
