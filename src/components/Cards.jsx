import React, { useEffect, useState } from "react";
import employee from "../services/employee.jsx";
import approve from "../assets/styles/svg/approve.svg";
import pending from "../assets/styles/svg/pending.svg";
import total from "../assets/styles/svg/total.svg";
import reject from "../assets/styles/svg/reject.svg";
// import {userId} from "../utils/getUserInfo";

const Cards = ({ empId }) => {
  const [summary, setSummary] = useState(null);
  const [loading,setLoading] = useState(true);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;




  
  const icons = [total, pending, approve, reject];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaveSummaryData = await employee.leaveRequestSummary(empId);
        setSummary(leaveSummaryData);
      } catch (error) {
        error;
      }
      finally{
       setTimeout(() => {
        setLoading(false);
       }, 500);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="h-72 lg:h-48">
      {
        !loading?    
         <div className=" relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap:4  xl:gap-10    lg:rounded-lg w-full  p-2 mt-5">
      <div className="absolute block lg:hidden  top-1/2 -translate-y-1/2 left-[8%] w-[84%]  h-[1px] bg-black opacity-50"></div>
      <div className="absolute block lg:hidden  left-1/2 -translate-x-1/2 h-[90%]  w-[1px] top-[5%] bg-black opacity-50"></div>
      {
      summary?.map((item, index) => {
        const { applications, days } = Object.values(item)[0];

        return (
          <React.Fragment key={index}>
            <div
              className={`h-24 lg:h-32 rounded-xl 
              flex items-center justify-center  gap-5 lg:gap-1 xl:gap-5   bg-blue-lightest bg-opacity-55  lg:shadow-lg`}
            >
              <img
                className=" w-10 h-10  lg:w-12 lg:h-12  hidden sm:block"
                src={icons[index]}
                alt={item.label}
              />
              <div className="text-lg">
                <p className="">
                  {Object.keys(item)[0].charAt(0).toUpperCase() +
                    Object.keys(item)[0].slice(1)}
                </p>

                <p className="text-xs">
                  Application:
                  {applications}
                </p>
                <p className="text-xs">Applied Days: {days}</p>
              </div>
            </div>
          </React.Fragment>
        );
      })   
    }
    </div>
        :
        <div className="flex gap-2 justify-center items-center h-full">
        <p className="loading"></p>
        <p>Loading....</p>
        </div>
      }
     
    </div>
    
  );
};

export default Cards;
