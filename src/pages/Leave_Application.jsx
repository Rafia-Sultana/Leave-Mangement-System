import React, { useContext, useEffect, useState, useRef } from "react";
import Button from "../components/Button.jsx";
import InputField from "../components/InputField.jsx";
import Label from "../components/Label.jsx";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Spinner from "../components/Spinner.jsx";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import FormateDate from "../utils/FormateDate.js";
import Checkbox from "@mui/material/Checkbox";
import { department_list } from "../utils/Dummy_Data.js";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AutoComplete from "../components/InputFields/AutoComplete.jsx";
import InputAdornment from '@mui/material/InputAdornment';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SwitchInput from "../components/InputFields/SwitchInput.jsx";
import employee from "../services/employee.jsx";


const Leave_Application = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;

  const initialState = {
    emp_id:userId,
    leave_type_id: null,
    start_date: "",
    end_date: "",
    duration: "",
    joining_date: "",
    file: null,
    reason: "",
    delegated_to: null,
    // dayOption: null,
    application_date:''
  };

  const [formData, setFormData] = useState(initialState);
  const [total_Days, setTotal_Days] = useState(null);
  const [selectedOption, setSelectedOption] = useState("fullDay");
  const [leaveTypes, setLeaveTypes] = useState(null);
  const [teamMembersList, setTeamMembersList] = useState(null);


  


  const handleDateChange = (date, label) => {
    setFormData((prevState) => ({
      ...prevState,
      [label]: (date.$d).toISOString(),
   }));
};

  const disablePreviousDates = (date) => {
    return (
      new Date(formData.start_date) > new Date(FormateDate(date && new Date(date.$d)))
    );
  };
  const disableFuturDates = (date) => {
    return (
      new Date(formData.end_date) < new Date(FormateDate(date && new Date(date.$d)))
    );
  };

 

const getJoiningDate = (toDate) => {
    const currentToDate = new Date(toDate);
    const tomorrowToDate = new Date(currentToDate);
    return (
      new Date(tomorrowToDate.setDate(currentToDate.getDate() + 1)).toISOString()
    );
  };

const getTotalDays = () =>{
  if (formData.end_date && formData.start_date) {
    let differences =
    (new Date(formData.end_date) - new Date(formData.start_date)) /
    (1000 * 60 * 60 * 24);
    setTotal_Days(differences + 1)
    return (differences + 1)
  }

}

useEffect(()=>{
const fetchData = async()=>{
  let leaveTypeData = await employee.getLeaveTypes();
  let teamMembersList = await employee.getTeamMembersOfUser(userId);
  setTeamMembersList(teamMembersList);
  setLeaveTypes(leaveTypeData);
 }
fetchData();
},[])



const handleInputChange = (e, newValue, field) => {

  const { name, value } = e?.target ;
  // console.log(e.target);
  const updatedFields = {};

    switch (field) {
      case 'leave_type_id':
        updatedFields[field] = newValue.id !== undefined ? newValue.id : formData[field];
        break;
      case 'delegated_to':
        
        updatedFields[field] = newValue.emp_id !== undefined ? newValue.emp_id : formData[field];
        break;
      // Add more cases for additional dynamic fields if needed
      default:
       updatedFields[field] = formData[field];
        break;
    }


  setFormData(prevFormData => ({
    ...prevFormData,
    [name]: value,
    ...updatedFields
  }));
};



const handleSubmit = async (event) => {
  event.preventDefault();
  if (formData) {
    enqueueSnackbar("Submitted Succesfully!", { variant: "success" });

    setTimeout(() => {
      navigate("/dashboard/request-history");
    }, 500);
  } else {
    console.error("email does not exist");
  }


const result = await employee.postLeaveApplication(
  {...formData,   
   duration: getTotalDays(),
    joining_date: formData.end_date && getJoiningDate(formData.end_date),
    // dayOption: selectedOption,
    application_date: (new Date().toISOString())
  
  }
)
console.log(result);
};
useEffect(()=>{
  console.log({...formData,   
  duration: getTotalDays(),
  joining_date: formData.end_date && getJoiningDate(formData.end_date),
  // dayOption: selectedOption,
  application_date: (new Date().toISOString())

});
},[formData])







  return (
    <div>
      <div className="p-6 rounded-md shadow-md">
        <h2 className="text-2xl text-center font-semibold text-gray-darker underline decoration-2  decoration-green-dark underline-offset-8  mb-10">
          Leave Application Form
        </h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} md={6}>
              <AutoComplete
                options={leaveTypes}
                label={"Leave Type"}
                field={'leave_type_id'}
                handleInputChange={handleInputChange}
              />
            </Grid>

             {["start_date", "end_date"].map((label, index) => (
             <Grid item xs={12} lg={4} md={6} key={index}>
        
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={(label.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))}
                    onChange={(date) => handleDateChange(date, label)}
                    sx={{ width: "100%" }}
                    {...(label === "end_date" &&
                      formData.start_date && {
                        shouldDisableDate: disablePreviousDates,
                      })}
                    {...(label === "start_date" &&
                      formData.end_date && { shouldDisableDate: disableFuturDates })}
                  />
                </LocalizationProvider>
              </Grid>
            ))}

            {[
              { label: "Date of Joining", readOnly: true },
              { label: "Number of Days Applied", readOnly: true },
            ].map((textFieldProps, index) => (
              <Grid item xs={12} lg={4} md={6} key={index}>
                <TextField
                  id=""
                  label={textFieldProps.label}
                  InputProps={{ readOnly: textFieldProps.readOnly }}
                  variant="outlined"
                  fullWidth
                  focused={
                    textFieldProps.label === "Number of Days Applied" &&
                    formData.start_date &&
                    formData.end_date
                  }
                  value={
                    textFieldProps.label === "Number of Days Applied"
                      ? total_Days !== null
                        ? total_Days
                        : ""
                      : formData.end_date && FormateDate(new Date(getJoiningDate(formData.end_date)))
                  }
                />
              </Grid>
            ))}

            <Grid
              item
              xs={12}
              className={`${
                total_Days === 1 ? "visible flex items-center gap-5" : "hidden"
              }`}
            >
              {[
                { name: "firstHalfDay", label: "1st Half" },
                { name: "secondHalfDay", label: "2nd Half" },
                { name: "fullDay", label: "Full Day" },
              ].map((checkbox, index) => (
                <div
                  className=""
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    // required
                    InputProps={{ "aria-label": "controlled" }}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOption(checkbox.name);
                      }
                    }}
                    checked={selectedOption === checkbox.name}
                    defaultChecked={checkbox.name === "fullDay"}
                  />
                  <p>{checkbox.label}</p>
                </div>
              ))}
            </Grid>
            <Grid item xs={12} lg={4} md={6}>
              <AutoComplete
                options={teamMembersList}
                label={
                  "Delegated to my colleague"
                }
                field={'delegated_to'}
                handleInputChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
  id=""
  label="Reasons for leave"
  name="reason"
  variant="outlined"
  multiline
  rows={4}
  value={formData.reason}
  fullWidth
  onChange={(e) => {
    if (e.target.name) {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }}
/>
              
            </Grid>
            <Grid item xs={12}>

              {/* <TextField type="file"  variant="outlined" /> */}
              <TextField
      type="file"
      variant="outlined"
     
      InputProps={{
        startAdornment: (
          <InputAdornment position="start"  >
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
