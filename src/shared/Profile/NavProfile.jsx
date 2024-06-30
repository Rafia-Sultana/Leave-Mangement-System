import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import Avatars from "../../components/Avatars.jsx";
import employee from "../../services/employee.jsx";
import { setProfileImage } from "../../Redux/profileImageSlice.js";


const NavProfile = () => {
  // const { setProfileImg} = useContext(UserContext);
 
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  // const [profileDetails, setProfileDetails] = useState({});
  // const [error, setError] = useState(null);
  const [rotateIcon, setRotateIcon] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [profileImg, setProfileImg] = useState(null);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const empId = userInfoData?.emp_id;

  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userBasicData = await employee.basicInfo(empId);
        setUserData(userBasicData);
      
        // const newProfileImgUrl = `http://192.168.0.40:4040${userBasicData.profile_img}?timestamp=${Date.now()}`;
        // dispatch(setProfileImage(newProfileImgUrl));
   
      } catch (error) {
        console.log(error);
        // setError(error.message);
      }
    };
    if (empId) {
      fetchData();
    }
  }, [empId]);

 

  const handleLogout = async () => {
    let logOutData = await employee.logOut();
    let shortToken = logOutData.token;
    Cookies.set("shortToken", shortToken);
    navigate("/");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
  };
  const handleRightMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setRotateIcon(!rotateIcon);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setRotateIcon(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  return (
    <div className="">
      <div className="relative ">
        <div
          className=" bg-blue-light flex gap-5 bg-opacity-20 p-2 rounded-xl sm:rounded"
          onClick={handleRightMenu}
          ref={menuRef}
        >
          <div className="avatar">
            <div className="rounded-xl sm:rounded">
              <Avatars width={"40px"}/>
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
            <></>
          )}


    <div className="hidden sm:block">
    <ExpandMoreIcon
            className={`   ${
              rotateIcon
                ? " rotate-180"
                : "transition-all duration-1000 ease-linear"
            } `}
          />
    </div>
        
        </div>

        <div
          className={`absolute right-0 w-44 z-50 bg-white rounded-lg shadow-md ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="bg-blue-lighter text-sm font-thin rounded-lg p-2 flex flex-col gap-1 cursor-pointer text-black">
            <li
              className="flex items-center"
              onClick={() =>
                navigate(`/dashboard/view-add-emp/${empId}`)
              }
            >
              <PersonOutlineIcon sx={{ fontSize: 20 }} />
              <span className="ml-2">Profile</span>
            </li>
            <li
              className="flex items-center"
              onClick={() => navigate(`/dashboard/settings/${empId}`)}
            >
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
