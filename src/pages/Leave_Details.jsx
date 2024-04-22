import React,{useEffect,useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import employee from '../services/employee';
import AutoComplete from '../components/InputFields/AutoComplete';


const Leave_Details = ({ info,isclickedEditBtn }) => {
  const [leaveTypes, setLeaveTypes] = useState(null);
  const isSmallScreen  = useMediaQuery('(max-width:600px)');
  const { delegated_to,leave_name, reason, application_date, leave_status,start_date,end_date,total_days,
    application_id} = info;
  
  useEffect(() => {
    
    const fetchData = async () => {
      let leaveTypeData = await employee.getLeaveTypes(); 
      setLeaveTypes(leaveTypeData);
  };
  
    fetchData();
  }, []);
   const handleInputChange = () =>{

   }

  return (
    <Card className='w-full'>
      <CardContent className='border border-blue-light mx-2 mb-2 rounded-md'>
        <Box className="grid  grid-cols-2 gap-5 ">
          <div className="md:col-span-2">
          <p className='font-semibold'>Reasons For Leave</p>
          <p className='text-sm'>{reason}</p>
          </div>

          {isSmallScreen && <>
          
         
            <div className=''>
              <p className='font-semibold'>Total_Days</p>
              <p className='text-sm'>{total_days}</p>
            </div>
          </>}
         
         { isclickedEditBtn? <div className="">

         <AutoComplete
              options={leaveTypes}
              label={"Leave Type"}
              field={"leave_type_id"}
              handleInputChange={handleInputChange}
              // value={selectedLeaveType || selectedOptionOfLeaveName || null}
            />
         </div>
         
         :
                <div className=''>
                <p className='font-semibold'>Leave Type</p>
                <p className='text-sm'>{leave_name}</p>
              </div>
            }
            <div className=''>
              <p className='font-semibold'>Start Date</p>
              <p className='text-sm'>{start_date}</p>
            </div>
            <div className=''>
              <p className='font-semibold'>End Date</p>
              <p className='text-sm'>{end_date}</p>
            </div>
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
