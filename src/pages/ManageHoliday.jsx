import React, { useState } from 'react';
import CommonTable from '../components/CommonTable';
import Button from '../components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import HolidayModal from '../components/HolidayModal';
import HeadLine from '../components/HeadLine';


const ManageHoliday = () => {

  const [open,setOpen]= useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    function createData(title, holidayDate, day, action) {
        return { title, holidayDate, day, action };
      }
      
      let rows = [
        createData("New Year", "1 Jan 2019", "Sunday", ""),
        createData("Good Friday", "14 Apr 2019", "Friday", ""),
        createData("May Day", "1 May 2019", "Monday", ""),
        createData("Memorial Day", "28 May 2019", "Monday", ""),
        createData("Ramzon", "26 Jun 2019", "Monday", ""),
      ];
      const columns = [
        // { id: "check", label:'', minWidth: 10 },
        { id: "title", label: "Title", minWidth: 10 },
        { id: "holidayDate", label: "Holiday Date", minWidth: 10 },
        { id: "day", label: "Day", minWidth: 10 },
        { id: "action", label: "Action", minWidth: 10, align: "center" },
      ];
   
      
    return (
        <div>
          
                <div className="col-span-3 flex justify-between gap-2 my-5">
                <HeadLine text={'Holiday'}></HeadLine>
          <Button
            textColor={"white"}
            btnText={"Add Holiday"}
      
            backgroundColor={"bg-[#add5f4]"}
            padding={"p-2"}
            btnIcon={AddIcon}
            onClick={handleOpen}
            fontSize={'sm'}
          ></Button>


        </div>
            <CommonTable  rows={rows} columns={columns} 
            
            />
            {open && <HolidayModal open={open} close={handleClose}></HolidayModal>}
        </div>
    );
};

export default ManageHoliday;