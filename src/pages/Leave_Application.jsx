import React, {  useEffect, useState} from "react";
import Button from "../components/Button.jsx";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormateDate from "../utils/FormateDate.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import AutoComplete from "../components/InputFields/AutoComplete.jsx";
import InputAdornment from '@mui/material/InputAdornment';
import employee from "../services/employee.jsx";
import dayjs from "dayjs";


const Leave_Application = () => {
  const {state} = useLocation();


  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;

  const initialState = {
    emp_id: userId,
    leave_type_id: state?.leave_type_id || null,
    leave_name: state?.leave_name || null,
    start_date: state?.start_date || "",
    end_date: state?.end_date || "",
    duration: "",
    joining_date: "",
    file: null,
    reason: state?.reason || "",
    delegated_to: null,
    application_date: "",
  };
  

  const [formData, setFormData] = useState(initialState);
  const [total_Days, setTotal_Days] = useState(null);
  const [selectedOption, setSelectedOption] = useState("fullDay");
  const [leaveTypes, setLeaveTypes] = useState(null);
  const [teamMembersList, setTeamMembersList] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);



  


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
    setTotal_Days(Math.abs(differences))
    return (Math.abs(differences ))
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
console.log(newValue);
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



const handleFileUpload = (e) =>{
const file = e.target.files[0];
setSelectedFiles(file);
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const result = await employee.postLeaveApplication(
    {...formData,   
     duration: getTotalDays(),
      joining_date: formData.end_date && getJoiningDate(formData.end_date),
      // dayOption: selectedOption,
      application_date: (new Date().toISOString())
    
    }
    
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


console.log(formData);

useEffect(()=>{


},[formData,selectedFiles])







  return (
   
      <div className="p-10 rounded-md shadow-xl">
        <h2 className="text-2xl text-center font-semibold text-gray-darker
         underline decoration-2  decoration-blue-dark underline-offset-8  mb-16">
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
          // value={state?.leave_name}
              />
            </Grid>

             {["start_date", "end_date"].map((label, index) => (
             <Grid item xs={12} lg={4} md={6} key={index}>
        
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label={(label.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))}
                    onChange={(date) => handleDateChange(date, label)}
                    sx={{ width: "100%" }}
                  //  value={formData[label]}
                    minTime={dayjs().set('hour', 12)}
                    maxTime={dayjs().set('hour', 12)}
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

            {/* <Grid
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
            </Grid> */}
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
      multiple
     onChange={handleFileUpload}
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
              p={3}
              type="submit"
              bg="green"
            ></Button>
          </div>
        </form>
      </div>

  );
};

export default Leave_Application;
