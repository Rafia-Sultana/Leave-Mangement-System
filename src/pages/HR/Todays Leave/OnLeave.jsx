import React, { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

import HeadLine from "../../../components/HeadLine";
import DateInput from "../../../components/InputFields/DateInput";
import LoadingOrTable from "../../../components/LoadingOrTable";

import employee from "../../../services/employee";
import { convertToIsoString } from "../../../utils/FormateDate";
import { UserContext } from "../../../context api/Context";
import { useLocation } from "react-router-dom";



const OnLeave = () => {
  // const {loading, setLoading } = useContext(UserContext);
  const [ loading, setLoading]= useState(true)
  const [rows, setRows] = useState([]);
  const {enqueueSnackbar} = useSnackbar();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const location = useLocation();

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
    // setLoading(true);
    try {
      const timestamp = convertToIsoString(selectedDate, "12:00 AM");
      const res = await employee.getOnLeaveEmployee(timestamp);

      setRows(res);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      enqueueSnackbar(`${error.response.data.error}`, {
        variant: "error",
      });
    } finally {
      setTimeout(()=>{ setLoading(false);},500)
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData,location]);

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
          value={selectedDate}
        />
      </div>
      <div className="mt-[3%]">
        <LoadingOrTable rows={rows} columns={columns} loading={loading}/>
      </div>
    </div>
  );
};

export default OnLeave;
