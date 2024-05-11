import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ShowSnackbar = ({open,handleClose,text}) => {
    return (
  <Snackbar
  open={open}
  anchorOrigin={{ vertical:'top', horizontal:'right'}}
  autoHideDuration={600}
  onClose={handleClose}
  >
    <Alert
    onClose={handleClose}
    severity='success'
    variant='filled'
    sx={{width:"100%"}}
    >
{text}
    </Alert>
  </Snackbar>
    );
};

export default ShowSnackbar;