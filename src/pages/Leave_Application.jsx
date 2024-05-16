import React, { useContext, useEffect, useState } from "react";
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
import {
  startTimeArray,
  endTimeArray,
  convertToIsoString,
  getJoiningDate,
} from "../utils/FormateDate.js";
import { UserContext } from "../context api/Context.jsx";
import ShowSnackbar from "../components/ShowSnackbar.jsx";
const Leave_Application = () => {
  const { openSnackBar, setOpenSnackbar, handleSnackBarClose } =
    useContext(UserContext);
  const { state } = useLocation();
// console.log(state);
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;
  const initialState = {
    emp_id: userId,
    leave_name: state?.leave_name || "",
    start_date: state ? dayjs(state.start_date, "M/D/YYYY, h:mm:ss A") : null,
    end_date: state ? dayjs(state.end_date, "M/D/YYYY, h:mm:ss A") : null,
    duration: state?.duration || 0,
    joining_date: "",
    // file: null,
    reason: state?.reason || "",
    delegated_to: state?.delegated_to || "",
  };
  const [formData, setFormData] = useState(initialState);
  const [leaveTypes, setLeaveTypes] = useState(null);
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
            half: differenceInDays + " " + "(First Half)",
          };
        } else if (startHour >= 6 && endHour > 6) {
          return {
            days: differenceInDays + 0.5,
            half: differenceInDays + " " + "(Half)",
          };
        } else if (startHour < 6 && endHour > 6) {
          return {
            days: differenceInDays + 1,
            half: differenceInDays + 1,
          };
        }
      }
      return { days: differenceInDays + 1, half: differenceInDays + 1 };
    } else {
      return { days: 0, half: 0 };
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name || field]: value || newValue,
    }));
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFiles(file);
  };
  const LeaveNames = leaveTypes?.map((leave) => leave?.leave_name);
  const teamNames = teamMembersList?.map((team) => team?.employee_name);
  let joiningdate2 = getJoiningDate(formData?.end_date);
  let numberOfDays = formData?.end_date ? getTotalDays()?.half : 0;
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      joining_date: FormateDate(joiningdate2),
      duration: numberOfDays,
    }));
  }, [
    formData?.start_date,
    formData?.end_date,
    startTime,
    endTime,
    isoTime,
    endIsoTime,
  ]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let leaveTypeId = leaveTypes?.find(
      (x) => x.leave_name == formData?.leave_name
    )?.id;
    let delegatedId = teamMembersList?.find(
      (x) => x.employee_name == formData?.delegated_to
    )?.emp_id;
    let joiningDateTimestamp = joiningdate2?.toISOString();
    let durations = getTotalDays()?.days;
    let updateForm = {
      ...formData,
      start_date: isoTime,
      end_date: endIsoTime,
      leave_type_id: leaveTypeId,
      delegated_to: delegatedId,
      joining_date: joiningDateTimestamp,
      duration: durations,
      application_date: new Date().toISOString(),
    };
   
    // let result = await employee.postLeaveApplication(updateForm);
    let result;
    if(state){
       result =  await employee.editLeaveApplication(
        state.application_id,
        updateForm
      )
      console.log(result);
      }
      else{
         result =  await employee.postLeaveApplication(
          updateForm
    
         );
         console.log(result);
      }
    if (result) {
      setOpenSnackbar(true);
    }

    setFormData({
      emp_id: userId,
      leave_name: "",
      start_date: null,
      end_date: null,
      duration: 0,
      joining_date: "",
      reason: "",
      delegated_to: "",
    });
  };



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
    {
      val: 1,
      exp: 5,
      type: "Compensation Leave",
      color: "#1D3461",
    },
  ];
  function remainingDate() {
    return customLegendItems.find(
      (option) => option.type === formData?.leave_name
    ).val;
  }
  const getSelectStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const getSelectEndTime = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <div className="lg:px-8  my-4">
      <ShowSnackbar
        open={openSnackBar}
        handleClose={handleSnackBarClose}
        text={
          "Application submitted successfully.Your request is being processed."
        }
      />
      <HeadLine
        text={`${
          state && state.headerText ? state.headerText : "Leave Application"
        }`}
      />
      <form onSubmit={handleSubmit}>
        <Grid container rowGap={2}>
          <Grid item xs={12} lg={6} md={6} sx={{ paddingRight: { lg: '0.6rem' } }} >
            <AutoComplete
              options={
                Boolean(leaveTypes) ? LeaveNames : [formData?.leave_name]
              }
              label={"Leave Type"}
              field={"leave_name"}
              handleInputChange={handleInputChange}
              value={formData?.leave_name}
              variant="outlined"
            />
          </Grid>
      <Grid container spacing={2}>

      <Grid item xs={12} lg={6} md={6}>
            <DateInput
              label={"start_date"}
              handleDateChange={handleDateChange}
              value={formData?.start_date}
              disableDates={disablePreviousDates}
            />
            {formData?.leave_name && (
              <div className="text-xs">
                {`Remaining Days:${remainingDate()}`}{" "}
              </div>
            )}
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <SelectInput
              options={startTimeArray}
              placeholder={"Select Start Time"}
              getSelectedValue={getSelectStartTime}
              value={startTime}
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <DateInput
              label={"end_date"}
              handleDateChange={handleDateChange}
              value={formData?.end_date}
              disableDates={disableFutureDates}
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <SelectInput
              options={endTimeArray}
              placeholder={"Select End Time"}
              getSelectedValue={getSelectEndTime}
              value={endTime}
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <TextInput
              label={"Date of Joining"}
              InputProps={{ readOnly: true }}
              value={formData?.joining_date}
              onchange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <TextInput
              label={"Number of Days Applied"}
              InputProps={{ readOnly: true }}
              value={formData?.duration}
              onchange={handleInputChange}
            />
          </Grid>






          <Grid item xs={12} lg={6} md={6}>
            <AutoComplete
              options={
                Boolean(teamNames) ? teamNames : [formData?.delegated_to]
              }
              label={"Delegated to my colleague"}
              field={"delegated_to"}
              handleInputChange={handleInputChange}
              value={formData?.delegated_to}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <TextInput
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
            
            ></TextInput>
          
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
              cursor={"cursor-pointer" }
            
              // disable={hasSubmit?false:true}
            ></Button>
          )}
        </div>
      </form>
    </div>
  );
};
export default Leave_Application;
