import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userInfo } from "../utils/Dummy_Data.js";
import Button from "../components/Button.jsx";
import Overview from "./Overview.jsx";
import '../assets/styles/Dashboard.css'
import NavProfile from "../components/NavProfile.jsx";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Dashboard = () => {

  const emailData = JSON.parse(localStorage.getItem("email"));
  const role = userInfo.filter((user) => user.email === emailData)[0].role;
 

  const menuToggleClick =() =>{
let menuToggle = document.querySelector('.menu-toggle');
var siteNav = document.querySelector('.site-nav');
siteNav.classList.toggle('site-nav-open');
menuToggle.classList.toggle('open');
}
 
const navLinks = [
  {to:'leave-application', text:'Leave Application'},
  {to: role==='hr'?'leave-approval':'request-history',text: role === "hr" ? "Leave Approval" : "Request History"  },
  {to:'', text:role==='hr'  || 'employee'? "My leave History":'Leave History', spanText:role==="manager"?"Team":""
  
    
  }
]

const MenuItem = ({onClick,to,text,spanText})=>(
<li onClick={onClick}>
  <Link className="text-lg hover:text-gray-300 ml-4" to={to}>
  {text}
  {
    spanText && <span className="text-xs">[{spanText}]</span>
  }
  </Link>

</li>
)
  return (
    <div className=" ">


      <header className="h-20 bg-gray-darkest flex items-center justify-between pr-5 relative">
      <div className="menu-toggle" onClick={menuToggleClick}>
          <div className="hamburger"></div>
        </div>
        <div className="flex items-center justify-center gap-10">
        <Badge badgeContent={4} color="primary">
        <NotificationsNoneOutlinedIcon color="secondary"  fontSize="large"/>
        </Badge>
        <NavProfile/>
        </div>
  </header>


      <div className="flex">
  <nav className="h-[calc(100vh-80px)] bg-gray-darkest text-white w-[60%] md:w-[30%] lg:w-[22%] site-nav">
    <ul className="flex flex-col gap-10">
  {
        navLinks.map((link,index)=>(
          <MenuItem key={index} onClick={menuToggleClick} to={link.to} text={link.text} spanText={link.spanText}/>
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
