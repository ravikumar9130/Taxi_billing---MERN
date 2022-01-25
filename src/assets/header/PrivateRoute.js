import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function PrivateRoute({ children }) {
  let auth, role = null;
  if (sessionStorage.getItem("user") !== null) {
    auth = JSON.parse(sessionStorage.getItem("user"));
    role = auth.user.role;
  }
  useEffect(() => {
    if (!auth || !(role === "user")) {
      alert("You are not authorized!!! Please login");
    }
  }, []);
  return auth && role === "user" ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
