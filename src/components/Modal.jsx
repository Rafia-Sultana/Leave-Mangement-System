import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Leave_Details from "../pages/Leave_Details";
import CommonTable from "./CommonTable";
import { employee_data } from "../utils/Dummy_Data";
import Button from "./Button";
import employee from "../services/employee";
import { useLocation, useNavigate } from "react-router-dom";
import { Manager_Leave_Approval } from "../pages/Manager_Data";
import { useState,useEffect } from "react";

const Modal = ({ open, handleClose, historyData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logData, setLogData] = useState([]);
  const [isclickedEditBtn,seIsClickedEditBtn]=useState(false);
  // console.log(historyData);
  // const [logTable, setLogTable] = useState([]);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfoData.role;

  // const rows = employee_data.leave_details[0].logs;
 

  const columns2 = [
    { id: "sender", label: "Sender", minWidth: 100 },
    {
      id: "timestamp",
      label: "Date",
      minWidth: 170,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "center",
    },
    {
      id: "comments",
      label: "Comments",
      minWidth: 170,
      align: "right",
    },
  ];
  const handleClickOpen = () => {
    console.log("object");

  };

  useEffect(() => {
    
    const fetchData = async () => {
      //console.log(historyData.application_id);
    const logData = await employee.getLog(historyData.application_id);
    // console.log(logData);
    setLogData(logData)
    // console.log('logData',logData);
  };
  
    fetchData();
  }, []);

  const handleEditButton = () => {
  
    const data = {
      ...historyData,
      btnText:'Send To Employee',
      headerText:'Edit Leave Application'
    }
    navigate('/dashboard/manager_edit_leave_application',{state:data,
    
    
    })
// seIsClickedEditBtn(true);
  }
  return (
    <div className="w-full">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
        
        fullWidth
        style={{padding:"50px"}}
       
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center font-bold text-blue-dark relative"
        >
          {"User History Details"}
          <div className="absolute right-5 top-2  border border-red rounded-full w-9 h-9">
            <Button
              btnIcon={CloseIcon}
              onClick={handleClose}
              textColor={"red"}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Leave_Details info={historyData} isclickedEditBtn={isclickedEditBtn} />
            {role === "Employee" ||
            (role === "Team Lead" &&
              location.pathname === "/dashboard/manager_leave_history") ||
            location.pathname === "/dashboard/manager_view_each_teamMember_leave_info" ? (
              <CommonTable
                columns={columns2}
                rows={logData}
                viewDetails={handleClickOpen}
              />
            ) : (
              <>
                <Manager_Leave_Approval
                  applicationId={historyData.application_id}
                  editButton={handleEditButton}
                />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
