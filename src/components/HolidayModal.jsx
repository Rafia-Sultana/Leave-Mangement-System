import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DateInput from "./InputFields/DateInput";
import TextInput from "./InputFields/TextInput";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import Button from "./Button";
import employee from "../services/employee";
import { UserContext } from "../context api/Context";
import ShowSnackbar from "./ShowSnackbar";
import { useState, useEffect } from "react";
import  { convertToIsoString } from "../utils/FormateDate";
import dayjs from "dayjs";

const HolidayModal = ({ open, close, row }) => {


  const { openSnackBar, handleSnackBarClose, setOpenSnackbar,setHolidayList } =
    React.useContext(UserContext);
   const initialState = {
    start_date: row?.start_date ? dayjs(row?.start_date) : null,
    end_date: row?.end_date ? dayjs(row?.end_date) : null,
    name: row?.name || "",
  };

  const [addHolidayForm, setHolidayForm] = useState(initialState);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    maxHeight: 500,
    height: "35%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const handleDateChange = (date, label) => {
    setHolidayForm((prevState) => ({
      ...prevState,
      [label]: date,
    }));
  };
  const getHoildayName = (e) => {
    setHolidayForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const disablePreviousDates = (date) => {
    if (addHolidayForm.end_date) {
      return new Date(addHolidayForm.end_date) < new Date(date.$d);
    }
  };
  const disableFutureDates = (date) => {
    if (addHolidayForm.start_date) {
      return new Date(addHolidayForm.start_date) > new Date(date.$d);
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let holidayId = row.id;
    let result;
    const updateHolidayForm = {
      name: addHolidayForm.name,
      start_date: convertToIsoString(addHolidayForm?.start_date, "9:00 AM"),
      end_date: convertToIsoString(addHolidayForm?.end_date, "9:00 AM"),
    };

    if (Object.keys(row).length !== 0) {
    result = await employee.putOfficeHoliday(holidayId, updateHolidayForm);
   
    } else {
    result = await employee.officeHoliday(updateHolidayForm);
  
  }
    if ((result == "Success" )) {
      setOpenSnackbar(true);
      
        setHolidayForm({
    start_date:null,
    end_date:null,
    name:""
  });
    const getOfficeHolidays = await employee.getOfficeHolidayList();
      setHolidayList(getOfficeHolidays);
   
    }

  };

  return (
    <div className="">
      {
        <ShowSnackbar
          open={openSnackBar}
          handleClose={handleSnackBarClose}
          text={"Holiday Added SuccessFully"}
          duration={1000}
        />
      }

      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="absolute right-7 top-2 ">
            <Button btnIcon={CloseIcon} onClick={close} textColor={"red"} />
          </div>
          <form action="" onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <DateInput
                  label={"start_date"}
                  handleDateChange={handleDateChange}
                 value={(addHolidayForm?.start_date)}
                  disableDates={disablePreviousDates}
                  required={false}
                />
              </Grid>
              <Grid item xs={6}>
                <DateInput
                  label={"end_date"}
                  handleDateChange={handleDateChange}
                value={(addHolidayForm?.end_date)}
                  disableDates={disableFutureDates}
                  required={false}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  label={"Name of Holiday"}
                  required={false}
                  name="name"
                  onchange={getHoildayName}
                  value={addHolidayForm?.name}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  btnText={"SUBMIT"}
                  type={"submit"}
                  backgroundColor={"bg-[#6AB2EB]"}
                  textColor={"white"}
                  padding={"p-3"}
                  fontSize={"sm"}
                  width={"full"}
                  //  onClick={handleFormSubmit}
                  cursor={"cursor-pointer"}
                  //  disable={hasSubmit?false:true}
                ></Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default HolidayModal;
