import React from "react";
import Calendar from "../../components/Calendar.jsx";
import ApexChart from "../../components/LinearProgress.jsx";
import Cards from "../../components/Cards.jsx";


const Overview = () => {
  const userInfoData = JSON.parse(localStorage.getItem('userInfo'));
  const empId = userInfoData?.emp_id;

  return (
    <div>
      <Cards empId={empId}  />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ApexChart />
        <Calendar />
      </div>
    </div>
  );
};

export default Overview;
