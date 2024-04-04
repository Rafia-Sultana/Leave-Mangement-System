import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { usersInfo } from "../utils/Dummy_Data.js";
import Button from "../components/Button.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { NavLink } from 'react-router-dom';
import Overview from "./Overview.jsx";
import "../assets/styles/Dashboard.css";
import NavProfile from "../components/NavProfile.jsx";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { UserContext } from "../context api/Context.jsx";
import employee from "../services/employee.jsx";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const Dashboard = () => {
  const [open, setOpen] = useState({});
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
const location = useLocation()
  const role = userInfoData.role;
  const userId = userInfoData.emp_id;

  const menuToggleClick = () => {
    let menuToggle = document.querySelector(".menu-toggle");
    var siteNav = document.querySelector(".site-nav");
    siteNav.classList.toggle("site-nav-open");
    menuToggle.classList.toggle("open");
  };

  const createNavLink = (to, text) => ({ to, text });
  const navLinks = {
    Employee: [
      createNavLink("leave-application", "Leave Application"),
      createNavLink("request-history", "Request History"),
      // createNavLink('employee-leave-history', 'My Leave History')
    ],
    "Team Lead": [
      {
        category: "Personal",
        links: [
          createNavLink("leave-application", "Leave Application"),
          createNavLink("manager_leave_history", "Leave Request"),
        ],
      },
      {
        category: "Team",
        links: [
          createNavLink("manager-leave-request", "Leave Request"),
          createNavLink("manager_team_leave_info", "Leave History"),
        ],
      },
    ],
    "HR": [
      {
        category: "Personal",
        links: [
          createNavLink("leave-application", "Leave Application"),
          createNavLink("hr_leave_history", "My Leave History"),
        ],
      },
      {
        category: "Others",
        links: [
          createNavLink("hr-leave-request", "Request History"),
          createNavLink("hr_others_leave_history", "Leave History"),
        ],
      },
    ],
  };

  const handleMoreIconClick = (index) => {
    setOpen({ [index]: !open[index] });
  };
const isNavActive = (to) =>{

return location.pathname === to;
}

  return (
    <div className="font-poppins">
      <header className="h-20 bg-blue-lighter flex items-center justify-between  relative">
        <div className="flex items-center">
          <div className="menu-toggle" onClick={menuToggleClick}>
            <div className="hamburger"></div>
          </div>
          <p className="text-3xl font-black" style={{fontFamily:'Biggy John'}}>LMS</p>
          {/* <p className="mt-2 text-sm"  style={{fontFamily:'Nova Flat'}}>Tiller</p> */}
          <p className="hidden lg:block text-2xl absolute left-96">
            Leave Management System
          </p>
        </div>
        <div className="flex items-center  gap-4 sm:gap:10 pr-5">
          <Badge color="primary" overlap="circular" variant="dot">
            <NotificationsOutlinedIcon fontSize="large" />
          </Badge>
          <NavProfile />
        </div>
      </header>

      <div className="flex">
        <nav className="h-[calc(100vh-80px)]  bg-blue-lighter text-white w-[60%] md:w-[30%] lg:w-[20%]  site-nav border border-t-white">
          <ul className="flex flex-col items-center  gap-8">
            <li className="mt-10 w-[80%]  xl:w-[60%] bg-blue-light rounded flex justify-center items-center py-1 ">
          
           
              <NavLink to={"/dashboard"}  style={{
                color: isNavActive("/dashboard") ? 'black' : 'white',
              }}>Dashboard</ NavLink >
            </li>

            {navLinks[role]?.map((section, index) => (
              <ul
                key={index}
                className=" w-[80%]  xl:w-[60%] bg-blue-light rounded flex justify-center items-center py-1 "
              >
                <li>
            
                  <NavLink className="" to={section?.to}>
                    {section?.text}
                  </NavLink>
                </li>
                <li className="">
                  <li className="">
                    {" "}
                    <p onClick={() => handleMoreIconClick(index)}>
                      {section.category}
                      {section.category && <ExpandMoreIcon />}
                    </p>
                  </li>
                  <li className="border-l">
                    {section.links?.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <NavLink
                          className={`ml-2 my-1  text-sm ${
                            open[index] ? "block" : "hidden"
                          }`}
                          to={link.to}
                          
                        >
                          {link.text}
                        </NavLink>
                      </li>
                    ))}
                  </li>
                </li>
              </ul>
            ))}
          </ul>
        </nav>

        <main className="w-full px-8 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { Dashboard };
