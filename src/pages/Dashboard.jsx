import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { usersInfo } from "../utils/Dummy_Data.js";
import Button from "../components/Button.jsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tooltip } from "@mui/material";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import Overview from "./Overview.jsx";
import "../assets/styles/Dashboard.css";
import NavProfile from "../components/NavProfile.jsx";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { UserContext } from "../context api/Context.jsx";
import employee from "../services/employee.jsx";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import team from "../assets/styles/svg/team.svg";
import personal from "../assets/styles/svg/personal.svg";
import dashboard from "../assets/styles/svg/dashboard.svg";
import Avatar from '@mui/material/Avatar';

const Dashboard = () => {
  const [open, setOpen] = useState({});
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const location = useLocation();
  const navigate = useNavigate();
  const role = userInfoData.role;
  const userId = userInfoData.emp_id;
  const name = userInfoData.name;

  const menuToggleClick = () => {
    let menuToggle = document.querySelector(".menu-toggle");
    var siteNav = document.querySelector(".site-nav");
    siteNav.classList.toggle("site-nav-open");
    menuToggle.classList.toggle("open");
  };

  const createNavLink = (to, text,icon) => ({ to, text ,icon});
  const navLinks = {
    Employee: [
      createNavLink("leave-application", "Leave Application",personal),
      createNavLink("request-history", "Request History",team),
 
    ],
    "Team Lead": [
      {
        category: "Personal",
        links: [
          createNavLink("leave-application", "Leave Application"),
          createNavLink("manager_leave_history", "Leave Request"),
        ],
        icon: personal,
      },
      {
        category: "Team",
        links: [
          createNavLink("manager-leave-request", "Pending Request"),
          createNavLink("manager_team_leave_info", "Leave History"),
        ],
        icon: team,
      },
    ],
    HR: [
      {
        category: "Personal",
        links: [
          createNavLink("leave-application", "Leave Application"),
          createNavLink("hr_leave_history", "My Leave History"),
        ],
        icon: personal,
      },
      {
        category: "Others",
        links: [
          createNavLink("hr-leave-request", "Request History"),
          createNavLink("hr_others_leave_history", "Leave History"),
        ],
        icon: team,
      },
    ],
  };

  const handleMoreIconClick = (index) => {
    setOpen({ [index]: !open[index] });
  };
  const isNavActive = (to) => {
    // console.log(location.pathname === to);

    return location.pathname === to;
  };

  return (
    <div className="font-poppins">
      <header className="h-20 bg-[#DCF3FF] flex items-center justify-between fixed w-full z-10 lg:relative ">
        <div className="flex items-center">
          <div className="menu-toggle" onClick={menuToggleClick}>
            <div className="hamburger"></div>
          </div>
          <p
            className="text-3xl font-black"
            style={{ fontFamily: "Biggy John",cursor:'pointer' }}
            onClick={()=>navigate("/dashboard")}
          >
            LMS
          </p>
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
        <nav className="h-[calc(100vh-80px)]  bg-[#DCF3FF] text-black w-[60%] md:w-[30%] lg:w-[22%]
        
        site-nav  border-t-white  mt-20  lg:mt-0">
    
         
          <ul className="flex flex-col items-center  gap-8 ml-2 ">
            <li className="mt-10 w-[100%] xl:w-[80%] 
             bg-[#DCF3FF] rounded flex justify-start items-center gap-3 py-1 ">
              <img src={dashboard} alt="" className="w-6 h-6" />
              <NavLink
                to={"/dashboard"}
                style={{
                  color: isNavActive("/dashboard") ? "white" : "black",
                  backgroundColor: isNavActive("/dashboard")
                    ? "#7BD3FF"
                    : "transparent",
                    width:'60%',
                   padding:'2px'
                }}
              >
                Dashboard
              </NavLink>
            </li>

            {navLinks[role]?.map((section, index) => (
              <ul
                key={index}
                className="w-[100%] xl:w-[80%]  rounded  py-1 "
              >
                <li className="flex gap-2 ">
                <img src={section?.icon} alt="" className="w-6 h-6" />
                  <NavLink className={`px-${section?.category?0:2}`}  to={section?.to}>
                       {section?.text}
                  </NavLink>
                  <li className="font-bold "> {section.category}</li>
                </li>
                <li className="ml-12">
               {section.links?.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <NavLink
                          className={`my-2 px-2 py-1 text-[0.80rem]  lg:text-sm
                          `}
                          to={link.to}
                        >
                          {link.text}
                        </NavLink>
                      </li>
                    ))}
                </li>
              </ul>
            ))}
          </ul>
        </nav>

        <main className="w-full px-8 bg-white  pt-20 lg:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export { Dashboard };