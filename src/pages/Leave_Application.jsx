import React, { useContext, useEffect, useState, useRef } from "react";
import Button from "../components/Button.jsx";
import InputField from "../components/InputField.jsx";
import Label from "../components/Label.jsx";
import { MyContext } from "../context api/Context";
import Spinner from "../components/Spinner.jsx";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import FormateDate from "../utils/FormateDate.js";
import dayjs from 'dayjs'; 
// import InputFields from "../components/InputFields/index.js";
const Leave_Application = () => {
  const { allFormData, setAllFormData } = useContext(MyContext);

  const initialState = {
    leaveType: null,
    from: "",
    to: "",
    numberOfDays: "",
    join: "",
    file: null,
    reasonsForLeave: "",
    delegatedFor: "",
  };
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);
    setAllFormData((prevArray) => [...prevArray, formData]);
    setFormData(initialState);
  };

  const handleDateChange = (date, label) => {
    setFormData((prevState) => ({
      ...prevState,
      [label.toLowerCase()]: FormateDate(date && new Date(date.$d)),
    }));
  };
  const handleInputChange = (e, newValue) => {
    // console.log(newValue,date);

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value, ...newValue });
  };
  const leaveTypes = [
    { label: "Sick Leave" },
    { label: "Maternity/Paternity Leave" },
    { label: "Parental Leave" },
    { label: "Bereavement Leave" },
    { label: "Personal Leave" },
    { label: "Study/Exam Leave" },
    { label: "Unpaid Leave" },
    { label: "Other" },
  ];

  return (
    <div>
      <div className="p-6 rounded-md shadow-md">
        <h2 className="text-2xl text-center font-semibold text-gray-darker underline decoration-2  decoration-green-dark underline-offset-8  mb-10">
          Leave Application Form
        </h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} md={6}>
              <Autocomplete
                disablePortal
                options={leaveTypes}
                renderInput={(params) => (
                  <TextField {...params} label="Vacation" />
                )}
                onChange={(e, newValue) => {
                  if (newValue) {
                    handleInputChange(e, { leaveType: newValue.label });
                  }
                }}
                isOptionEqualToValue={(option, value) => {
                  option.label === value.label;
                }}
              />
            </Grid>

            {["From", "To"].map((label, index) => (
              <Grid item xs={12} lg={4} md={6} key={index}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={label}
                    onChange={(date) => handleDateChange(date, label)}
                    sx={{ width: "100%" }}
                    minDate={label === 'To' && formData.from}

                  />
                </LocalizationProvider>
              </Grid>
            ))}

            {[
              { label: "Number of Days Applied", readOnly: true },
              { label: "Date of Joining", readOnly: true },
              {
                label:
                  "In my absence my responsibilities will be delegated to my colleague",
                name: "delegatedFor",
                readOnly: false,
              },
            ].map((textFieldProps, index) => (
              <Grid item xs={12} lg={4} md={6} key={index}>
                <TextField
                  id=""
                  label={textFieldProps.label}
                  InputProps={{ readOnly: textFieldProps.readOnly }}
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                  name={textFieldProps.name}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <TextField
                id=""
                label="Reasons for leave"
                name="reasonsForLeave"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          {/* <InputFields type/> */}
          <div className="mt-6">
            <Button
              fontSize="bold"
              textColor="green"
              btnText="SUBMIT"
              width="full"
              type="submit"
              bg="green"
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Leave_Application;
