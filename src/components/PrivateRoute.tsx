import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
  const { authToken, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
