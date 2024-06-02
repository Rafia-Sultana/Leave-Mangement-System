import React, { useContext, useEffect, useState } from "react";
import CommonTable from "../components/CommonTable";
import Button from "../components/Button";
import AddIcon from "@mui/icons-material/Add";
import HolidayModal from "../components/HolidayModal";
import HeadLine from "../components/HeadLine";
import employee from "../services/employee";
import { UserContext } from "../context api/Context";


const ManageHoliday = () => {
  const {holidayList,setHolidayList } = useContext(UserContext);
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
      setHolidayList(getOfficeHolidays);
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
          textColor={"white"}
          btnText={"Add Holiday"}
          backgroundColor={"bg-[#add5f4]"}
          padding={"p-2"}
          btnIcon={AddIcon}
          onClick={handleOpen}
          fontSize={"sm"}
        ></Button>
      </div>
      <CommonTable rows={holidayList} columns={columns} viewDetails={viewDetails} maxHeight={650} />
      {open && (
        <HolidayModal open={open} close={handleClose} row={row}></HolidayModal>
      )}
    </div>
  );
};

export default ManageHoliday;
