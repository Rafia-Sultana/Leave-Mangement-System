import React, { useContext, useEffect, useState, useRef } from "react";
import Button from "../components/Button.jsx";
import InputField from "../components/InputField.jsx";
import Label from "../components/Label.jsx";
import { MyContext } from "../context api/Context";
import Spinner from "../components/Spinner.jsx";
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
const Leave_Application = () => {
  // const { allFormData, setAllFormData } = useContext(MyContext);

  // const initialState = {
  //   leaveType: "",
  //   from: "",
  //   to: "",
  //   numberOfDays: "",
  //   join: "",
  //   file: null,
  //   reasonsForLeave: "",
  //   delegetedFor: "",
  // };
  // const [formData, setFormData] = useState(initialState);
  // const [loading,setLoading]= useState(false);
  // const [totalDays,setTotalDays]= useState(null);

  // const currentIdRef = useRef(1);
  // const handleChange = (event) => {
  //   const { name, value, type, files } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === "file" ? console.log(files[0]) : value,
  //   }));
  // };
  const handleSubmit = (event) => {
    // event.preventDefault();
    // const currentFormData = { ...formData, id: currentIdRef.current };
    // setFormData(initialState);
    // setAllFormData((prevArray) => [...prevArray, currentFormData]);
    // currentIdRef.current += 1;
  };

  // useEffect(() => {

  // }, [allFormData]);
  // const {
  //   leaveType,
  //   from,

  //   to,
  //   numberOfDays,
  //   join,
  //   file,
  //   reasonsForLeave,
  //   delegetedFor,
  // } = formData;
  const handleDateChange = (date) => {
    console.log(date);
  };

  // useEffect(()=>{
  // if(from && to){
  //   setTotalDays((new Date(to)-new Date(from))/(1000 * 60 * 60 * 24));
  //   setLoading(false)
  //  }else{
  //  setLoading(!!from);
  //  }

  // },[from,to])

  const leaveTypes = [
    { label: "Vacation" },
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
         <Stack 
         direction={{xs:'column',sm:'row'}}
         spacing={{xs:1,sm:2}}
         >
 {/* <div className="grid grid-cols-1  md:grid-cols-3  gap-4 "> */}
            
            <Autocomplete
              disablePortal
              options={leaveTypes}
              renderInput={(params) => (
                <TextField {...params} label="Vacation" />
              )}
            />
         
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="From" onChange={handleDateChange} />
            </LocalizationProvider>
          
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="To" onChange={handleDateChange} />
            </LocalizationProvider>
     
        
           
            <TextField
              id=""
              label="Number of Days Applied"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id=""
              label="Date of Joining"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
      

        
       
          
            <TextField id="" label="In my absence my responsibilities will be delegated to my collegue" variant="outlined" />
    
         
     
       
    
          <TextField id="" label="Reasons for leave" variant="outlined" multiline rows={4} fullWidth/>
        {/* </div> */}
         </Stack>


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
