import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthUser from "./hooks/useAuthUser";

function ProtectedRoute() {
  const user = useAuthUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
