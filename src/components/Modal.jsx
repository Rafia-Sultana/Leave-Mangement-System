
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Leave_Details from '../pages/Leave_Details';
import CommonTable from './CommonTable';
import {employee_data} from '../utils/Dummy_Data'
import Button from './Button';
import employee from '../services/employee';
import { useLocation } from 'react-router-dom';
import { Manager_Leave_Approval } from '../pages/Manager_Data';

const Modal = ({open,handleClose,historyData}) => {
  const location = useLocation();
  console.log(location.pathname);

  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const role = userInfoData.role;
  console.log(role);
  const rows = employee_data.leave_details[0].logs;
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
  const handleClickOpen = ()=>{
    console.log('object');
  }
    return (
        <div className='w-full'>
       
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-title" className='text-center font-bold text-blue-dark relative'>
          {"User History Details"}  
         <div className="absolute right-5 top-2  border border-red rounded-full w-9 h-9">
         <Button btnIcon={CloseIcon}  onClick={handleClose} textColor={'red'}  />
         </div>
        </DialogTitle>
        <DialogContent>
         
          <DialogContentText id="alert-dialog-description">
          <Leave_Details info={historyData}/>
          {
            role === 'Employee' || role === 'Team Lead' && location.pathname === '/dashboard/manager_leave_history'? 
            <CommonTable
            columns={columns2}
            rows={rows}
            viewDetails={handleClickOpen}
          
          />
          :<>
          <Manager_Leave_Approval/>
          </>
          }
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
        </DialogActions>
      </Dialog>
        </div>
    );
};

export default Modal;