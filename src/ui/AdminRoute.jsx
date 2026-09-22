import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

function AdminRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  const role = user?.user_metadata?.role;

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;