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
import { useLocation } from "react-router-dom";
import { Manager_Leave_Approval } from "../pages/Manager_Data";
import { useState,useEffect } from "react";

const Modal = ({ open, handleClose, historyData }) => {
  const location = useLocation();
  const [logData, setLogData] = useState([])
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
  const handleClickOpen = () => {
    console.log("object");
  };

  useEffect(() => {
    
    const fetchData = async () => {
      console.log(historyData.application_id);
    const logData = await employee.getLog(historyData.application_id);
    
    setLogData(logData)
    console.log('logData',logData);
  };
  
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        minWidth={"lg"}
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
            <Leave_Details info={historyData} />
            {role === "Employee" ||
            (role === "Team Lead" &&
              location.pathname === "/dashboard/manager_leave_history") ||
            location.pathname === "/dashboard/manager_team_leave_info" ? (
              <CommonTable
                columns={columns2}
                rows={logData}
                viewDetails={handleClickOpen}
              />
            ) : (
              <>
                <Manager_Leave_Approval
                  applicationId={historyData.application_id}
          
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
