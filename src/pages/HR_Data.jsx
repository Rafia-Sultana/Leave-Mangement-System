import React from 'react';
import { HR_leave_data } from "../utils/Dummy_Data";
import CommonTable from '../components/CommonTable';
import { Manager_Leave_Approval } from './Manager_Data';

import { Manager_Team_Leave_Info } from './Manager_Data';

import { employee_data } from "../utils/Dummy_Data";
import Leave_Details from "./Leave_Details";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";


import { useEffect, useState } from "react";

import Button from "../components/Button";
import TextInput from "../components/InputFields/TextInput";
import employee from "../services/employee";
import Modal from "../components/Modal";
import RadioInput from "../components/InputFields/RadioInput";
import { Employee_Leave_Request } from "./Employee_Data";
import useMediaQuery from '@mui/material/useMediaQuery';
import LottiePlayers from "../components/LottiePlayers";


export const HR_Leave_History = () => {
    // const { my } = HR_leave_data;
  
    // const columns = [
    //   { id: "leaveType", label: "Leave Type", minWidth: 100 },
    //   {
    //     id: "from",
    //     label: "Start Date",
    //     minWidth: 170,
    //     align: "right",
    //   },
    //   {
    //     id: "to",
    //     label: "End Date",
    //     minWidth: 170,
    //     align: "right",
    //   },
    //   {
    //     id: "total",
    //     label: "Total Days",
    //     minWidth: 170,
    //     align: "right",
    //     //   format: (value) => value.toFixed(0),
    //   },
    //   {
    //     id: "status",
    //     label: "Leave Status",
    //     minWidth: 170,
    //     align: "right",
    //   },
    //   {
    //     id: "action",
    //     label: "Action",
    //     minWidth: 170,
    //     align: "center",
    //   },
    // ];
    // const rows = my.leave_details.map(
    //   ({ leaveType, from, to, total, status }) => ({
    //     leaveType,
    //     from,
    //     to,
    //     total,
    //     status,
    //   })
    // );
  
    return (
      <div>
        {/* <p>hello HR_Leave_History</p> */}
        {/* <CommonTable columns={columns} rows={rows} /> */}
        <Employee_Leave_Request/>
      </div>
    );
  };
  
  export const HR_Leave_Request = () => {
    const [id, setId] = useState(0);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
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
      // {
      //   id: "leave_status",
      //   label: "Leave Status",
      //   minWidth: 170,
      //   align: "right",
      // },
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
    // const rows = employee_data.leave_details;
    const handleViewDetails = (id) => {
      setId(id);
    };
    const handleGoBack = () => {
      setId(0);
    };
    const handleClickOpen = (value) => {
      setId(value);
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    
  
    useEffect(()=>{
      const fetchData = async () =>{
        const res = await employee.getLeaveRequestOfEmployeesByHR();
       setRows(res);
      }
      fetchData();
    },[])


    return (
      <div>
      
             {
        rows.length === 0?
        <LottiePlayers
        src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json"
     
      />:
<CommonTable
 columns={columns}
  rows={rows} 
viewDetails={handleClickOpen}/>
      }
       {open && (
        <Modal open={open} 
        handleClose={handleClose}
         historyData={rows[id]} />
      )}
      
      </div>
    );
  };
  
  export const HR_others_leave_history = () =>{
    return (
      <div className="">
        <Manager_Team_Leave_Info/>
      </div>
    )
  }
 