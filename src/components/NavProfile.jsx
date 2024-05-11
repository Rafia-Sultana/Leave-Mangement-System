import React, { useEffect, useRef, useState } from "react";
import employee from "../services/employee.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const NavProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [rotateIcon, setRotateIcon] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;
  const navigate = useNavigate();
  const menuRef = useRef(null);

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

  const handleLogout = async () => {
    let logOutData = await employee.logOut();
    let shortToken = logOutData.token;
    Cookies.set("shortToken", shortToken);
    navigate("/");
    localStorage.removeItem("userInfo");
  };

  const handleRightMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setRotateIcon(!rotateIcon);
  };

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setRotateIcon(false);
      }
      
    };

    document.addEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <div className="">
      <div className="relative ">
        <div
          className="  bg-blue-light flex gap-5 bg-opacity-20 p-2 rounded-xl sm:rounded"
          onClick={handleRightMenu}
        >
          <div className="avatar">
            <div className="w-10  rounded-xl sm:rounded">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="avatar"
              />
            </div>
          </div>
          {userData ? (
            <div className="hidden sm:block">
              <p className="font-semibold text-sm text-[#303030]">
                {userData.name}
              </p>
              <p className="font-thin text-xs text-[#6D6D6D]">
                {userData.designations?.[0]?.designation}
              </p>
            </div>
          ) : (
            <div className="loading"></div>
          )}

          <ExpandMoreIcon
            className={`${
              rotateIcon
                ? " rotate-180"
                : "transition-all duration-1000 ease-linear"
            } hidden sm:block`}
          />
        </div>

        <div
          ref={menuRef}
          className={`absolute right-0 w-44 z-50 bg-white rounded-lg shadow-md ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="bg-blue-lighter text-sm font-thin rounded-lg p-2 flex flex-col gap-1 cursor-pointer">
            <li className="flex items-center">
              <PersonOutlineIcon sx={{ fontSize: 20 }} />
              <span className="ml-2">Profile</span>
            </li>
            <li className="flex items-center">
              <SettingsOutlinedIcon sx={{ fontSize: 20 }} />
              <span className="ml-2">Settings</span>
            </li>
            <li className="flex items-center" onClick={() => handleLogout()}>
              <LogoutOutlinedIcon sx={{ fontSize: 20 }} />
              <span className="ml-2">Logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavProfile;
