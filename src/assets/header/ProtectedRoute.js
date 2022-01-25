import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  let auth, role = null;
  if (sessionStorage.getItem("user") !== null) {
    auth = JSON.parse(sessionStorage.getItem("user"));
    role = auth.user.role;
  }
  useEffect(() => {
      if(!auth || !(role === 'admin')) {
        alert("You are not admin!!!"); 
      }
  }, []);
  return (auth && role === 'admin') ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;