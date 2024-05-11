import React, { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormateDate from "../utils/FormateDate.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AutoComplete from "../components/InputFields/AutoComplete.jsx";
import InputAdornment from "@mui/material/InputAdornment";
import employee from "../services/employee.jsx";
import dayjs from "dayjs";
import TextInput from "../components/InputFields/TextInput.jsx";
import SelectInput from "../components/InputFields/SelectInput.jsx";
import DateInput from "../components/InputFields/DateInput.jsx";
import HeadLine from "../components/HeadLine.jsx";
import {startTimeArray,endTimeArray,convertToIsoString,getJoiningDate} from '../utils/FormateDate.js'


const Leave_Application = () => {

  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;

  const initialState = {
    emp_id: userId,
    leave_type_id: state?.leave_type_id || null,
    leave_name: state?.leave_name || null,
    start_date: state ? dayjs(state.start_date, "M/D/YYYY, h:mm:ss A") : null,
    end_date: state ? dayjs(state.end_date, "M/D/YYYY, h:mm:ss A") : null,
    duration: state?.duration || "",
    joining_date: "",
    file: null,
    reason: state?.reason || "",
    delegated_to: state?.delegated_to || null,
    application_date: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [leaveTypes, setLeaveTypes] = useState(null);
  const [collegueName, setCollegueName] = useState(null);
  const [teamMembersList, setTeamMembersList] = useState(null);
  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("6:00 PM");
  const [isoTime, setIsoTime] = useState(null);
  const [endIsoTime, setEndIsoTime] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);


  useEffect(() => {
    if (formData?.start_date !== null) {
      const startTimestamp = convertToIsoString(
        formData?.start_date,
        startTime
      );
      setIsoTime(startTimestamp);
    }
    if (formData?.end_date !== null) {
      const endTimestamp = convertToIsoString(formData?.end_date, endTime);
      setEndIsoTime(endTimestamp);
    }
  }, [startTime, endTime, formData?.start_date, formData?.end_date]);

  const handleDateChange = (date, label) => {
    setFormData((prevState) => ({
      ...prevState,
      [label]: date,
    }));
  };

  const disablePreviousDates = (date) => {
    if (formData.end_date) {
      return new Date(formData.end_date) < new Date(date.$d);
    }
  };

  const disableFutureDates = (date) => {
    if (formData.start_date) {
      return new Date(formData.start_date) > new Date(date.$d);
    }
  };


  const getTotalDays = () => {
    //  per day Miliseconds = 1000*60*60*24 = 86400000 ;
    if (isoTime !== null && endIsoTime !== null) {
      //Get the difference in miliseconds
      const differenceInMS = Math.abs(new Date(isoTime) - new Date(endIsoTime));

      // Convert milliseconds to days
      const differenceInDays = Math.floor(differenceInMS / 86400000);
      const startHour = new Date(isoTime).getUTCHours();
      const endHour = new Date(endIsoTime).getUTCHours();

      if (differenceInDays === 0) {
        if (startHour < 6 && endHour <= 6) {
          return { days: 0.5, half: "First Half" };
        } else if (startHour >= 6 && endHour >= 6) {
          return { days: 0.5, half: "Second Half" };
        }
        return { days: differenceInDays + 1, half: differenceInDays + 1 };
      } else {
        if (startHour < 6 && endHour <= 6) {
          return {
            days: differenceInDays + 0.5,
            half: differenceInDays +" " + "(First Half)",
          };
        } else if (startHour >= 6 && endHour > 6) {
          return {
            days: differenceInDays + 0.5,
            half: differenceInDays + " " + "(Half)",
          };
        }
        else if(startHour<6 && endHour>6){
          return{
            days: differenceInDays + 1,
            half: differenceInDays + 1,
          };
        }
      }
      return { days: differenceInDays+1, half: differenceInDays +1};
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let leaveTypeData = await employee.getLeaveTypes();
      let teamMembersList = await employee.getTeamMembersOfUser(userId);
      setTeamMembersList(teamMembersList);
      setLeaveTypes(leaveTypeData);
    };
    fetchData();
  }, []);

  const handleInputChange = (e, newValue, field) => {
    const { name, value } = e?.target;
    const updatedFields = {};
   console.log(newValue);
    switch (field) {
      case "leave_type_id":
        updatedFields[field] =
          newValue.id !== undefined ? newValue.id : formData[field];
          updatedFields["leave_name"]= newValue?.leave_name;
        setSelectedLeaveType(newValue);
        break;
      case "delegated_to":
        updatedFields[field] =
          newValue.emp_id !== undefined ? newValue?.emp_id : formData[field];
        setCollegueName(newValue);
        break;

      default:
        updatedFields[field] = formData[field];
        break;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
     
      ...updatedFields
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFiles(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   setFormData(initialState);
    if(state){
    // await employee.editLeaveApplication(
    //   state.application_id,
    //   {
    //     ...formData,
    //     start_date: isoTime,
    //     end_date: endIsoTime,
    //     duration: getTotalDays()?.days,
    //     joining_date: formData.end_date && getJoiningDate(formData.end_date)?.toISOString(),
    //     application_date: new Date().toISOString(),
    //   }
    // )
    }
    else{
      // await employee.postLeaveApplication(
      //   {
      //     ...formData,
      //     start_date: isoTime,
      //     end_date: endIsoTime,
      //     duration: getTotalDays()?.days,
      //     joining_date: formData.end_date && getJoiningDate(formData.end_date)?.toISOString(),
      //     application_date: new Date().toISOString(),
      //   }
  
      //  );
    }
         

    // if (formData) {
    //   enqueueSnackbar("Submitted Succesfully!", { variant: "success" });

    //   setTimeout(() => {
    //     navigate("/dashboard/request-history");
    //   }, 500);
    // } else {
    //   console.error("email does not exist");
    // }
  };


  const selectedOptionOfLeaveName = leaveTypes?.find(
    (option) => option.leave_name === state?.leave_name
  );

  const selectedOptionOfDelegatedCollegueName = teamMembersList?.find(
    (option) => option.employee_name === state?.delegated_to
  );

  let customLegendItems = [
    {
      val: 5,
      exp: 14,
      type: "Sick Leave",
      color: "#829CBC",
    },
    {
      val: 18,
      exp: 18,
      type: "Casual Leave",
      color: "#6290C8",
    },
    {
      val: 14,
      exp: 10,
      type: "Leave Without Pay",
      color: "#376996",
    },
    {
      val: 100,
      exp: 120,
      type: "Maternity Leave",
      color: "#1F487E",
    },
    {
      val: 1,
      exp: 5,
      type: "Paternity Leave",
      color: "#1D3461",
    },
  ];
  function remainingDate() {
    return customLegendItems.find(
      (option) => option.type === selectedLeaveType?.leave_name
    ).val;
  }

  
  const getSelectStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const getSelectEndTime = (e) => {
    setEndTime(e.target.value);
  };

 

  return (
    <div className="px-8 shadow-lg pb-8">

      <HeadLine text={`${
          state && state.headerText ? state.headerText : "Leave Application"
        }`}/>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4} md={6}>
            <AutoComplete
              options={leaveTypes}
              label={"Leave Type"}
              field={"leave_type_id"}
              handleInputChange={handleInputChange}
              value={selectedLeaveType || selectedOptionOfLeaveName || null}
            />
          </Grid>

          <Grid item xs={12} lg={4} md={6}>
            <DateInput
              label={"start_date"}
              handleDateChange={handleDateChange}
              value={formData?.start_date}
              disableDates={disablePreviousDates}
            />

            {selectedLeaveType?.leave_name && (
              <div className="text-xs">
                {`Remaining Days:${remainingDate()}`}{" "}
              </div>
            )}
          </Grid>

          <Grid item xs={12} lg={4} md={6}>
            <SelectInput
              options={startTimeArray}
              placeholder={"Select Start Time"}
              getSelectedValue={getSelectStartTime}
              value={startTime}
            />
          </Grid>

          <Grid item xs={12} lg={4} md={6}>
            <DateInput
              label={"end_date"}
              handleDateChange={handleDateChange}
              value={formData?.end_date}
              disableDates={disableFutureDates}
            />
          </Grid>

          <Grid item xs={12} lg={4} md={6}>
            <SelectInput
              options={endTimeArray}
              placeholder={"Select End Time"}
              getSelectedValue={getSelectEndTime}
              value={endTime}
            />
          </Grid>

          <Grid item xs={12} lg={4} md={6}>
            <TextInput
              label={"Date of Joining"}
              InputProps={{ readOnly: true }}
              value={formData.end_date && FormateDate(getJoiningDate(formData.end_date))}
              focused={true}
            />
          </Grid>

          <Grid item xs={12} lg={4} md={6}>
            <TextInput
              label={"Number of Days Applied"}
              InputProps={{ readOnly: true }}
              focused={true}
              value={getTotalDays()?.half}
            />
          </Grid>

          <Grid item xs={12} lg={4} md={6}>
            <AutoComplete
              options={teamMembersList}
              label={"Delegated to my colleague"}
              field={"delegated_to"}
              handleInputChange={handleInputChange}
              value={
                collegueName || selectedOptionOfDelegatedCollegueName || null
              }
            />
          </Grid>

          <Grid item xs={12} lg={4} md={6}>
            <TextField
              type="file"
              variant="outlined"
              multiple
              onChange={handleFileUpload}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    Upload File :
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              label="Reasons for leave"
              name="reason"
              value={formData.reason}
              multiline={true}
              rows={4}
              required={true}
              onchange={(e) => {
                if (e.target.name) {
                  setFormData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }
              }}
            />
          </Grid>
        </Grid>

        <div className="mt-6">
          {state?.btnText ? (
            <Button
              fontWeight="semibold"
              textColor="white"
              btnText="Send to Employee"
              width="full"
              type="submit"
              backgroundColor={"bg-red"}
              padding={"p-3"}
              // onClick={handleSendToHR}
            ></Button>
          ) : (
            <Button
              fontWeight="bold"
              textColor="white"
              btnText="SUBMIT"
              width="full"
              padding={"p-3"}
              type="submit"
              backgroundColor={"bg-blue-light"}
            ></Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Leave_Application;
