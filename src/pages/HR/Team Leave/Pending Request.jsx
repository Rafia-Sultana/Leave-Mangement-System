import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useMediaQuery from '@mui/material/useMediaQuery';

import HeadLine from "../../../components/HeadLine";
import LoadingOrTable from "../../../components/LoadingOrTable";

import employee from "../../../services/employee";
import { UserContext } from "../../../context api/Context";
import LottiePlayers from "../../../components/LottiePlayers";



export const HR_Leave_Request = () => {
  
//   const [id, setId] = useState(0);
  const [rows, setRows] = useState([]);
//   const [open, setOpen] = useState(false);

// const {loading,setLoading} =  useContext(UserContext);
const [ loading, setLoading]= useState(true)
const isSmallScreen= useMediaQuery('(max-width:600px)');
const location = useLocation();
const navigate = useNavigate();


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



  const handleClickOpen = (value,empId) => {
    // setId(value);
    // setOpen(true);
    navigate(`/dashboard/view-log/${empId}`,{state:{...rows[value],show:true}});
  };


//   const handleClose = () => {
//     setOpen(false);
//   };

  useEffect(() => {
    const fetchData = async () => {
setLoading(true) 
      try {
        const result = await employee.getLeaveRequestOfEmployeesByHR();
      
         setRows(result);
        
     
      } catch (error) {
        console.error(error);
     
      }finally{
        setTimeout(()=>{ setLoading(false);},500)
      }
   
    };
    fetchData();
  }, [location]);

  const smallScreenColumns = columns.filter(column => 
   column.id === "employee_name" ||  column.id === "leave_name"  || column.id === "action"
  );

  return (
    <div className="my-2">
      <HeadLine text={'Pending Request'}  num={1}/>

      <LoadingOrTable    
        columns={isSmallScreen?smallScreenColumns:columns}
        rows={rows}
        viewDetails={handleClickOpen}
        maxHeight={650}
        loading={loading}
        />


    </div>
  );
};
