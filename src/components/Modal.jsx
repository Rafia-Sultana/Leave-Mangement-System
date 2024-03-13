
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Leave_Details from '../pages/Leave_Details';


const Modal = ({open,handleClose,historyData}) => {
  
    return (
        <div className='w-full'>
       
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-title" className='text-center font-bold text-blue-dark'>
          {"User History Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Leave_Details info={historyData}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
        </DialogActions>
      </Dialog>
        </div>
    );
};

export default Modal;