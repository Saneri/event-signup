import { Outlet } from "react-router-dom";

import { useAuthRedirect } from "./useAuthRedirect";

const ProtectedRoute = () => {
  useAuthRedirect();
  return <Outlet />;
};

export default ProtectedRoute;
