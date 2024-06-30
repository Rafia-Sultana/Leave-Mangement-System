import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [authenticated, setAuthenticated] = useState(
    () => !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      try {
     

        let  auth = localStorage.getItem("accessToken");

        if (auth) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error parsing JSON data from localStorage:", error);
       
        auth = null; 
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>{authenticated === true ? <Outlet /> : <Navigate to={"/"} />}</div>
  );
};
export default ProtectedRoute;
