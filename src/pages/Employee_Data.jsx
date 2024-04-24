import CommonTable from "../components/CommonTable";
import { useEffect, useState, useMemo } from "react";
import { employee_data } from "../utils/Dummy_Data";
import Leave_Details from "./Leave_Details";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SelectInput from "../components/InputFields/SelectInput";
import employee from "../services/employee";
import CheckBoxInput from "../components/InputFields/CheckBoxInput";
import Modal from "../components/Modal";
import { Player } from "@lottiefiles/react-lottie-player";
import LottiePlayers from "../components/LottiePlayers";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from "react-router-dom";
import HeadLine from "../components/HeadLine";



export const Employee_Leave_Request = () => {
  const  {state}  = useLocation();
  // console.log(state);
  const [id, setId] = useState(0);

  const [rows, setRows] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  // const [showAll, setShowAll] = useState(false);
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
      // console.log(requestHistoryData);
      setRows(requestHistoryData);
      setLoading(false);
    };
    if (userId) {
      fetchRequestHistory();
    }
  }, [userId]);

  const leaveStatusOptions = ["Pending",
   "Approved", "Rejected",
 "All"
  
  ];
  const leaveTypesOptions = [
    "Sick Leave",
    "Annual Leave",
    "Paternity Leave",
    "Maternity Leave",
    "Unpaid Leave",
    "All"
  ];

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

  // const handleShowAll = (e) => {
  //   setShowAll(e.target.checked);
  // };

  const handleDelete =(index)=>{
    console.log('handle deltr',index);
  const updateRows =rows;
  rows[index].leave_status = "Withdraw" ;
  setRows(updateRows);
   }
  return (
    <div className="">
   
<HeadLine text={"Request History"}/>
      <div className="flex  flex-col md:flex-row justify-between relative">
        <div className="grid grid-cols-2 w-[100%] md:w-[50%]  gap-5 mb-3">
          <SelectInput
            options={leaveStatusOptions}
            placeholder="Filter by status"
            getSelectedValue={getSelectedStatus}
          />
          <SelectInput
            options={leaveTypesOptions}
            placeholder="Filter by type"
            getSelectedValue={getSelectedType}
          />
        </div>
        {/* <div className="flex  items-center md:absolute top-8 right-0">
          <CheckBoxInput onchange={handleShowAll}></CheckBoxInput>
          <label>Show All</label>
        </div> */}
      </div>
      {filteredRows.length >= 1 ? (
        <div className="">
          <CommonTable
            columns={isSmallScreen ? smallScreenColumns:columns}
            rows={filteredRows}
            viewDetails={handleClickOpen}
            handleDelete ={handleDelete}
            maxHeight={560}
          />
        </div>
      ) : loading ? (
        <div>
          {/* for  loading purpose */}
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
          {/* for no data found purpose */}
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

export const Employee_Leave_History = () => {
  const [id, setId] = useState(0);

  const columns = [
    { id: "leaveType", label: "Leave Type", minWidth: 100 },
    {
      id: "from",
      label: "Start Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "to",
      label: "End Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "total",
      label: "Total Days",
      minWidth: 170,
      align: "right",
    },
    {
      id: "status",
      label: "Leave Status",
      minWidth: 170,
      align: "right",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];

  const rows = employee_data.leave_details;
  const handleViewDetails = (id) => {
    setId(id);
  };
  const handleGoBack = () => {
    setId(0);
  };

  //filter
  const leaveStatusOptions = ["pending", "approved", "rejected"];
  const leaveTypesOptions = [
    "Sick Leave",
    "Maternity/Paternity Leave",
    "Parental Leave",
    "Bereavement Leave",
    "Personal Leave",
    "Study/Exam Leave",
    "Unpaid Leave",
    "Other",
  ];
  const getSelectedStatus = (selected) => {
    // console.log(selected);
  };
  const getSelectedType = (selected) => {
    // console.log(selected);
  };
  return (
    <div>
      {id === 0 ? (
        <>
          <h2 className="text-2xl text-center font-semibold text-gray-darker underline decoration-2  decoration-green-dark underline-offset-8 mt-5 mb-2">
            Employee Leave History
          </h2>

          <CommonTable
            columns={columns}
            rows={rows}
            viewDetails={handleViewDetails}
          />
        </>
      ) : (
        <>
          <button
            onClick={handleGoBack}
            className="text-blue font-bold text-lg mt-5 mb-3"
          >
            <KeyboardBackspaceIcon />
          </button>

          <Leave_Details
            info={rows.find((emp_leave) => emp_leave.leave_id === id)}
          />
        </>
      )}
    </div>
  );
};
