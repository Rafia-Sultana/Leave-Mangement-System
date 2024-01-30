import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userInfo } from "../utils/Dummy_Data.js";
import Button from "../components/Button.jsx";
import Overview from "./Overview.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const emailData = JSON.parse(localStorage.getItem("email"));
  const role = userInfo.filter((user) => user.email === emailData)[0].role;
  const handleLogOutClick = () => {
    navigate("/");
  };

  return (
    <div className=" ">
      <header className="h-20 bg-gray-900 text-end flex items-center justify-end pr-5">
        {/* <Button
 bgColor="gray-900"
 fontSize="bold"
 textColor="white"
 btnText="Logout"
 width=""
 type=''
 onClick={handleLogOutClick}
>Logout</Button> */}
        <div className="flex justify-center items-center ">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="">
            <ul className="menu menu-horizontal ">
              <li>
                <details>
                  <summary className="font-semibold text-white">
                    Rafia Sultana
                  </summary>
                  <ul className="relative z-50 bg-base-100 rounded-t-none ">
                    <li>
                      <a>Link 1</a>
                    </li>
                    <li>
                      <a>Link 2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <div className="flex">
        <nav className=" h-[calc(100vh-80px)]   flex flex-col  items-start gap-5 px-6 py-4   bg-gray-800 text-white w-1/6 relative">
          <Link
            className="mb-2 text-lg hover:text-gray-300  rounded-md "
            to="leave-application"
          >
            Leave Application
          </Link>

          {role === "hr" ? (
            <>
              <Link
                className="mb-2 text-lg hover:text-gray-300  rounded-md "
                to="leave-approval"
              >
                Leave Approval
              </Link>
              <Link className="mb-2 text-lg hover:text-gray-300" to="">
                My leave History
              </Link>
              <Link className="mb-2 text-lg hover:text-gray-300" to="">
                Teams' leave History
              </Link>
            </>
          ) : (
            <>
              <Link
                className="mb-2 text-lg hover:text-gray-300"
                to="request-history"
              >
                Request History
              </Link>
            </>
          )}
          <Link
            className="absolute bottom-16 mb-2 text-lg hover:text-gray-300"
            to="/"
          >
            Logout
          </Link>
        </nav>
        <main className=" mx-auto w-4/6">
          {/* <Outlet /> */}
        </main>
      </div>
    </div>
  );
};

export { Dashboard };
