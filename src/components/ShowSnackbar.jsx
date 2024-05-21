import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ShowSnackbar = ({open,handleClose,text,severity='success',duration=3000}) => {
    return (
  <Snackbar
  open={open}
  anchorOrigin={{ vertical:'top', horizontal:'right'}}
  autoHideDuration={duration}
  onClose={handleClose}
  >
    <Alert
    onClose={handleClose}
    severity={severity}
    variant='filled'
    sx={{width:"100%"}}
    >
{text}
    </Alert>
  </Snackbar>
    );
};

export default ShowSnackbar;