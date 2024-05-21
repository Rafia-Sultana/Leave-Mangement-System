import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import "./../assets/styles/LinearBar.css";
import employee from "../services/employee";

const ApexChart = () => {
  const [customLegendItems,setCustomLegendItems]= useState([]);
 
useEffect(()=>{

  const fetch = async()=>{
try {
  let res = await employee.getEmployeeLeaveChart();
 
  setCustomLegendItems(res);
} catch (error) {
  console.error(error);
}
  }
  fetch();
},[])
  return (
    <div className="font-poppins 
    border p-5 border-gray-lightest rounded-lg shadow-lg">
       <div className="flex justify-between">
       <p className="text-center mb-10 mt-4 text-2xl ">Total Leave Chart</p>
       <div className="text-xs">
        <p>    Total Yearly Leave: <span className="font-bold">42</span></p>
        <p> Leave Taken: <span  className="font-bold">30</span></p>
        <p> Leave Remaining: <span  className="font-bold">12</span> </p>
       </div>
 
       </div>
     
      <div className="flex flex-col gap-2 border-s-2 border-gray">
        {customLegendItems.map(({ val, exp, type, color }, index) => {
          const percentage = Math.min((val / exp) * 100, 100);
          let maxvalue = Math.max(val/exp*100,100);
          let value = (((maxvalue-100)/4)+10)/10;
          const maxPercentage = Math.max(val/exp*100,100)/value;

          
          const barColor = val > exp ? "red" : color;
          const markerWidth = Math.min((val / exp) * 100, 100);

          return (
            <div key={index} className="relative">
              {/* Bar */}
              <div className="overflow-hidden bg-gray-light rounded-r-md">
                <Tooltip title={` Taken:${val} || Total:${exp} `} arrow>
                  <div className="py-2">
                  <div
                    className="bar text-xs text-white
                     p-2 lg:p-3 rounded-r-md whitespace-nowrap"
                    style={{
                      width: `${val>exp?maxPercentage:percentage}%`,
                      backgroundColor: color,
                    }}
                  >
                    {` ${type}:  ${val}/${exp}`}
                  </div>

                  </div>
                  {val > exp && (
                <div
                  className="bar absolute bg-[#FFEBB2] rounded-md  "
                  style={{
                    width: `${100-maxPercentage-1}%`,
                    height: "60%",
                    left: `${maxPercentage+0.6}%`,
                    top: "0",
                    marginTop:"1.1%",
               
                   
                  }}
                ></div>
              )}
                </Tooltip>
              </div>

              {/* Marker */}
              {val > exp && (
                <div
                  className="bar absolute bg-red   "
                  style={{
                    width: "4px",
                    height: "63%",
                    left: `${maxPercentage}%`,
                    top: "0",
                    marginTop:"1.1%",
                 
                  }}
                ></div>
              )}
         

              <div className="bg-gray h-[0.02rem] mt-2"></div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 my-5">
        {customLegendItems.map(({ type, color }, index) => (
          <div key={index} className="">
            <p className="text-xs">
              <span
                style={{ backgroundColor: color }}
                className={`rounded-full inline-block w-2 h-2 mr-1 shadow-lg`}
              ></span>
              {type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApexChart;
