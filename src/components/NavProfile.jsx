import React, { useEffect, useRef, useState } from "react";
import employee from "../services/employee.jsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormateDate from "../utils/FormateDate.js";


const NavProfile = () => {
  const [userData, setUserData] = useState(null);
  const [profileDetails,setProfileDetails]= useState({});
  const [error, setError] = useState(null);
  const [rotateIcon, setRotateIcon] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;

  const navigate = useNavigate();
  const menuRef = useRef(null);
  
  function createData(emp_id, name, email,joining_date, role,primary_dept,primary_des,secondary_dept_1,
    secondary_des_1,secondary_dept_2,secondary_des_2) {
    
    return { emp_id, name, email,joining_date, role,primary_dept,primary_des,secondary_dept_1,
      secondary_des_1,secondary_dept_2,secondary_des_2};
  }
  const concatNames =(...names) =>{
    return names.filter(Boolean).join(" ");
  }
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

  useEffect(()=>{
   const fetchData  = async()=>{
    let allEmployee = await employee.getAllEmployee();

    let profileDetails = allEmployee.find(x=>x.emp_id === userId);
    console.log(profileDetails);
    const {
      emp_id,
      first_name,
      middle_name,
      last_name,
      email,
      joining_date,
      status,
      dept_des,role
    } = profileDetails;

    let name = concatNames(first_name ,middle_name, last_name);
    let primary_dept = dept_des?.primary?.dept_name;
    
    let primary_des = dept_des?.primary?.des_name;
    let secondary_dept_1 = dept_des?.secondary[0]?.dept_name;
    let secondary_des_1 = dept_des?.secondary[0]?.des_name;
    
    let secondary_dept_2 = dept_des?.secondary[1]?.dept_name;
    let secondary_des_2 = dept_des?.secondary[1]?.des_name;
 
    let infoObject = createData(emp_id, name,email,FormateDate(new Date(joining_date)), role,primary_dept,primary_des,secondary_dept_1,
    secondary_des_1,secondary_dept_2,secondary_des_2
    );
setProfileDetails({...infoObject})
   }
   fetchData();
  },[])

console.log(profileDetails);
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
    const handleClickOutSide = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setRotateIcon(false);
      }
      
    };

    document.addEventListener("mousedown", handleClickOutSide);
  }, []);

  useEffect(()=>{
    let accessToken=localStorage.getItem("accessToken");
  
    // console.log(accessToken);
  },[])

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
                src="https://png.pngtree.com/png-clipart/20211121/original/pngtree-funny-avatar-vector-icons-png-png-image_6948004.png"
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
{/*           //navigate(`/dashboard/view-add-emp/${empId}`,{state:empDetails}) */}
          <ul className="bg-blue-lighter text-sm font-thin rounded-lg p-2 flex flex-col gap-1 cursor-pointer">
            <li className="flex items-center"  onClick={()=>navigate(`/dashboard/view-add-emp/${userId}`,{state:profileDetails})}>
              <PersonOutlineIcon sx={{ fontSize: 20 }} />
              <span className="ml-2">Profile</span>
            </li>
            <li className="flex items-center"    onClick={()=>navigate(`/dashboard/settings/${userId}`)} >
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
