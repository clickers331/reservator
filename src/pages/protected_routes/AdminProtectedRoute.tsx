import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebaseObjects";
import { doc, getDoc } from "firebase/firestore";
import { Navigate, Outlet, defer } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

export default function AdminProtectedRoute() {
  const userData = useSelector((state: any) => state.user); //Change any
  console.log(userData.admin);
  return (
    <>
      {userData.admin ? null : <Navigate to="/" />}
      <Outlet />
    </>
  );
}
