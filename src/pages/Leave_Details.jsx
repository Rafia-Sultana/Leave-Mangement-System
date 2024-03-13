import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Modal from '../components/Modal';

const Leave_Details = ({ info }) => {
  const { delegated_to, reason, application_date, leave_status } = info;

  return (
    <Card className='w-full'>
      <CardContent className='border border-blue-light m-5 p-5 rounded-md'>
        <Box className="grid  grid-cols-1 md:grid-cols-2 gap-5 ">
          <div className="md:col-span-2">
          <p className='font-semibold'>Reasons For Leave</p>
          <p className='text-sm' >{reason}</p>
          </div>

 
            <div className=''>
              <p className='font-semibold'>Delegated To</p>
              <p className='text-sm'>{delegated_to}</p>
              {/* <p>{position}</p>
              <p>{email}</p> */}
            </div>

            <div className=''>
              <p className='font-semibold'>Application Date</p>
              <p className='text-sm'>{application_date}</p>
            </div>
        </Box>

        {/* <Chip label={leave_status} color="success" className='absolute right-3 top-10' /> */}
      </CardContent>
    </Card>
  );
};

export default Leave_Details;
