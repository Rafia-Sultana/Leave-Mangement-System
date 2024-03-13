import React from "react";
import Calendar from "../components/Calendar.jsx";
import ApexChart from "../components/LinearProgress.jsx";
import Cards from "../components/Cards.jsx";

const Overview = () => {
  return (
    <div>
      <Cards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ApexChart />
        <Calendar />
      </div>
    </div>
  );
};

export default Overview;
