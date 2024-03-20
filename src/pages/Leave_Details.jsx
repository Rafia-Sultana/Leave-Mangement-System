import React,{useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import employee from '../services/employee';


const Leave_Details = ({ info }) => {
  
  const isSmallScreen  = useMediaQuery('(max-width:600px)');
  const { delegated_to, reason, application_date, leave_status,start_date,end_date,total_days,application_id} = info;

  useEffect(() => {
    
    const fetchData = async () => {
    const logData = await employee.getLog(application_id);
    console.log(logData);
  };
  
    fetchData();
  }, []);
  

  return (
    <Card className='w-full'>
      <CardContent className='border border-blue-light mx-2 mb-2 rounded-md'>
        <Box className="grid  grid-cols-1 md:grid-cols-2 gap-5 ">
          <div className="md:col-span-2">
          <p className='font-semibold'>Reasons For Leave</p>
          <p className='text-sm'>{reason}</p>
          </div>

          {isSmallScreen && <>
          
            <div className=''>
              <p className='font-semibold'>Start Date</p>
              <p className='text-sm'>{start_date}</p>
            </div>
            <div className=''>
              <p className='font-semibold'>End Date</p>
              <p className='text-sm'>{end_date}</p>
            </div>
            <div className=''>
              <p className='font-semibold'>Total_Days</p>
              <p className='text-sm'>{total_days}</p>
            </div>
          </>}
            <div className=''>
              <p className='font-semibold'>Delegated To</p>
              <p className='text-sm'>{delegated_to}</p>
             
            </div>

            <div className=''>
              <p className='font-semibold'>Application Date</p>
              <p className='text-sm'>{application_date}</p>
            </div>
            
            {/* <Manager_Leave_Approval/> */}
        </Box>

        {/* <Chip label={leave_status} color="success" className='absolute right-3 top-10' /> */}
      </CardContent>
    </Card>
  );
};

export default Leave_Details;
