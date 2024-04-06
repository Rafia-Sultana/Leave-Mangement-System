import React from "react";
import { Tooltip } from "@mui/material";
import "./../assets/styles/LinearBar.css";

const ApexChart = () => {
  let customLegendItems = [
    {
      val: 5,
      exp: 14,
      type: "Sick leave",
      color: "#829CBC",
    },
    {
      val: 18,
      exp: 18,
      type: "Annual leave",
      color: "#6290C8",
    },
    {
      val: 14,
      exp: 10,
      type: "Casual leave",
      color: "#376996",
    },
    {
      val: 100,
      exp: 120,
      type: "Maternity leave",
      color: "#1F487E",
    },
    {
      val: 1,
      exp: 5,
      type: "Paternity leave",
      color: "#1D3461",
    },
  ];

  return (
    <div className="font-poppins border p-5 border-gray-lightest rounded-lg">
      <p className="text-center mb-10 mt-4 text-2xl ">Total Leave Chart</p>

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
                  <div
                    className="bar text-xs text-white p-2 lg:p-3 rounded-r-md whitespace-nowrap"
                    style={{
                      width: `${val>exp?maxPercentage:percentage}%`,
                      backgroundColor: color,
                    }}
                  >
                    {` ${type}:  ${val}/${exp}`}
                  </div>
                  {val > exp && (
                <div
                  className="bar absolute bg-[#FFEBB2] rounded-md  "
                  style={{
                    width: `${100-maxPercentage}%`,
                    height: "80%",
                    left: `${maxPercentage+0.6}%`,
                    top: "0",
                 
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
                    height: "100%",
                    left: `${maxPercentage}%`,
                    top: "0",
                 
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
