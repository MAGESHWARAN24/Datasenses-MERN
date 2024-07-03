import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
export default function Middleware({children}) {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem("auth_Jwt");
    const path = location.pathname.toString().includes("auth");
    if (!token && !path) {
      navigate("/auth/login");
    }
  }, [location]);
  return <>{children}</>;
}
