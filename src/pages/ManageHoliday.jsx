import React, { useEffect, useState } from 'react';
import CommonTable from '../components/CommonTable';
import Button from '../components/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import HolidayModal from '../components/HolidayModal';
import HeadLine from '../components/HeadLine';
import employee from '../services/employee';


function createData(title, holidayDate, day, action) {
  return { title, holidayDate, day, action };
}
const ManageHoliday = () => {
  const [open,setOpen]= useState(false);

  // const [officeHolidayEvents,setOfficeHolidayEvents] = useState([])
  const [rows,setRows] = useState([]);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    const fetchData = async () =>{
      const getOfficeHolidays = await employee.getOfficeHoliday();
      // const {leave_name,date}=getOfficeHolidays;
      // let data =  getOfficeHolidays.map((x)=>   createData({x.leave_name,x.date}))  
      // console.log(data);
     setRows(getOfficeHolidays);
    }
    fetchData()
  },[])


      
      // let rows = [
      //   createData("New Year", "1 Jan 2019", "Sunday", ""),
      //   createData("Good Friday", "14 Apr 2019", "Friday", ""),
      //   createData("May Day", "1 May 2019", "Monday", ""),
      //   createData("Memorial Day", "28 May 2019", "Monday", ""),
      //   createData("Ramzon", "26 Jun 2019", "Monday", ""),
      // ];
      const columns = [
        // { id: "check", label:'', minWidth: 10 },
        { id: "leave_name", label: "Title", minWidth: 10 },
        { id: "date", label: "date", minWidth: 10 },
        { id: "day", label: "Day", minWidth: 10 },
        { id: "action", label: "Action", minWidth: 10, align: "center" },
      ];
   
      const dateString = '2024-05-05';

// Create a new Date object with the given date string
const date = new Date(dateString);

// Use the getDay() method to get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
const dayOfWeek = date.getDay();

// Use an array to map the day of the week index to the day name
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get the day name from the array using the day of the week index
const dayName = daysOfWeek[dayOfWeek];

console.log(dayName); // Output: "Friday"

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