
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";

import HeadLine from "../../components/HeadLine";
import LoadingOrTable from "../../components/LoadingOrTable";

import employee from "../../services/employee";



export const Manager_Leave_Request = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
  
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
  
  
    const handleClickOpen = (value,empId) => {
    
      // setId(value);
      // setOpen(true);
     navigate(`/dashboard/view-log/${empId}`,{state:{...rows[value], show:true}});
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const LeaveRequstData = await employee.getLeaveRequestOfTeamByTeamLead();
          setRows(LeaveRequstData);
        } catch (error) {
          console.error("Error fetching LeaveRequstData:", error);
        } finally {
          setTimeout(()=>{ setLoading(false);},500)
  
        }
     
      };
      fetchData();
    }, [location]);
   
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    const smallScreenColumns = columns.filter(
      (column) =>
        column.id === "employee_name" ||
        column.id === "leave_status" ||
        column.id === "action"
    );
    return (
      <div>
        <HeadLine text={"Pending Request"} num={1} />
  
        <LoadingOrTable  
        loading={loading} 
         columns={isSmallScreen ? smallScreenColumns : columns}
            rows={rows}
            viewDetails={handleClickOpen}
            maxHeight={770}/>
  
        {/* {rows.length >= 1 ? (
          <CommonTable
            columns={isSmallScreen ? smallScreenColumns : columns}
            rows={rows}
            viewDetails={handleClickOpen}
            maxHeight={770}
          />
        ) : loading ? (
          <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
        ) : (
          <LottiePlayers src="https://lottie.host/213f7823-b3fe-4df0-9b2b-f10f412b9519/jONQ1jwzN4.json" />
        )} */}
  
      {/*   {open && (
          <Modal open={open} handleClose={handleClose} historyData={rows[id]} />
        )} */}
      </div>
    );
  };