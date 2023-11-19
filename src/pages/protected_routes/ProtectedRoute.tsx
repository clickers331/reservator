import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseObjects";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [user] = useAuthState(auth);
  return (
    <>
      {!user && <Navigate to="/signin" />}
      <Outlet />
    </>
  );
}
