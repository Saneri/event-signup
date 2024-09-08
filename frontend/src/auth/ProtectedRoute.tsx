import { useAuthRedirect } from "./useAuthRedirect";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  useAuthRedirect();
  return <Outlet />;
};

export default ProtectedRoute;
