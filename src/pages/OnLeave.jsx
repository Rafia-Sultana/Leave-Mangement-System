import React, { useCallback, useEffect, useState } from "react";
import HeadLine from "../components/HeadLine";
import DateInput from "../components/InputFields/DateInput";
import dayjs from "dayjs";
import employee from "../services/employee";
import { convertToIsoString } from "../utils/FormateDate";
import CommonTable from "../components/CommonTable";
import LottiePlayers from "../components/LottiePlayers";


const OnLeave = () => {
  const [rows, setRows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const columns = [
    { id: "name", label: "Name", minWidth: 100 },
    { id: "leave_name", label: "Leave Type", minWidth: 100 },
    { id: "designation", label: "Designation", minWidth: 100 },
    { id: "department", label: "Department", minWidth: 100 },
    { id: "delegated_to", label: "Delegated To", minWidth: 100 },
   
    {
      id: "start_date",
      label: "Start Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "end_date",
      label: "End Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "duration",
      label: "Total Days",
      minWidth: 170,
      align: "right",
    },


  ];

  const fetchData = useCallback(async () => {
    try {
      const timestamp = convertToIsoString(selectedDate, "12:00 AM");
      const res = await employee.getOnLeaveEmployee(timestamp);
     
      setRows(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDateChange = useCallback((newDate) => {
    setSelectedDate(newDate);
  });


  return (
    <div>
      <HeadLine text={"On Leave Employees"}></HeadLine>
      <div className="w-1/4 pl-3">
        <DateInput
          label={"Date"}
          required={false}
          handleDateChange={handleDateChange}
          variant="standard"
          value={dayjs()}
        />
      </div>
      <div className="mt-5">
        {rows.length === 0 ? (
        <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
        ) : (
          <CommonTable rows={rows} columns={columns} />
        )}
      </div>
      
    </div>
  );
};

export default OnLeave;
