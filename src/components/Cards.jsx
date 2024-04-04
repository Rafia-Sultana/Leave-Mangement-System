import React,{useEffect, useState} from "react";
import Calendar from "../components/Calendar.jsx";
import RadialChart from "../components/RadialChart.jsx";
import employee from "../services/employee.jsx";
import LinearProgressComponent from "../components/LinearProgress.jsx";
import ApexChart from "../components/LinearProgress.jsx";
import approve from '../assets/styles/svg/approve.svg';
import pending from '../assets/styles/svg/pending.svg';
import total from '../assets/styles/svg/total.svg';
import reject from '../assets/styles/svg/reject.svg';

const Cards = () => {
    const [summary, setSummary] = useState(null);
    const userInfoData = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfoData?.emp_id;
  
    const icons =[
      total, approve,pending,reject
    ]
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const leaveSummaryData = await employee.leaveRequestSummary(userId);
          setSummary(leaveSummaryData);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (userId) {
        fetchData();
      }
    }, [userId]);
  
    let data = [];
    if (summary) {
      data = Object.entries(summary).map(([label, value]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        value: `${value} ${value>1? 'days':'day'}`
      }));
    }
   
    return (
        <div className=" relative grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap:4  xl:gap-10    lg:rounded-lg w-full  p-2 my-12">
        <div className="absolute lg:hidden  top-1/2 -translate-y-1/2 left-[8%] w-[84%]  h-[1px] bg-black opacity-50">
        </div>
        <div className="absolute lg:hidden  left-1/2 -translate-x-1/2 h-[90%]  w-[1px] top-[5%] bg-black opacity-50">
        </div>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`h-24 lg:h-32 rounded-xl 
              flex items-center justify-center  gap-5 lg:gap-1 xl:gap-5   bg-blue-lightest bg-opacity-55  lg:shadow-lg`}
            >
              <img className=" w-16 h-16 hidden sm:block" src={icons[index]} alt={item.label} />
              <div className="text-lg">
              <p className="">{item.label}
            
            </p>
            <p className="text-sm font-semibold">{item.value}</p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
};

export default Cards;