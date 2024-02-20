import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
const Leave_Details = ({info}) => {
    const {delegatedFor,reasonsForLeave,application_Date,status}= info;
    const {name,email,position}=delegatedFor;
    return (
        <Card className=' w-full lg:w-1/2 relative' >
             <CardContent className='border border-blue-light m-5 p-5 rounded-md'  >
     <Box>
      <Typography variant="h6" fontWeight="bold">Reasons For Leave</Typography>
      <Typography>{reasonsForLeave}</Typography>

      <Box className='flex flex-col lg:flex-row justify-between lg:gap-10 mt-2'>
        <Box>
          <Typography variant="h6" fontWeight="bold">Delegated To</Typography>
          <Typography>{name}</Typography>
          <Typography variant="body2">{position}</Typography>
          <Typography variant="body2">{email}</Typography>
        </Box>
        
        <Box className='mt-2'>
          <Typography variant="h6" fontWeight="bold">Application Date</Typography>
          <Typography>{application_Date}</Typography>
        </Box>
      </Box>
    </Box>

        <Chip label={status} color="success" className='absolute right-0 top-0' />

      </CardContent>
        </Card>
    );
};

export default Leave_Details;