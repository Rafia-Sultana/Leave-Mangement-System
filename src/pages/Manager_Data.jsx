import CommonTable from "../components/CommonTable";
import { manager_leave_data } from "../utils/Dummy_Data";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "../components/Button";
import {employee_data} from "../utils/Dummy_Data";
import Leave_Details from "./Leave_Details";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import employee from "../services/employee";
import Modal from "../components/Modal";
import RadioInput from "../components/InputFields/RadioInput";


export const Manager_Leave_History = () => {
  const { my } = manager_leave_data;

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
      //   format: (value) => value.toFixed(0),
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
  const rows = my.leave_details.map(
    ({ leaveType, from, to, total, status }) => ({
      leaveType,
      from,
      to,
      total,
      status,
    })
  );

  return (
    <div>
      <p>hello Manager_Leave_History</p>
      <CommonTable columns={columns} rows={rows} />
    </div>
  );
};
export const Manager_Team_Leave_Info = () => {
  const [id, setId] = useState(0);
  const { team } = manager_leave_data;

  const columns = [
    // { id: "emp_id", label: "Serial No.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "position", label: "Position", minWidth: 170 },
  { id: "total_days", label: "Total Days", minWidth: 170 },

    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];
  const columns2 = [
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
    // {
    //   id: "delegatedFor",
    //   label: "Delegated For",
    //   minWidth: 170,
    //   align: "right",
    // },
    // {
    //   id: "reasonsForLeave",
    //   label: "Reasons For Leave",
    //   minWidth: 170,
    //   align: "right",
    // },
    // {
    //   id: "application_Date",
    //   label: "Application Date",
    //   minWidth: 170,
    //   align: "right",
    // },
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
  const handleViewDetails = (id) => {
    setId(id);
  };
  const handleGoBack = () => {
    setId(0);
  };
  const extractBasicDetails = (team) => {
    return team.map((employee) => {
      let emp_id = employee.emp_id;
      const { name, position, department } = employee.details;
      return { emp_id, name, position, department };
    });
  };
  return (
    <div>
      <p>hello Manager_Team_Leave_History</p>

      {id === 0 ? (
        <CommonTable
          columns={columns}
          rows={extractBasicDetails(team)}
          viewDetails={handleViewDetails}
        />
      ) : (
        <>
          <button
            onClick={handleGoBack}
            className="text-blue font-bold text-lg"
          >
            Go back
          </button>
          <CommonTable
            columns={columns2}
            rows={team.find((emp) => emp.emp_id === id)?.leave_details ?? []}
          />
          {/* <Manager_Leave_Approval /> */}
        </>
      )}
    </div>
  );
};

export const Manager_Leave_Request = () => {
  const [id, setId] = useState(0);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  // const [empId, setempId] = useState(null);

  const columns = [
   
    
    { id: "employee_name", label: "Name", minWidth: 100 },
    { id: "employee_designation", label: "Designation", minWidth: 100 },
    { id: "leave_type", label: "Leave Type", minWidth: 100 },
    {
      id: "start_date",
      label: "Start Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "end_date",
      label: "End Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "total_days",
      label: "Total Days",
      minWidth: 170,
      align: "right",
    },
    {
      id: "leave_status",
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
  const columns2 = [
    { id: "sender", label: "Sender", minWidth: 100 },
    {
      id: "date",
      label: "Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "right",
    },
    {
      id: "comments",
      label: "Comments",
      minWidth: 170,
      align: "right",
    },
    // {
    //   id: "action",
    //   label: "Action",
    //   minWidth: 170,
    //   align: "center",
    // }
  ];

const handleClickOpen = (value) => {
  setId(value);
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};

useEffect(()=>{
const fetchData = async ()=>{
 const LeaveRequstData = await employee.getLeaveRequestOfTeamByTeamLead();
 setRows(LeaveRequstData);
}
fetchData();
},[])
  return <div>

<CommonTable columns={columns} rows={rows} viewDetails={handleClickOpen}/>
 {open && (
        <Modal open={open} handleClose={handleClose} historyData={rows[id]} />
      )}
      
  </div>;
};


export const Manager_Leave_Approval = () => {
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

 
  return (
    <div className="">
{/* 
     
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      /> */}
     <div className="flex flex-col md:flex-row">
     <RadioInput label="Approved" onchange={handleChange} setSelectedValue={setSelectedValue} selectedValue={selectedValue}/>
      <RadioInput label="Request More Information" onchange={handleChange} setSelectedValue={setSelectedValue} selectedValue={selectedValue}/>
      <RadioInput label="Rejected"  onchange={handleChange} setSelectedValue={setSelectedValue} selectedValue={selectedValue} />
     </div>

     
      <TextField
          id="outlined-multiline-static"
      multiline
          rows={4}
          fullWidth
          placeholder="Add comment ..."/>
           <Button
              fontSize="bold"
              textColor="black"
              btnText="SUBMIT"
              width="full"
              type="submit"
              bg="blue-dark"
              p={3}
            ></Button>
    </div>
  );
};
