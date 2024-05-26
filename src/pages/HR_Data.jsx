import React from "react";
import CommonTable from "../components/CommonTable";
import { useEffect, useState } from "react";
import employee from "../services/employee";
import Modal from "../components/Modal";
import LottiePlayers from "../components/LottiePlayers";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import HeadLine from "../components/HeadLine";
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';


export const HR_Leave_Request = () => {
  const [id, setId] = useState(0);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const isSmallScreen= useMediaQuery('(max-width:600px)');

  const columns = [
    { id: "employee_name", label: "Name", minWidth: 100 },
    { id: "delegated_to", label: "Delegated To", minWidth: 100 },
    { id: "leave_name", label: "Leave Type", minWidth: 100 },
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await employee.getLeaveRequestOfEmployeesByHR();
      setRows(result);
    };
    fetchData();
  }, []);

  const smallScreenColumns = columns.filter(column => 
   column.id === "employee_name" ||  column.id === "leave_name"  || column.id === "action"
  );

  return (
    <div className="my-2">
      <HeadLine text={'Pending Request '}/>
      {rows.length === 0 ? (
        <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
      ) : (
        <CommonTable
          columns={isSmallScreen?smallScreenColumns:columns}
          rows={rows}
          viewDetails={handleClickOpen}
          maxHeight={650}
        />
      )}
      {open && (
        <Modal open={open} handleClose={handleClose} historyData={rows[id]} />
      )}
    </div>
  );
};

 export const TabPanel = ({ children, value, index }) => {
  return (
    <div className="" role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export const HR_others_leave_history = () => {
  const navigate = useNavigate();

  const [departments,setDepartments]=useState([]);
  const [employeData,setEmployeeData]= useState({});
  const [value, setValue] = useState(0);

  const columns = [
    { id: "employee_name", label: "Name", minWidth: 100 },
    {
      id: "employee_designation",
      label: "Designation",
      minWidth: 170,
      align: "center",
    },
    {
      id: "total_leave_days",
      label: "Total Days",
      minWidth: 170,
      align: "center",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];


  useEffect(() => {
    const fetchDataOfTeamLeave = async () => {
      const teamMembersDetails = await employee.getAllEmployeeLeaveHistoryByHR();
      setDepartments(Object.keys(teamMembersDetails));
      setEmployeeData(teamMembersDetails);
    };
    fetchDataOfTeamLeave();
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewDetails = async (index, emp_id) => {
     navigate(`/dashboard/view-teamMember-leave-info/${emp_id}`);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1"   } }>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {departments.map((department, index) => (
          <Tab label={department} value={index} key={index} />
        ))}
       </Tabs>
       {departments.map((department, index) => (
        <TabPanel value={value} index={index} key={index}>
      
          <CommonTable 
          columns={columns}
           rows={employeData[department]|| []}
           viewDetails={handleViewDetails}
           />
 
        </TabPanel>
      ))}
    </Box>
  );
};
