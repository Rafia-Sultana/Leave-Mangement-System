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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Manager_Leave_Approval } from "../pages/Manager_Data";
import { useState, useEffect } from "react";

const Modal = ({ open, handleClose, historyData }) => {
  
  const { empId } = useParams();

  const location = useLocation();
  const navigate = useNavigate();
  const [logData, setLogData] = useState([]);
  const [isclickedEditBtn, seIsClickedEditBtn] = useState(false);

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
  const handleClickOpen = () => {};

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const logData = await employee?.getLog(historyData.application_id);

  //     setLogData(logData);
  //   };

  //   fetchData();
  // }, [historyData]);

  const handleEditButton = () => {
    const data = {
      ...historyData,
      btnText: "Send To Employee",
      headerText: "Edit Leave Application",
    };
    navigate("/dashboard/manager_edit_leave_application", { state: data });
  };

  return (
    <div className="w-full">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
        fullWidth
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center font-bold text-blue-dark relative"
        >
          {"User History Details"}
          <div className="absolute right-2 top-1   lg:right-5 lg:top-2  ">
            <Button
              btnIcon={CloseIcon}
              onClick={handleClose}
              textColor={"red"}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="space-y-5"
          >
            <Leave_Details
              info={historyData}
              isclickedEditBtn={isclickedEditBtn}
            />
            {location.pathname ===
              `/dashboard/view-teamMember-leave-info/${empId}` ||
            location.pathname === `/dashboard/request-history` ? (
              <CommonTable
                columns={columns2}
                rows={logData.length > 0 ? logData : ["not available"]}
                viewDetails={handleClickOpen}
              />
            ) : (
              <>
                <Manager_Leave_Approval
                  applicationId={historyData?.application_id}
                  editButton={handleEditButton}
                  handleClose={handleClose}
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
