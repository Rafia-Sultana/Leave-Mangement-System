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
import Checkbox from '@mui/material/Checkbox';

const Leave_Application = () => {
const initialState = {
    leaveType: null,
    from: "",
    to: "",
    numberOfDays: "",
    join: "",
    file: null,
    reasonsForLeave: "",
    delegatedFor: "",
    dayOption:null,
    // halfDay:false
  };
  
  const [formData, setFormData] = useState(initialState);
  const { allFormData, setAllFormData } = useContext(MyContext);
  const [total_Days,setTotal_Days]=useState(null);
  const [loading,setLoading]= useState(null);
  const [selectedOption,setSelectedOption]= useState('fullDay');
  // const [checked,setChecked]= useState(false);



  const handleSubmit = (event) => {
    event.preventDefault();
    setAllFormData((prevArray) => [...prevArray, formData]);

  };

  const handleDateChange = (date, label) => {
    setFormData((prevState) => ({
      ...prevState,
      [label.toLowerCase()]: FormateDate(date && new Date(date.$d)),
    }));
  };

  const handleInputChange = (e, newValue) => {
    // console.log(newValue);
    console.log(selectedOption);
    const { name, value } = e.target;
    setFormData(
      { ...formData,
      [name]: value, 
      ...newValue,
      numberOfDays:total_Days,
      join: formData.to && getJoiningDate(formData.to),
      dayOption:selectedOption
    
    }
      
      );
  };




  
// const handleCheckChange =(event)=>{
//   setChecked(event.target.checked);
// }
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
  const disablePreviousDates = (date) => {
    return (
      new Date(formData.from) > new Date(FormateDate(date && new Date(date.$d)))
    );
  };
  const disableFuturDates = (date) => {
    return (
      new Date(formData.to) < new Date(FormateDate(date && new Date(date.$d)))
    );
  };

  useEffect(()=>{
if(formData.to && formData.from)
{let differences = (new Date(formData.to)- new Date(formData.from))/(1000 * 60 * 60 * 24);
// console.log(differences);
// console.log('object',new Date(formData.to).getDate()+1);
setTotal_Days(differences+1);
}},[formData.to && formData.from]);

const getJoiningDate = (toDate)=>{
  const currentToDate = new Date(toDate);
  const tomorrowToDate = new Date(currentToDate);
  return   FormateDate(new Date(tomorrowToDate.setDate(currentToDate.getDate()+1)));
}

// console.log(getJoiningDate('02-29-2024'));
console.log(formData);
// console.log(selectedOption);

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
                  <TextField {...params} label="Leave Type" />
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
                    {...(label === "To" &&
                      formData.from && { shouldDisableDate: disablePreviousDates })}
                    {...(label === "From" &&
                      formData.to && { shouldDisableDate: disableFuturDates })}
                  />
                </LocalizationProvider>
              </Grid>
            ))}


            {[
              { label: "Date of Joining", readOnly: true },
              { label: "Number of Days Applied", readOnly: true },
              // {
              //   label:
              //     "In my absence my responsibilities will be delegated to my colleague",
              //   name: "delegatedFor",
              //   readOnly: false,
              // },
            ].map((textFieldProps, index) => (
              <Grid item xs={12} lg={4} md={6} key={index}>
                <TextField
  id=""
  label={textFieldProps.label}
  InputProps={{ readOnly: textFieldProps.readOnly }}
  variant="outlined"
  fullWidth
  focused={textFieldProps.label === "Number of Days Applied" && formData.from && formData.to}
  value={textFieldProps.label === "Number of Days Applied" ? (total_Days !== null ? total_Days : '') : (formData.to && getJoiningDate(formData.to))}
/>

              </Grid>
            ))}




<Grid item xs={12} 
// style={{ display: 'flex', alignItems: 'center',gap:'7%' }} 

className={`${total_Days === 1 ? 'visible flex items-center gap-5' : 'hidden'}`}

>

{[
  { name: 'firstHalfDay', label: '1st Half' },
  { name: 'secondHalfDay', label: '2nd Half' },
  { name: 'fullDay', label: 'Full Day' }
].map((checkbox,index)=>(
  <div className="" key={index} style={{ display: 'flex', alignItems: 'center' }}>

<Checkbox
// required
InputProps={{'aria-label':'controlled'}}
onChange={(e)=>{
  if(e.target.checked){
    setSelectedOption(checkbox.name)
  }
}}
checked={selectedOption===checkbox.name}
defaultChecked={checkbox.name==='fullDay'}

/>
<p>{checkbox.label}</p>    
  </div>
))}
  </Grid>
   <Grid item xs={12} lg={4} md={6}>
                <TextField
                  id=""
                  label= "In my absence my responsibilities will be delegated to my colleague"
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                  name="delegatedFor"
                />
              </Grid>
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
