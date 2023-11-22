import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { ReduxState } from "../../redux/rootReducer";

export default function AdminProtectedRoute() {
  const userData = useSelector((state: ReduxState) => state.users.self); //Change any
  return (
    <>
      {userData.admin ? null : <Navigate to="/" />}
      <Outlet />
    </>
  );
}
