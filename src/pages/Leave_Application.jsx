import React, { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
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

const Leave_Application = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;

  // const defaultStartDate = dayjs();
  // const defaultEndDate = dayjs();

  const initialState = {
    emp_id: userId,
    leave_type_id: state?.leave_type_id || null,
    leave_name: state?.leave_name || null,
    start_date: state?.start_date || null,
    end_date: state?.end_date ||  null,
    duration: state?.duration || "",
    joining_date: "",
    file: null,
    reason: state?.reason || "",
    delegated_to: state?.delegated_to || null,
    application_date: "",
  };
  
 

  const [formData, setFormData] = useState(initialState);
  const [total_Days, setTotal_Days] = useState(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  // const [selectedOption, setSelectedOption] = useState("fullDay");
  const [leaveTypes, setLeaveTypes] = useState(null);
  const [collegueName, setCollegueName] = useState(null);
  const [teamMembersList, setTeamMembersList] = useState(null);
  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("6:00 PM");
  const [isoTime,setIsoTime] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const today = new Date().toISOString();




 const convertToIsoString = (date,uptime) => {
  
  const [time,ampm] = uptime.split(" ");
  const [hours, minutes]=time.split(":").map(Number);
  const adjustHours = ampm == "PM" && hours!== 12? hours+12:hours;
  const date1 = new Date(date?.$d);
  date1.setHours(adjustHours,minutes,0,0);
  const timestamp = date1?.toISOString();
  //  setIsoTime(timestamp);
  return timestamp;
  }
  useEffect(()=>{
   if((formData?.start_date)!==null){
     const startTimestamp = convertToIsoString(formData?.start_date,startTime);
     setIsoTime(startTimestamp);
    //  const endTimestamp = convertToIsoString(formData?.end_date,endTime);
    //  console.log(endTimestamp);
    //  setIsoTime(endTimestamp);

    }
  },[startTime,endTime,formData?.start_date,formData?.end_date])

  const handleDateChange = (date, label) => {
   setFormData((prevState) => ({
    ...prevState,
    [label]:date
  }));
  };

  const disablePreviousDates = (date) => {
  if (formData.end_date) {
      return (
        new Date(formData.end_date) <
        new Date(date.$d)
      );
    }

  };
  
  const disableFutureDates = (date) => {
    if (formData.start_date) {
     return (
    new Date(formData.start_date) >
        new Date(date.$d)
      );
    }
    
  };
  

  const getJoiningDate = (toDate) => {
    const currentToDate = new Date(toDate);
    const tomorrowToDate = new Date(currentToDate);
    return new Date(
      tomorrowToDate.setDate(currentToDate.getDate() + 1)
    ).toISOString();
  };

  const getTotalDays = () => {
    if (formData.end_date && formData.start_date) {
      const startDate = dayjs(formData.start_date);
      const endDate = dayjs(formData.end_date);
      let daysDifference = endDate.diff(startDate, "day");
      const hoursDifference = endDate.diff(startDate, "hour");
      if (daysDifference === 0 && hoursDifference < 9) return 0.5;
      else if (daysDifference === 1 && endDate.hour() < 12) {
        return 1.5;
      }
      // Otherwise, count as full days
      else {
        return daysDifference + 1; // Add 1 to include the start date
      }
      // console.log(hoursDifference);
      // console.log(formData.start_date, startDate);
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

    switch (field) {
      case "leave_type_id":
        updatedFields[field] =
          newValue.id !== undefined ? newValue.id : formData[field];
        console.log(newValue);
        setSelectedLeaveType(newValue);
        break;
      case "delegated_to":
        updatedFields[field] =
          newValue.emp_id !== undefined ? newValue.emp_id : formData[field];
        setCollegueName(newValue);
        break;

      default:
        updatedFields[field] = formData[field];
        break;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      ...updatedFields,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelectedFiles(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await employee.postLeaveApplication(
      {
        ...formData,
        start_date:isoTime,
        duration: getTotalDays(),
        joining_date: formData.end_date && getJoiningDate(formData.end_date),

        application_date: new Date().toISOString(),
      }
      /// send put request if state !== null
    );

    // if (formData) {
    //   enqueueSnackbar("Submitted Succesfully!", { variant: "success" });

    //   setTimeout(() => {
    //     navigate("/dashboard/request-history");
    //   }, 500);
    // } else {
    //   console.error("email does not exist");
    // }
  };

  useEffect(() => {
    if (getTotalDays() > 0) {
      setTotal_Days(getTotalDays());
    } else {
      setTotal_Days(null);
    }
  }, [formData.start_date, formData.end_date]);

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
      type: "Annual Leave",
      color: "#6290C8",
    },
    {
      val: 14,
      exp: 10,
      type: "Unpaid Leave",
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


  const startTimeArray = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ];
  const endTimeArray = [
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
  ];

  const getSelectStartTime = (e) => {
  setStartTime(e.target.value);
};
  const getSelectEndTime = (e)=>{
    setEndTime(e.target.value);
  }


  return (
    <div className="p-10 rounded-md shadow-xl">
      <h2
        className="text-2xl text-center font-semibold text-gray-darker
         underline decoration-2  decoration-blue-dark underline-offset-8  mb-16"
      >
        {`${
          state && state.headerText ? state.headerText : "Leave Application"
        }`}
      </h2>
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
              // value={dayjs(formData["start_date"])}
              disableDates={
                disablePreviousDates}
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
              // value={dayjs(formData["end_date"])}
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


          

          {[
            { label: "Date of Joining", readOnly: true },
            { label: "Number of Days Applied", readOnly: true },
          ].map((textFieldProps, index) => (
            <Grid item xs={12} lg={4} md={6} key={index}>
              <TextInput
                label={textFieldProps.label}
                InputProps={{ readOnly: textFieldProps.readOnly }}
                value={
                  textFieldProps.label === "Number of Days Applied"
                    ? total_Days !== null
                      ? total_Days
                      : ""
                    : formData.end_date &&
                      FormateDate(new Date(getJoiningDate(formData.end_date)))
                }
              />
            </Grid>
          ))}



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
              fontSize="semibold"
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
              fontSize="bold"
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
