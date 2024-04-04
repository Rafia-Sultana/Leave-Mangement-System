import CommonTable from "../components/CommonTable";

import { useEffect, useState } from "react";

import Button from "../components/Button";
import TextInput from "../components/InputFields/TextInput";
import employee from "../services/employee";
import Modal from "../components/Modal";
import RadioInput from "../components/InputFields/RadioInput";
import { Employee_Leave_Request } from "./Employee_Data";
import useMediaQuery from '@mui/material/useMediaQuery';
import LottiePlayers from "../components/LottiePlayers";

export const Manager_Leave_History = () => {
 
  return (
    <div>
   <Employee_Leave_Request/>
    </div>
  );
};
export const Manager_Team_Leave_Info = () => {
 

  const [id, setId] = useState(0);
  const [empId, setEmpId] = useState(0);
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [open, setOpen] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleClickOpen = (value) => {
    setId(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const columns = [

    { id: "employee_name", label: "Name", minWidth: 170 },
    { id: "employee_designation", label: "Designation ", minWidth: 170 },
  { id: "total_leave_days", label: "Total Days", minWidth: 170 },

    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];
  const columns2 =  [
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
  const handleViewDetails = async (index,emp_id) => {
    setEmpId(emp_id);
    const teammembersLeaveInfos = await employee.getEmployeeRequestHistory(emp_id);
    setRows2(teammembersLeaveInfos);

  };
  
  const handleGoBack = () => {
    setEmpId(0);
  };

  useEffect(()=>{
    const fetchDataOfTeamLeave = async ()=>{
 const teamMembersDetails = await employee.getLeaveHistroryOfTeam();

setRows(teamMembersDetails)
    }
    fetchDataOfTeamLeave();
  },[])

  const smallScreenColumns = columns2.filter(column => 
    column.id === "leave_name" || column.id === "leave_status" || column.id === "action"
  );

  return (
    <div>
   <h2
        className="text-2xl text-center font-semibold text-gray-darker
       underline decoration-2 decoration-blue-dark 
       underline-offset-8 mt-5"
      >
       Team Leave History
      </h2>
      {

        rows.length ===0 ?
     
      <LottiePlayers
            src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json"
        
          />:
        empId===0?
        <CommonTable
            columns={columns}
            rows={rows}
            viewDetails={handleViewDetails}
          />
          :
          <>
          <Button btnText={'Go Back'} textColor={'blue'} onClick={handleGoBack} ></Button>
            <CommonTable
            columns={isSmallScreen? smallScreenColumns: columns2}
            rows={rows2}
            viewDetails={handleClickOpen}
          />
             {open && (
        <Modal open={open} handleClose={handleClose} historyData={rows2[id]} />
      )}
          </>
      }
    </div>
  );
};

export const Manager_Leave_Request = () => {
  const [id, setId] = useState(0);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);


//  console.log(rows);

  const columns = [
   
    
    { id: "employee_name", label: "Name", minWidth: 100 },
   { id: "delegated_to", label: "Delegated To", minWidth: 100 },
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
const isSmallScreen = useMediaQuery('(max-width:600px)');
const smallScreenColumns = columns.filter(column => 
  column.id === "employee_name" || column.id === "leave_status" || column.id === "action"
);
  return <div>
     <h2
        className="text-2xl text-center font-semibold text-gray-darker
       underline decoration-2 decoration-blue-dark 
       underline-offset-8 mt-5 mb-1"
      >
      Team's Request History
      </h2>
      {
        rows.length === 0?
        <LottiePlayers
        src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json"
     
      />:
<CommonTable columns={isSmallScreen?smallScreenColumns:columns} rows={rows} 
viewDetails={handleClickOpen}/>
      }

 {open && (
        <Modal open={open} 
        handleClose={handleClose} 
        historyData={rows[id]} />
      )}
      
  </div>;
};


export const Manager_Leave_Approval = ({applicationId}) => {
  
  const [selectedValue, setSelectedValue] = useState('Pending');
  const [comments,setComments]= useState(null);
  const [logData, setLogData]= useState({});
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
    const role = userInfoData.role;
  

  const handleChange = (event) => {
  setSelectedValue(event.target.value);
  };
  const handleCommentSection =(event)=>{
    setComments(event.target.value);
  }


    const deciosnByTeamLead = {
      application_id:applicationId,
      leave_status:selectedValue,
      comments:comments,
      // sent_by: role,
      sent_to: selectedValue === 'Approved'? 'HR':'Applicant',
      processing_time:new Date().toISOString(),
  }
//  console.log(postByTeamLead);

const handleSubmit = async () =>{
  const result = await employee.postDecisionByTeamLead(deciosnByTeamLead);
  // if(result){
  //   setLogTable((prev)=> [...prev,deciosnByTeamLead])
  // }
  // console.log(result);
}


  return (
    <div
 className="flex flex-col space-y-4"
     >

     <div
     className="flex flex-col md:flex-row "
      >

      <RadioInput label="Pending"  value={"Pending"}  color={"warning"}
       onchange={handleChange}  selectedValue={selectedValue}/>
            <RadioInput label="Approved" value={"Approved"} color={"success"}
     onchange={handleChange}  selectedValue={selectedValue}/>
      <RadioInput label="Rejected" value={"Rejected"} color={"error"}
        onchange={handleChange}  selectedValue={selectedValue} />
     </div>

     
      {/* <TextField
          id="outlined-multiline-static"
      multiline
          rows={4}
          fullWidth
          placeholder="Add comment ..."/> */}
          <TextInput
           rows={4}
           multiline={true}
           onchange={handleCommentSection}
             placeholder="Add comment ..."
          />
           <Button
              fontSize="semibold"
              textColor="white"
              btnText="SUBMIT"
              width="full"
              type="submit"
              backgroundColor="bg-green"
              padding={'p-3'}
              onClick={handleSubmit}
            ></Button>
    </div>
  );
};
