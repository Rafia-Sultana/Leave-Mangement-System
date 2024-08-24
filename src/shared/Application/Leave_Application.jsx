import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import dayjs from "dayjs";

import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";

import Button from "../../components/Button.jsx";
import HeadLine from "../../components/HeadLine.jsx";
import DateInput from "../../components/InputFields/DateInput.jsx";
import TextInput from "../../components/InputFields/TextInput.jsx";
import SelectInput from "../../components/InputFields/SelectInput.jsx";
import AutoComplete from "../../components/InputFields/AutoComplete.jsx";

import employee from "../../services/employee.jsx";
import FormateDate, { Time } from "../../utils/FormateDate.js";

import {
  startTimeArray,
  endTimeArray,
  convertToIsoString,
  getJoiningDate,
} from "../../utils/FormateDate.js";
import { UserContext } from "../../context api/Context.jsx";
import { CircularProgress, TextField, duration } from "@mui/material";
import { update } from "lodash";

const Leave_Application = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;
  const role = userInfoData?.role

  const initialState = {
    emp_id: userId,
    leave_name: state?.leave_name || "",
    start_date: state ? dayjs(state.start_date, "M/D/YYYY, h:mm:ss A") : null,
    end_date: state ? dayjs(state.end_date, "M/D/YYYY, h:mm:ss A") : null,
    duration: state?.total_days || 0,
    joining_date: "",
    reason: state?.reason || "",
    delegated_to: state?.delegated_to || "",
  };
  console.log(state);

  const [formData, setFormData] = useState(initialState);

  const [remaining, setRemaining] = useState(0);
  const [isoTime, setIsoTime] = useState(null);
  const [leaveTypes, setLeaveTypes] = useState(null);
  const [endIsoTime, setEndIsoTime] = useState(null);
  const [endTime, setEndTime] = useState("6:00 PM");
  const [startTime, setStartTime] = useState("9:00 AM");
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [teamMembersList, setTeamMembersList] = useState(null);

  const fileInputRef = useRef(null);

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
    console.log("p", date);
    if (formData.end_date) {
      return new Date(formData.end_date) < new Date(date.$d);
    }
  };

  const disableFutureDates = (date) => {
    if (formData.start_date) {
      return (
        new Date(formData.start_date) >
        new Date(state ? date.add(1, "day").$d : date.$d)
      );
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
            half: differenceInDays + " & " + "(First Half)",
          };
        } else if (startHour >= 6 && endHour > 6) {
          return {
            days: differenceInDays + 0.5,
            half: differenceInDays + " & " + "(Half)",
          };
        } else if (startHour < 6 && endHour > 6) {
          return {
            days: differenceInDays + 1,
            half: differenceInDays + 1,
          };
        }
      }
      return { days: differenceInDays + 1, half: differenceInDays + 1 };
    } else return;
  };

  useEffect(() => {
    const fetchData = async () => {
      const [leaveTypeData, customLegendItems, teamMembersList] =
        await Promise.all([
          employee.getLeaveTypes(state ? state.emp_id : userId),
          employee.getEmployeeLeaveChart(),
          employee.getTeamMembersOfUser(state ? state.emp_id : userId),
        ]);

      setTeamMembersList(teamMembersList);
      setLeaveTypes(leaveTypeData);

      let remaining;
      if (formData.leave_name) {
        let leaveCount = customLegendItems.find(
          (x) => x.type == formData.leave_name
        );

        remaining = leaveCount.exp - leaveCount.val;

        setRemaining(remaining);
      }
    };
    fetchData();
  }, [formData.leave_name]);

  const handleInputChange = (e, newValue, field) => {
    const { name, value } = e?.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name || field]: value || newValue,
    }));
  };

  const handleFileUpload = (e) => {
    const file = Array.from(e.target.files);
    setSelectedFiles(file);
  };

  const LeaveNames = leaveTypes?.map((leave) => leave?.leave_name);
  const teamNames = teamMembersList?.map((team) => team?.employee_name);
  // console.log(teamMembersList);
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

  console.log(teamMembersList, formData?.delegated_to);
  console.log(formData?.delegated_to, state?.btnText);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const leaveTypeId = leaveTypes?.find(
        (x) => x.leave_name === formData?.leave_name
      )?.id;

      const delegatedId = teamMembersList?.find(
        (x) => x.employee_name == formData?.delegated_to
      )?.emp_id;

      console.log(formData?.delegated_to, delegatedId);
      console.log(teamMembersList?.find(
        (x) => console.log("x",x.employee_name)
      ));

      const joiningDateTimestamp = joiningdate2?.toISOString();

      const durations = getTotalDays()?.days;

      const formFileData = new FormData();
      formFileData.append("files", selectedFiles);

      if (selectedFiles) {
        selectedFiles.forEach((file) => {
          formFileData.append("files", file);
        });
      }

      const updateForm = {
        ...formData,
        start_date: isoTime,
        end_date: endIsoTime,
        leave_type_id: leaveTypeId,
        delegated_to: delegatedId,
        joining_date: joiningDateTimestamp,
        duration: durations,
        application_date: new Date().toISOString(),
        // file:selectedFiles
      };
      // console.log(updateForm);

      for (const key in updateForm) {
        formFileData.append(key, updateForm[key]);
      }

      let result;

      if (state) {
        formFileData.append("applicant_id", state.emp_id);
        result = await employee.editLeaveApplication(
          state.application_id,
          formFileData
        );
      } else {
        result = await employee.postLeaveApplication(formFileData);
      }
      if (result) {
        enqueueSnackbar(
          `Application submitted successfully. Your request is being processed.`,
          {
            variant: "success",
          }
        );
 console.log(userId, state?.emp_id);
        setTimeout(() => {
        // navigate(-2);
        if(userId !== state?.emp_id && role == "Team Lead"){
          navigate("/dashboard/manager-leave-request");
        }
        else if((userId !== state?.emp_id && role == "Admin"|| role=="Line Manager")){
          navigate("/dashboard/admin-pending-request");
        }
        else{
          // navigate("/dashboard");
          navigate("/dashboard/request-history");
        }
        }, 500);
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

      setSelectedFiles(null);
      setStartTime(null);
      setEndTime(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar(`Something Went Wrong!`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getSelectStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const getSelectEndTime = (e) => {
    setEndTime(e.target.value);
  };

  useEffect(() => {
    if (state && state.start_date) {
      setStartTime(Time(state.start_date));
    }
    if (state && state.end_date) {
      setEndTime(Time(state.end_date));
    }
  }, []);

  return (
    <div className="lg:px-8  my-4">
      <HeadLine
        text={`${
          state && state.headerText ? state.headerText : "Leave Application"
        }`}
      />



      <form onSubmit={handleSubmit}>
        <Grid container rowGap={2}>
          <Grid
            item
            xs={12}
            lg={6}
            md={6}
            sx={{ paddingRight: { lg: "0.6rem", md: "0.5rem" } }}
          >
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
                  {`${remaining < 0 ? "Over" : "Remaining"} Days:${Math.abs(
                    remaining
                  )}`}{" "}
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
                options={ Boolean(teamNames) ? teamNames : [formData?.delegated_to]
                }
                label={"Delegated to my colleague"}
                field={"delegated_to"}
                handleInputChange={handleInputChange}
                value={formData?.delegated_to}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} lg={6} md={6}>
              <TextField
                type="file"
                InputLabelProps={{ shrink: true }}
                inputProps={{ multiple: true }}
                onChange={handleFileUpload}
                inputRef={fileInputRef}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Upload File:
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
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
        </Grid>
        <div className="mt-6">
          {state?.btnText ? (
            <Button
              fontWeight="semibold"
              textColor="white"
              width="full"
              type="submit"
              backgroundColor={"bg-red"}
              padding={"p-3"}
              cursor={loading? "cursor-not-allowed":"cursor-pointer"}
              // onClick={handleSendToHR}
            >
            {loading ? <CircularProgress size={20} /> :  "SUBMIT"}
            </Button>
          ) : (
            <Button
              fontWeight="bold"
              textColor="white"
              width="full"
              padding={"p-3"}
              type="submit"
              backgroundColor={"bg-blue-light"}
              cursor={loading? "cursor-not-allowed":"cursor-pointer"}

              // disable={hasSubmit?false:true}
            >
             
              {loading ? <CircularProgress size={20}/> :  "SUBMIT"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
export default Leave_Application;
