import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context api/Context";
import employee from "../services/employee.jsx";
import authJWT from "../services/auth.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NavProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userBasicData = await employee.basicInfo(userId);

        setUserData(userBasicData);
      } catch (error) {
        setError(error.message);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // await authJWT.logOut();
  const handleLogout = async () => {
    // console.log('object');
    let logOutData = await employee.logOut();
    let shortToken = logOutData.token;
    Cookies.set("accessToken", shortToken);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="avatar">
        <div className="w-14 rounded-full">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="avatar"
          />
        </div>
      </div>
      <div>
        {userData ? (
          <ul className="menu menu-horizontal">
            <li>
              <details>
                <summary className="font-semibold text-white bg-blue-light">
                  {userData.name} <br />{" "}
                  {userData.designations?.[0]?.designation}
                </summary>
                <ul className="relative z-50 bg-base-100 rounded-t-none">
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                  <li>
                    <a></a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default NavProfile;
