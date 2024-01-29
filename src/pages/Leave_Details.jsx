import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Leave_Details = () => {
    const navigate = useNavigate();
    const {state}=useLocation();
    // console.log('statwe',state);
    const {leaveType,
        from,
     
         to,
     numberOfDays,
        join,
        file,
        reasonsForLeave,
     delegetedFor}=state.filteredLeaveData[0];
    return (
        <div>
            <button className='text-blue-700 font-semibold'
            onClick={()=> navigate(-1)}
            >Go Back</button>
            {/* <p><span className='mr-1 font-semibold text-lg'></span>Leave Application Details</p> */}
  {/* employee  leave details  */}
          

            <div className="card  glass">
  <div className="card-body">
    <h2 className="card-title text-2xl items-center  mx-auto">Leave Application Details</h2>
    <p><span className='mr-1 font-semibold text-lg '>Leave Type:</span>{leaveType}</p>
<div className='flex justify-around items-center'>
<p><span className='mr-1 font-semibold text-lg'>From:</span>{from}</p>
<p><span className='mr-1 font-semibold text-lg'>To:</span>{to}</p>
<p><span className='mr-1 font-semibold text-lg'>Total Days :</span>{numberOfDays}</p>
</div>
<div className='flex justify-between items-center'>
<p><span className='mr-1 font-semibold text-lg'>Date of joining:</span>{join}</p>
<p><span className='mr-1 font-semibold text-lg'>Alternative Collegue Name:</span>{delegetedFor}</p>
</div>
<p><span className='mr-1 font-semibold text-lg'>Reasons for Leave:</span>{reasonsForLeave}</p>
   <p ><span className='mr-1 font-semibold text-lg'>Leave Status:</span> Pending</p>
  </div>
</div>

<div>


</div>
        </div>
    );
};

export default Leave_Details;