import React, { useEffect, useState } from "react";
import Button from "../components/Button.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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

const Leave_Application = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  console.log(userInfoData);
  const userId = userInfoData?.emp_id;

  const initialState = {
    emp_id: userId,
    leave_type_id: state?.leave_type_id || null,
    leave_name: state?.leave_name || null,
    start_date: state?.start_date || "",
    end_date: state?.end_date || "",
    duration: state?.duration || "",
    joining_date: "",
    file: null,
    reason: state?.reason || "",
    delegated_to: state?.delegated_to || null,
    application_date: "",
  };

  // console.log(initialState);
  const [formData, setFormData] = useState(initialState);
  const [total_Days, setTotal_Days] = useState(null);
  // const [selectedOption, setSelectedOption] = useState("fullDay");
  const [leaveTypes, setLeaveTypes] = useState(null);
  const [teamMembersList, setTeamMembersList] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleDateChange = (date, label) => {
    setFormData((prevState) => ({
      ...prevState,
      [label]: date.$d.toISOString(),
    }));
  };

  const disablePreviousDates = (date) => {
    return (
      new Date(formData.start_date) >
      new Date(FormateDate(date && new Date(date.$d)))
    );
  };
  const disableFuturDates = (date) => {
    return (
      new Date(formData.end_date) <
      new Date(FormateDate(date && new Date(date.$d)))
    );
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
      let differences =
        (new Date(formData.end_date) - new Date(formData.start_date)) /
        (1000 * 60 * 60 * 24);
      return Math.abs(differences);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let leaveTypeData = await employee.getLeaveTypes();
      let teamMembersList = await employee.getTeamMembersOfUser(userId);
      console.log(teamMembersList);
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
        break;
      case "delegated_to":
        updatedFields[field] =
          newValue.emp_id !== undefined ? newValue.emp_id : formData[field];
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
        duration: getTotalDays(),
        joining_date: formData.end_date && getJoiningDate(formData.end_date),

        application_date: new Date().toISOString(),
      }
      /// send put request if state !== null
    );

    if (formData) {
      enqueueSnackbar("Submitted Succesfully!", { variant: "success" });

      setTimeout(() => {
        navigate("/dashboard/request-history");
      }, 500);
    } else {
      console.error("email does not exist");
    }
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

  return (
    <div className="p-10 rounded-md shadow-xl">
      <h2
        className="text-2xl text-center font-semibold text-gray-darker
         underline decoration-2  decoration-blue-dark underline-offset-8  mb-16"
      >
        Leave Application Form
      </h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4} md={6}>
            <AutoComplete
              options={leaveTypes}
              label={"Leave Type"}
              field={"leave_type_id"}
              handleInputChange={handleInputChange}
              value={selectedOptionOfLeaveName || null}
            />
          </Grid>

          {["start_date", "end_date"].map((label, index) => (
            <Grid item xs={12} lg={4} md={6} key={index}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label={label
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                  onChange={(date) => handleDateChange(date, label)}
                  sx={{ width: "100%" }}
                  value={dayjs(formData[label])}
                  minTime={dayjs().set("hour", 12)}
                  maxTime={dayjs().set("hour", 12)}
                  {...(label === "end_date" &&
                    formData.start_date && {
                      shouldDisableDate: disablePreviousDates,
                    })}
                  {...(label === "start_date" &&
                    formData.end_date && {
                      shouldDisableDate: disableFuturDates,
                    })}
                />
              </LocalizationProvider>
              {formData.start_date &&
                formData.end_date &&
                formData.start_date === formData.end_date && (
                  <div className="text-red">
                    Please select different dates for start and end.
                  </div>
                )}
            </Grid>
          ))}

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
              value={selectedOptionOfDelegatedCollegueName || null}
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
          <Grid item xs={12}>
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
        </Grid>

        <div className="mt-6">
          <Button
            fontSize="bold"
            textColor="white"
            btnText="SUBMIT"
            width="full"
           padding={'p-3'}
            type="submit"
           backgroundColor ={'bg-blue-light'}
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default Leave_Application;
