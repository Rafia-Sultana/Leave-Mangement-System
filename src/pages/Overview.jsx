import React from "react";
import Calender from "../components/Calender.jsx";
import RadialChart from "../components/RadialChart.jsx";

const Overview = () => {
  const data = [
    { label: "Total Leaves", value: "50 days" },
    { label: "Approved", value: "50 days" },
    { label: "Pending", value: "50 days" },
    { label: "Rejected", value: "50 days" },
  ];
  return (
    <div className="">
      <div className=" relative grid grid-cols-2 lg:grid-cols-4  lg:rounded-lg w-full bg-green-50 p-2 my-12">
        <div className="absolute lg:hidden  top-1/2 -translate-y-1/2 left-[8%] w-[84%]  h-[1px] bg-black opacity-50">
        </div>
        <div className="absolute lg:hidden  left-1/2 -translate-x-1/2 h-[90%]  w-[1px] top-[5%] bg-black opacity-50">
        </div>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className={`h-24 lg:h-32 lg:card  flex flex-col items-center justify-center bg-green-100 lg:border-r-4 border-green-200   lg:shadow-xl`}
            >
              <p className="font-bold">{item.label}</p>
              <span>{item.value}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <RadialChart />

        <Calender />
      </div>
    </div>
  );
};

export default Overview;
