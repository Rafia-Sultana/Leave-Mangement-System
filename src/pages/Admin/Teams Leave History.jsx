import  {useEffect, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import LottiePlayers from "../../components/LottiePlayers";
import CommonTable from "../../components/CommonTable";
import employee from "../../services/employee";






export const TabPanel = ({ children, value, index }) => {
  return (
    <div className="" role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export const  Teams_Leave_History = () => {
    

  const [ loading, setLoading]= useState(true)
  const navigate = useNavigate();
  const location = useLocation();

  const [departments, setDepartments] = useState([]);
  const [employeData, setEmployeeData] = useState({});
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
      try {
        const teamMembersDetails =
          await employee.getLeaveHistroryOfTeamByAdmin();
          console.log(teamMembersDetails);
        setDepartments(Object.keys(teamMembersDetails));
        setEmployeeData(teamMembersDetails);
      } catch (error) {
        console.error(error);
      } finally {
     setTimeout(()=>{ setLoading(false);},500)
      }
    };
    fetchDataOfTeamLeave();
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewDetails = async (index, emp_id) => {
    // setLoading(true);
    console.log(index, emp_id);
    navigate(`/dashboard/view-teamMember-leave-info/${emp_id}`);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>


      {departments.length >= 1 ? (
        <>
         
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            style={{ marginBottom: "10px" }}
          >
    {departments.map((department, index) => (
            <Tab label={department} value={index} key={index} />
          ))}

          </Tabs>


      

         {departments.map((department, index) => (
            <TabPanel value={value} index={index} key={index}>
              <CommonTable
                columns={columns}
                rows={employeData[department] || []}
                viewDetails={handleViewDetails}
                
              />
            </TabPanel>
          ))}
      
         
        </>
      ) : loading ? (
    <div>
        
      <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" /></div>
      ) : (
        <div>
      
     
       <LottiePlayers src="https://lottie.host/213f7823-b3fe-4df0-9b2b-f10f412b9519/jONQ1jwzN4.json" />
        </div>
      )}
    </Box>
  );
};
