import CommonTable from "../components/CommonTable";
import { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import TextInput from "../components/InputFields/TextInput";
import employee from "../services/employee";
import Modal from "../components/Modal";
import RadioInput from "../components/InputFields/RadioInput";
import { Employee_Leave_Request } from "./Employee_Data";
import useMediaQuery from "@mui/material/useMediaQuery";
import LottiePlayers from "../components/LottiePlayers";
import Cards from "../components/Cards";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Avatar from "@mui/material/Avatar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Leave_Application from "./Leave_Application";
import HeadLine from "../components/HeadLine";
import { UserContext } from "../context api/Context";
import ShowSnackbar from "../components/ShowSnackbar";

export const Manager_Leave_History = () => {
  return ( <Employee_Leave_Request />);
};
export const Manager_Team_Leave_Info = () => {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  const [open, setOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

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

  const handleViewDetails = async (index, emp_id) => {
    navigate(`/dashboard/view-teamMember-leave-info/${emp_id}`);
  };

  useEffect(() => {
    const fetchDataOfTeamLeave = async () => {
      const teamMembersDetails = await employee.getLeaveHistroryOfTeam();
      // console.log(teamMembersDetails);
      setRows(teamMembersDetails);
    };
    fetchDataOfTeamLeave();
  }, []);

  return (
    <div>
      {rows.length === 0 ? (
        <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
      ) : (
        <div>
          <HeadLine text={"Team's Leave History"}/>
          <CommonTable
            columns={columns}
            rows={rows}
            viewDetails={handleViewDetails}
          />
        </div>
      )}
    </div>
  );
};

export const Manager_View_Each_TeamMember_Leave_Info = () => {
  const navigate = useNavigate();
  const param = useParams();
  const empId = param.empId;
  const [id, setId] = useState(0);
  const [rows2, setRows2] = useState([]);
  const [open, setOpen] = useState(false);
  const [employeeBasicData, setEmployeeBasicData] = useState(null);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleClickOpen = (value) => {
    setId(value);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns2 = [
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

  useEffect(() => {
    const fecthData = async () => {
      const teammembersLeaveInfos = await employee.getTeamRequestHistory(empId);

      const employeeBasicData = await employee.basicInfo(empId);
      setEmployeeBasicData(employeeBasicData);
      setRows2(teammembersLeaveInfos);
    };
    fecthData();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const smallScreenColumns = columns2.filter(
    (column) =>
      column.id === "leave_name" ||
      column.id === "leave_status" ||
      column.id === "action"
  );
  return (
    <div>
      <div className="flex justify-between mt-10">
        <div className="flex gap-4 items-center">
          <Avatar
            alt={employeeBasicData?.name}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 50, height: 50, backgroundColor: "#2b84b1" }}
          />
          <div className="">
            <p className="font-semibold">{employeeBasicData?.name}</p>
            <p className="text-sm">
              {employeeBasicData?.designations[0].designation}
            </p>
          </div>
        </div>
        <Button
          btnText={"Go Back"}
          backgroundColor={"bg-[#2b84b1]"}
          padding={"p-3"}
          textColor={"white"}
          onClick={handleGoBack}
        ></Button>
      </div>

      <div className="">
        <Cards empId={empId} />
        <CommonTable
          columns={isSmallScreen ? smallScreenColumns : columns2}
          rows={rows2}
          viewDetails={handleClickOpen}
          borderRadius={"10px"}
          // maxHeight={400}
        />
      </div>
      {open && (
        <Modal open={open} handleClose={handleClose} historyData={rows2[id]} />
      )}
    </div>
  );
};

export const Manager_Leave_Request = () => {
  const [id, setId] = useState(0);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

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
      const LeaveRequstData = await employee.getLeaveRequestOfTeamByTeamLead();

      setRows(LeaveRequstData);
    };
    fetchData();
  }, []);
  console.log(rows);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const smallScreenColumns = columns.filter(
    (column) =>
      column.id === "employee_name" ||
      column.id === "leave_status" ||
      column.id === "action"
  );
  return (
    <div>
      <HeadLine text={"Team's Request History"}/>
      {rows.length === 0 ? (
        <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
      ) : (
        <CommonTable
          columns={isSmallScreen ? smallScreenColumns : columns}
          rows={rows}
          viewDetails={handleClickOpen}
           maxHeight={770}
        />
      )}

      {open && (
        <Modal open={open} handleClose={handleClose} historyData={rows[id]} />
      )}
    </div>
  );
};

export const Manager_Leave_Approval = ({ applicationId, editButton }) => {
  const { openSnackBar, handleSnackBarClose, setOpenSnackbar } =
 useContext(UserContext);
  const [selectedValue, setSelectedValue] = useState("Pending");
  const [comments, setComments] = useState("");
  const [logData, setLogData] = useState({});
  const [isBtnDisable, setIsBtnDisable] = useState(true);
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfoData.role;
 

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleCommentSection = (event) => {
    setComments(event.target.value);
  };

  const deciosnByTeamLead = {
    application_id: applicationId,
    leave_status: selectedValue,
    comments: comments,
    sent_to: selectedValue === "Approved" ? "HR" : "Applicant",
    processing_time: new Date().toISOString(),
  };



  const handleSendToHR = async () => {
   
    const result = await employee.postDecisionByTeamLead(deciosnByTeamLead);
    console.log(result);
 
    if(result){
      setOpenSnackbar(true);
      }
  };

  const handleReturnToEmployee = async () => {
    const result = await employee.postDecisionByTeamLead(deciosnByTeamLead);
    if(result){
      setOpenSnackbar(true);
      }
  };

  const deciosnByHR = {
    application_id: applicationId,
    leave_status: selectedValue,
    comments: comments,
    // sent_by: role,
    sent_to: "Applicant",
    processing_time: new Date().toISOString(),
  };
  //postDecisionByHR
const handleSendToEmployeeByHr = async () =>{
  const result = await employee.postDecisionByHR(deciosnByHR);
  
  if(result){
  setOpenSnackbar(true);
  }
}



  useEffect(() => {
    if (selectedValue === "Approved") {
      setIsBtnDisable(false);
    } else {
      setIsBtnDisable(true);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (openSnackBar) {
      setSelectedValue("Pending");
      setComments("");
    }
  }, [openSnackBar]);
  const handleSubmit=()=>{

  }
  console.log(selectedValue);
  return (
    <div className="flex flex-col  space-y-3">
      {
        <ShowSnackbar
          open={openSnackBar}
          handleClose={handleSnackBarClose}
          text={"Sent SuccessFully"}
        />
      }
      <div className="flex   flex-col sm:flex-row justify-between  sm:items-center">
     
        <div className="flex  flex-col sm:flex-row">
          <RadioInput
            label="Approved"
            value={"Approved"}
            color={"success"}
            onchange={handleChange}
            selectedValue={selectedValue}
          />
          <RadioInput
            label="Rejected"
            value={"Rejected"}
            color={"error"}
            onchange={handleChange}
            selectedValue={selectedValue}
          />
        </div>
    

        <Button
          btnText={"Edit"}
          btnIcon={EditOutlinedIcon}
          textColor={"blue"}
          onClick={editButton}
        ></Button>
      </div>

     
        <TextInput
          rows={4}
          multiline={true}
          onchange={handleCommentSection}
          placeholder="Add comment ..."
          value={comments}
        />
 
{
  role!== 'HR' ?
  
  <div className="flex gap-4 ">
  <Button
    fontWeight="semibold"
    textColor="white"
    btnText="Send to HR"
    width="full"
    type="submit"
    backgroundColor={isBtnDisable ? "bg-gray" : "bg-green"}
    padding={"p-3"}
    onClick={handleSendToHR}
    disable={isBtnDisable}
  ></Button>
  <Button
    fontWeight="semibold"
    textColor="white"
    btnText="Return to Employee"
    width="full"
    type="submit"
    backgroundColor={!isBtnDisable ? "bg-gray" : "bg-red"}
    padding={"p-3"}
    onClick={handleReturnToEmployee}
    disable={!isBtnDisable}
  ></Button>
</div>
:
<Button
  fontWeight="semibold"
  textColor="white"
  btnText="Send to Employee"
  width="full"
  type="submit"
  backgroundColor={selectedValue === 'Approved' || selectedValue === 'Rejected' ? "bg-blue-light" : "bg-gray"}
  padding={"p-3"}
  cursor={selectedValue === 'Approved' || selectedValue === 'Rejected' ? "cursor-pointer" : "cursor-not-allowed"}
  onClick={handleSendToEmployeeByHr}
  disable={selectedValue !== 'Approved' && selectedValue !== 'Rejected'}

  // disable={selectedValue !== 'Approved' || selectedValue !== 'Rejected'}
></Button>

}
    </div>
  );
};

export const Edit_Leave_Application = () => {
  return (
    <div>
      <Leave_Application />
    </div>
  );
};
