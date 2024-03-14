import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
 import { usersInfo } from "../utils/Dummy_Data.js";
import Button from "../components/Button.jsx";

import { Tooltip } from "@mui/material";
import { Box } from "@mui/material";

import Overview from "./Overview.jsx";
import '../assets/styles/Dashboard.css'
import NavProfile from "../components/NavProfile.jsx";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { UserContext } from "../context api/Context.jsx";
import employee from "../services/employee.jsx";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';


const Dashboard = () => {
// const {userInfo}=useContext(UserContext);
// console.log(userInfo);
const userInfoData =  JSON.parse(localStorage.getItem('userInfo'));
// console.log('userInfoData',userInfoData);

//   const emailData = JSON.parse(localStorage.getItem("email"));
//  const role = usersInfo.filter((user) => user.email === emailData)[0].role;
  const role = userInfoData.role;
  const userId = userInfoData.emp_id;




  const menuToggleClick =() =>{
let menuToggle = document.querySelector('.menu-toggle');
var siteNav = document.querySelector('.site-nav');
siteNav.classList.toggle('site-nav-open');
menuToggle.classList.toggle('open');
}
 

const createNavLink = (to,text) =>({to,text});
const navLinks = {
  employee: [
    createNavLink('leave-application', 'Leave Application'),
    createNavLink('request-history', 'Request History'),
    // createNavLink('employee-leave-history', 'My Leave History')
  ],
  manager: [
    { category: 'Personal', links: [createNavLink('leave-application', 'Leave Application'), createNavLink('manager_leave_history', 'My Leave History')] },
    { category: 'Team', links: [createNavLink('manager-leave-request', 'Leave Request'), createNavLink('manager_team_leave_info', 'Leave History')] }
  ],
  hr: [
    { category: 'Personal', links: [createNavLink('leave-application', 'Leave Application'), createNavLink('hr_leave_history', 'My Leave History')] },
    { category: 'Others', links: [createNavLink('hr-leave-request', 'Request History'), createNavLink('', 'Leave History')] }
  ]
};






  return (
    <div className="font-poppins">


      <header className="h-20 bg-blue-lighter flex items-center justify-between  relative">
    

    <div className="flex items-center">
    <div className="menu-toggle" onClick={menuToggleClick}>
          <div className="hamburger"></div>
        </div>
        <p className="text-2xl">LMS</p>
        <p className="hidden lg:block text-2xl absolute left-96">Leave Management System</p>
 
       
    </div>
        <div className="flex items-center  gap-4 sm:gap:10 pr-5">
        <Badge color="primary" overlap="circular" variant="dot">
        <NotificationsOutlinedIcon  fontSize="large"/>
        </Badge>
        <NavProfile/>
        </div>
  </header>


      <div className="flex">
  <nav className="h-[calc(100vh-80px)]  bg-blue-lighter text-white w-[60%] md:w-[30%] lg:w-[20%]  site-nav border border-t-white">
    <ul className="flex flex-col justify-center items-center  gap-8">
      <Link className="mt-10 w-[80%]  xl:w-[60%] bg-blue-light rounded flex justify-center items-center py-1"  to={'/dashboard'}>Dashboard</Link>
  
{
  navLinks[role]?.map((section,index)=>(
    <li key={index} className=" w-[80%]  xl:w-[60%] bg-blue-light rounded flex justify-center items-center py-1 " >
     
      <Link className="  hover:text-gray" to={section?.to}  >{section.category || section?.text}    </Link>
      <ul>
      {section.links?.map((link, linkIndex) => (
                    <li key={linkIndex} className="mb-1" >
                      <Link className=" hover:text-gray ml-4 " to={link.to}>
                        {link.text }
                      </Link>
                    </li>
                  ))}
      </ul>
    </li>
  ))
}
    </ul>
  </nav>

  <main className="w-full px-8">
    <Outlet />
  </main>
</div>

    </div>
  );
};

export { Dashboard };
