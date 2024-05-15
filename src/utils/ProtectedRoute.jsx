import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let auth=localStorage.getItem("accessToken");

return <div>
  {auth?<Outlet/>:<Navigate to={'/'}/>}
</div>

};
export default ProtectedRoute;
