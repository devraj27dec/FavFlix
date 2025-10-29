import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  children?: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const exp = decoded.exp * 1000;
      setIsAuthenticated(Date.now() < exp);
    } catch (e) {
      console.error("Token decode failed:", e);
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <>{children || <Outlet />}</>;
}
