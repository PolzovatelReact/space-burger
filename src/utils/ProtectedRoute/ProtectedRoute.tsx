import React from "react";

import { Outlet, Navigate } from "react-router-dom";

interface PrivateRoutesProps {
  isAuthenticated: boolean;
  redirectTo?: string;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  isAuthenticated,
  redirectTo = "/login",
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};
export default PrivateRoutes;
