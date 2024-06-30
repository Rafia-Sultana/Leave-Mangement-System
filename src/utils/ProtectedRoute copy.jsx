import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const [authenticated, setAuthenticated] = useState(
    () => !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      let userInfoData;
      let auth;

      try {
        // let userInfoString = localStorage.getItem("userInfo");
        // console.log(userInfoString);
        // userInfoData = userInfoString ? JSON.parse(userInfoString) : null;
        // console.log(userInfoData);
        auth = localStorage.getItem("accessToken");

        
      if (auth ) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      } catch (error) {
        console.error("Error parsing JSON data from localStorage:", error);
        // userInfoData = null;
        auth = null;
      }

    };

    window.addEventListener("storage", handleStorageChange);
    // return ()=>{
    //   window.removeEventListener("storage",handleStorageChange)
    // }
  }, []);

  return (
    <div>{authenticated === true ? <Outlet /> : <Navigate to={"/"} />}</div>
  );
};
export default ProtectedRoute;
