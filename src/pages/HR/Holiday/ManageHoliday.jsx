import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import CommonTable from "../../../components/CommonTable";
import Button from "../../../components/Button";
import HolidayModal from "../../../components/HolidayModal";
import HeadLine from "../../../components/HeadLine";
import employee from "../../../services/employee";



const ManageHoliday = () => {

  const [holidayList,setHolidayList] = useState([]);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState({});

  const handleOpen = () => {
    setRow({});
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRow({});
  };

  useEffect(() => {
    const fetchData = async () => {
      const getOfficeHolidays = await employee.getOfficeHolidayList();
      const updateHolidays =getOfficeHolidays.map(x=>({...x,status:'holiday'}))
      setHolidayList(updateHolidays);
 };
    fetchData();
  }, []);


  const columns = [
    { id: "name", label: "Title", minWidth: 10 },
    { id: "start_date", label: "Start Date", minWidth: 10 },
    { id: "end_date", label: "End Date", minWidth: 10 },
    { id: "duration", label: "Duration", minWidth: 10 },
    { id: "action", label: "Action", minWidth: 10, align: "center" },
  ];

  const viewDetails = (index) => {
    setRow(holidayList[index]);
    setOpen(true);
  };

  return (
    <div>
      <div className="col-span-3 flex justify-between gap-2 my-5">
        <HeadLine text={"Holiday"}></HeadLine>
        <Button
  
          // btnText={"Add Holiday"}
          backgroundColor={"bg-[#add5f4]"}
          padding={"p-2"}
          btnIcon={AddIcon}
          onClick={handleOpen}
          fontSize={"sm"}
        >Add Holiday</Button>
      </div>
      <CommonTable rows={holidayList} columns={columns} viewDetails={viewDetails}  />
      {open && (
        <HolidayModal open={open} close={handleClose} row={row}  setHolidayList={setHolidayList}></HolidayModal>
      )}
    </div>
  );
};

export default ManageHoliday;
