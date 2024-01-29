import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { userInfo } from '../utils/Dummy_Data';
import Button from '../components/Button';
import Overview from './Overview';

const Dashboard = () => {
  const navigate = useNavigate();
  const emailData = JSON.parse(localStorage.getItem("email"));
 const role =  userInfo.filter((user)=> user.email === emailData)[0].role;
const handleLogOutClick = ()=>{
  navigate('/');
}

  return (

      <div className="flex flex-col h-screen">
        <header className="h-20 bg-gray-900 text-end flex items-center justify-end pr-5">
<Button
 bgColor="gray-900"
 fontSize="bold"
 textColor="white"
 btnText="Logout"
 width=""
 type=''
 onClick={handleLogOutClick}
>Logout</Button>

        </header>
        <div className="flex flex-1 overflow-hidden">
          <nav className="flex flex-col items-start gap-5 px-6 py-4 bg-gray-800 text-white w-72">
          
        
          <Link
              className="mb-2 text-lg hover:text-gray-300  rounded-md "
              to="leave-application"
            >
              Leave Application
            </Link>

            {
              role === 'hr'? <>
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
              </>:
              
              <>
              
             
            <Link className="mb-2 text-lg hover:text-gray-300" to="request-history">
              Request History
            </Link>
              </>
            }
          </nav>
          <main className="overflow-hidden mx-auto basis-[70%]">
       
            <Outlet />
          </main>
        </div>
      </div>
   
  );
};


export  { Dashboard };
