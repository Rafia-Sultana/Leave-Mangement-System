import CommonTable from "../components/CommonTable";
import { useEffect, useState, useMemo } from "react";
import SelectInput from "../components/InputFields/SelectInput";
import employee from "../services/employee";
import Modal from "../components/Modal";
import { Player } from "@lottiefiles/react-lottie-player";
import LottiePlayers from "../components/LottiePlayers";
import useMediaQuery from '@mui/material/useMediaQuery';
import HeadLine from "../components/HeadLine";



export const Employee_Leave_Request = () => {

  const [id, setId] = useState(0);
  const [rows, setRows] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [leaveTypesOptions,setLeaveTypesOption]= useState([]);  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isSmallScreen= useMediaQuery('(max-width:600px)');

  const handleClickOpen = (value) => {
    setId(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 const columns = [
    { id: "leave_name", label: "Leave Type", minWidth: 100 },
    { id: "application_date", label: "Applied Date", minWidth: 100 },
    { id: "start_date", label: "Start Date", minWidth: 170, align: "center" },
    { id: "end_date", label: "End Date", minWidth: 170, align: "center" },
    { id: "total_days", label: "Total Days", minWidth: 170, align: "center" },
    {
      id: "leave_status",
      label: "Leave Status",
      minWidth: 170,
      align: "center",
    },
    { id: "action", label: "Action", minWidth: 170, align: "center" },
  ];

  const smallScreenColumns = columns.filter(column => 
    column.id === "leave_name" || column.id === "leave_status" || column.id === "action"
  );

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;

  useEffect(() => {
    const fetchRequestHistory = async () => {
      const requestHistoryData = await employee.getEmployeeRequestHistory(
        userId
      );

       let leaveTypeData = await employee.getLeaveTypes();
       let leave_names = leaveTypeData.map((x)=>x.leave_name);
       setLeaveTypesOption(leave_names);
       setRows(requestHistoryData);
       setLoading(false);
    };
    if (userId) {
      fetchRequestHistory();
    }
  }, [userId]);

   const leaveStatusOptions = ["Pending", "Approved", "Rejected", "All" ];

   const filteredRows = useMemo(() => {
    let filtered = rows;

   if (selectedStatus !== "All") {
    filtered = filtered.filter((row) => row.leave_status === selectedStatus);
   }

  if (selectedType !== "All") {
    filtered = filtered.filter((row) => row.leave_name === selectedType);
  }
   return filtered;
 
  }, [rows, selectedStatus, selectedType]);

  const getSelectedStatus = (e) => {
   setSelectedStatus(e.target.value);
  };

  const getSelectedType = (e) => {
   setSelectedType(e.target.value);
  };


  const handleDelete = async (index) => {
    let selectedRow = rows[index];
    await employee.putLeaveApplicationWithDrwan(selectedRow.application_id);

    let updatedRows = [...rows];
    updatedRows[index]={
    ...selectedRow,leave_status:"Withdrawn"
   }
   setRows(updatedRows);

  }
  
  return (
    <div>
   
      <div className="flex  flex-col md:flex-row justify-between relative item-center">
        <HeadLine text={"Request History"}/>
        <div className="grid grid-cols-2   md:w-[50%] lg:w-[30%] lg:mt-5 mb-3 gap-5 ">
          <SelectInput
            options={leaveStatusOptions}
            placeholder="Filter by status"
            getSelectedValue={getSelectedStatus}
            variant="standard"
          
          />
          <SelectInput
            options={leaveTypesOptions}
            placeholder="Filter by type"
            getSelectedValue={getSelectedType}
            variant="standard"
          />
        </div>

      </div>
      {filteredRows.length >= 1 ? (
        <div className="">
          <CommonTable
            columns={isSmallScreen ? smallScreenColumns:columns}
            rows={filteredRows}
            viewDetails={handleClickOpen}
            handleDelete ={handleDelete}
             maxHeight={660}
          />
        </div>
      ) : loading ? (
        <div>
         
              <Player
        src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json"
        className="player"
        loop
        autoplay
        speed={5}
       style={{ height: "300px", width: "300px", marginTop: "100px" }}
      />
        </div>
      ) : (
        <>
  
          <LottiePlayers
            src="https://lottie.host/213f7823-b3fe-4df0-9b2b-f10f412b9519/jONQ1jwzN4.json"
           
          />
        </>
      )}
      {open && (
        <Modal open={open} handleClose={handleClose} historyData={rows[id]} />
      )}
    </div>
  );
};

