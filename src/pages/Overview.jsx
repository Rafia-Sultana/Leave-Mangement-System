import React,{useEffect, useState} from "react";
import Calendar from "../components/Calendar.jsx";
import RadialChart from "../components/RadialChart.jsx";
import employee from "../services/employee.jsx";


const Overview = () => {
  const [summary, setSummary] = useState(null);
  const userInfoData = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfoData?.emp_id;

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
      value: value + " days"
    }));
  }

  return (
    <div className="">
      <div className=" relative grid grid-cols-2 lg:grid-cols-4  lg:rounded-lg w-full bg-green-lightest p-2 my-12">
        <div className="absolute lg:hidden  top-1/2 -translate-y-1/2 left-[8%] w-[84%]  h-[1px] bg-black opacity-50">
        </div>
        <div className="absolute lg:hidden  left-1/2 -translate-x-1/2 h-[90%]  w-[1px] top-[5%] bg-black opacity-50">
        </div>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`h-24 lg:h-32 lg:card  flex flex-col items-center justify-center bg-green-lighter lg:border-r-4 border-green-light  lg:shadow-xl`}
            >
              <p className="font-bold">{item.label}</p>
              <span>{item.value}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <RadialChart />
        <Calendar />
      </div>
    </div>
  );
};

export default Overview;
