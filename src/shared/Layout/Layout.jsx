import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Badge from "@mui/material/Badge";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import team from "../../assets/styles/svg/team.svg";
import personal from "../../assets/styles/svg/personal.svg";
import dashboard from "../../assets/styles/svg/dashboard.svg";
import managment from "../../assets/styles/svg/managment.svg";

import NavProfile from "../Profile/NavProfile.jsx";
import "../../assets/styles/Dashboard.css";

const Layout = () => {
  const [open, setOpen] = useState({});
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));

  const location = useLocation();
  const navigate = useNavigate();
  const role = userInfoData.role;

  const menuToggleClick = () => {
    let menuToggle = document.querySelector(".menu-toggle");
    var siteNav = document.querySelector(".site-nav");
    siteNav.classList.toggle("site-nav-open");
    menuToggle.classList.toggle("open");
  };
console.log("parent");
  const createNavLink = (to, text, icon) => ({ to, text, icon });
  const navLinks = {
    Employee: [
      createNavLink("leave-application", "Leave Application", personal),
      createNavLink("request-history", "Request History", team),
    ],

    "Team Lead": [
      {
        category: "Personal",
        links: [
          createNavLink("leave-application", "Leave Application"),
          createNavLink("request-history", "Leave Request"),
        ],
        icon: personal,
      },
      {
        category: "Team",
        links: [
          createNavLink("manager-leave-request", "Pending Request"),
          createNavLink("manager-team-leave-info", "Leave History"),
        ],
        icon: team,
      },
    ],
    HR: [
      {
        category: "Personal",
        links: [
          createNavLink("leave-application", "Leave Application"),
          createNavLink("request-history", "My Leave History"),
        ],
        icon: personal,
      },
      {
        category: "Others",
        links: [
          createNavLink("hr-leave-request", "Pending Request "),
          createNavLink("hr-others-leave-history", "Leave History"),
        ],
        icon: team,
      },
      {
        category: "Managment",
        links: [
          createNavLink("manage-employee", "Employee"),
          createNavLink("hr-add-holiday", "Holiday"),
          createNavLink("hr-add-accordion-form", "Others"),
        ],
        icon: managment,
      },
    ],
    Admin: [
      {
        category: "Personal",
        links: [
          createNavLink("leave-application", "Leave Application"),
          createNavLink("request-history", "My Leave History"),
        ],
        icon: personal,
      },
      {
        category: "Others",
        links: [
          createNavLink("admin-pending-request", "Pending Request "),
          createNavLink("admin-others-leave-history", "Leave History"),
         
        ],
        icon: team,
      },
  
    ],
  };

  const handleMoreIconClick = (index) => {
    setOpen({ [index]: !open[index] });
  };
  const isNavActive = (to) => {
    return location.pathname === to;
  };

  return (
    <div className="font-poppins">
      <header className="h-20 bg-[#DCF3FF] flex items-center justify-between fixed w-full z-10  ">
        <div className="flex items-center">
          <div className="menu-toggle" onClick={menuToggleClick}>
            <div className="hamburger"></div>
          </div>
          <p
            className="text-3xl font-black"
            style={{ fontFamily: "Biggy John", cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            LMS
          </p>

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
        <nav
          className="h-[100vh]  bg-[#DCF3FF] text-black 
          w-[60%] md:w-[30%] lg:w-[22%] xl:w-[18%]
  site-nav  border-t-white  mt-20 lg:mt-0 fixed"
        >
          <ul className="flex flex-col items-center  gap-8 ml-2 ">
            <li
              className=" mt-10 lg:mt-32 w-[100%] xl:w-[80%] 
             bg-[#DCF3FF] rounded flex justify-start items-center gap-3 py-1 "
            >
              <img src={dashboard} alt="" className="w-6 h-6" />
              <NavLink
                to={"/dashboard"}
                style={{
                  color: isNavActive("/dashboard") ? "white" : "black",
                  // fontWeight:"bold",
                  backgroundColor: isNavActive("/dashboard")
                    ? "#7BD3FF"
                    : "transparent",
                  width: "60%",
                  padding: "2px",
                }}
              >
                Dashboard
              </NavLink>
            </li>

            {navLinks[role]?.map((section, index) => (
              <ul key={index} className="w-[100%] xl:w-[80%]  rounded  py-1 ">
                <li className="flex gap-2 ">
                  <img src={section?.icon} alt="" className="w-6 h-6" />
                  <div className="">
                    {section?.category ? (
                      <span className="font-bold ">{section.category}</span>
                    ) : (
                      <NavLink
                        className={`px-${section?.category ? 0 : 2}`}
                        to={section?.to}
                      >
                        {section?.text}
                      </NavLink>
                    )}
                  </div>
                </li>
                <li className="ml-12">
                  {section.links?.map((link, linkIndex) => (
                    <div key={linkIndex}>
                      <NavLink
                        className={`my-2 px-2 py-1 text-[0.80rem]  lg:text-sm
                          `}
                        to={link.to}
                      >
                        {link.text}
                      </NavLink>
                    </div>
                  ))}
                </li>
              </ul>
            ))}
          </ul>
        </nav>

        <main className=" w-full px-8 bg-[#E8F7FF] min-h-screen pt-20  lg:ml-[22%] xl:ml-[18%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
