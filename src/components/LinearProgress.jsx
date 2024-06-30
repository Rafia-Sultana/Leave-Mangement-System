import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import "./../assets/styles/LinearBar.css";
import employee from "../services/employee";
import { getYear } from "../utils/FormateDate";

const ApexChart = () => {
  const [customLegendItems, setCustomLegendItems] = useState([]);
  const [leaveBasic, setLeaveBasic] = useState({});
  const {totalYearlyLeave,totalLeaveTaken,leaveRemaining}=leaveBasic;

  useEffect(() => {
    const fetch = async () => {
      try {
      let [employeeLeaveChart, basicInfoChart] = await Promise.all([ employee.getEmployeeLeaveChart(), employee.basicInfoChart()]);
        setLeaveBasic(basicInfoChart);
        setCustomLegendItems(employeeLeaveChart);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <div
      className="font-poppins 
    border p-5 border-gray-lightest rounded-lg shadow-lg"
    >
      <div className="flex flex-wrap justify-between mb-4">
        <p className="text-center  mt-4 text-2xl ">{`Yearly Leave Chart - ${getYear(new Date)}`} </p>
        <div className="text-xs">
          <p>
            {" "}
            Total Yearly Leave: <span className="font-bold">{totalYearlyLeave}</span>
          </p>
          <p>
      
            Leave Taken: <span className="font-bold">{totalLeaveTaken}</span>
          </p>
          <p>
        
            Leave {leaveRemaining > 42 ? "Extra" : "Remaining"}:{" "}
            <span className="font-bold">{leaveRemaining}</span>{" "}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-s-2 border-gray">
        {customLegendItems.map(({ val, exp, type, color }, index) => {
          let percentage = exp === 0 ? 0 : Math.min((val / exp) * 100, 100);

          let maxvalue = exp === 0 ? 0 : Math.max((val / exp) * 100, 100);
          let value = ((maxvalue - 100) / 4 + 10) / 10;
          const maxPercentage =
            exp === 0 ? 0 : Math.max((val / exp) * 100, 100) / value;

          // const barColor = val > exp ? "red" : color;
          // const markerWidth = Math.min((val / exp) * 100, 100);

          return (
            <div key={index} className="relative">
              {/* Bar */}
              <div className="overflow-hidden bg-[#d0ebfa] rounded-r-md relative">
                <Tooltip title={` Taken:${val} || Total:${exp} `} arrow>
                <React.Fragment>
                <div className="py-2 h-[40px]">
                    <div
                      className="bar 
                      rounded-r-md whitespace-nowrap h-6 "
                      style={{
                        width: `${val > exp ? maxPercentage : percentage}%`,
                        backgroundColor: color,
                      }}
                    >
                      <p
                        className=" text-xs pt-1 ml-2 text-[#555454] relative"
                        style={{ zIndex: 3 }}
                      >{` ${type}:  ${val}/${exp}`}</p>
                    </div>
                  </div>
                  {val > exp && (
                    <div
                      className="bar absolute  bg-[#FFEBB2] rounded-md overflow-hidden "
                      style={{
                        width: `${100 - maxPercentage - 1}%`,
                        height: "52%",
                        left: `${maxPercentage + 0.6}%`,
                        top: "10px",

                        zIndex: 1,
                      }}
                    ></div>
                  )}
                </React.Fragment>
                </Tooltip>
              </div>

              {/* Marker */}
              {val > exp && (
                <div
                  className="bar absolute bg-red   "
                  style={{
                    width: "3px",
                    height: "50%",
                    left: `${maxPercentage}%`,
                    top: "10px",
                    zIndex: 2,
                    // marginTop:"1.1%",
                  }}
                ></div>
              )}

              <div className="bg-gray h-[0.02rem] mt-2"></div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 my-5">
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
