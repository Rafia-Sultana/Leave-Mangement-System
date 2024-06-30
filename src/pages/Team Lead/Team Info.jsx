import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";

import HeadLine from "../../components/HeadLine";
import LoadingOrTable from "../../components/LoadingOrTable";

import employee from "../../services/employee";
import { UserContext } from "../../context api/Context";

export const Manager_Team_Leave_Info = () => {

    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    // const {loading,setLoading}=useContext(UserContext);
    const [ loading, setLoading]= useState(true)
    const location = useLocation();
  
    const columns = [
      { id: "employee_name", label: "Name", minWidth: 170 },
      { id: "employee_designation", label: "Designation ", minWidth: 170 },
      { id: "total_leave_days", label: "Approved", minWidth: 170 },
  
      {
        id: "action",
        label: "Action",
        minWidth: 170,
        align: "center",
      },
    ];
  
    const handleViewDetails = async (index, emp_id) => {
      navigate(`/dashboard/view-teamMember-leave-info/${emp_id}`);
    };
  
    useEffect(() => {
      const fetchDataOfTeamLeave = async () => {
        // setLoading(true);
        try {
          const teamMembersDetails = await employee.getLeaveHistroryOfTeam();
          setRows(teamMembersDetails);
        } catch (error) {
          console.error("Error fetching team leave history:", error);
        } finally {
          setTimeout(()=>{ setLoading(false);},500)
        }
      };
      fetchDataOfTeamLeave();
    }, [location]);
  
    return (
      <div>
        <HeadLine text={"Team's Leave History"} />
        <LoadingOrTable 
        loading={loading} 
        rows={rows}   
        columns={columns}
        viewDetails={handleViewDetails}
    
        />
  
        {/* {rows.length >= 1 ? (
          <CommonTable
            columns={columns}
            rows={rows}
            viewDetails={handleViewDetails}
          />
        ) : loading ? (
          <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
        ) : (
          <LottiePlayers src="https://lottie.host/213f7823-b3fe-4df0-9b2b-f10f412b9519/jONQ1jwzN4.json" />
        )} */}
  
  
      </div>
    );
  };