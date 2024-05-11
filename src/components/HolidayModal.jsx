import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DateInput from "./InputFields/DateInput";
import TextInput from "./InputFields/TextInput";
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";
import Button from "./Button";
import employee from "../services/employee";

const HolidayModal = ({ open, close }) => {
  const initialState = {
   Start:null,
   End:null,
   name:''
  };
  const [addHoildayForm, setHolidayForm]= React.useState(initialState);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:"80%",
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
   maxHeight:500,
   height:"35%",
   display: "flex",
    justifyContent: "center", 
    alignItems: "center", 
   
  };
  const handleDateChange = (date, label) => {
    setHolidayForm((prevState) => ({
      ...prevState,
      [label]: date.toISOString()
    }));
  };
  const getHoildayName = (e) => {
  setHolidayForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    
  }
//  console.log(addHoildayForm);
 const handleFormSubmit = async() =>{
await employee.officeHoliday(addHoildayForm);
 }
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <div className="absolute right-7 top-2 ">
            <Button
              btnIcon={CloseIcon}
              onClick={close}
              textColor={"red"}
            />
          </div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <DateInput
              label={"Start"}
              handleDateChange={handleDateChange}
            />
              </Grid>
          <Grid item xs={6}>
            <DateInput
              label={"End"}
              handleDateChange={handleDateChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              label={"Name of Holiday"}
              required={true}
              name="name"
              onchange={getHoildayName}
            />
          </Grid>


          <Grid item xs={12}>
          <Button
         btnText={'SUBMIT'}
         type={'submit'}
         backgroundColor={'bg-[#6AB2EB]'}
         textColor={'white'}
         padding={'p-3'}
         fontSize={'sm'}
         width={'full'}
         onClick={handleFormSubmit}
         ></Button>
  
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default HolidayModal;
