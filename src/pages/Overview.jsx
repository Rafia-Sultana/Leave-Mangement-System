import React from 'react';

const Overview = () => {
    return (
        <div>
           <div className="flex flex-col w-full lg:flex-row bg-green-100 rounded-lg my-12">
  <div className="flex-grow h-16 lg:h-32 card rounded-box flex flex-col justify-center items-center">
    <p className='font-bold'>Total Leaves</p>
    <span>50 days</span>
  </div>
  <div className="divider lg:divider-horizontal py-8" ></div>
  <div className="flex-grow h-16  lg:h-32 card rounded-box flex flex-col justify-center items-center">
    <p className='font-bold'>Approved</p>
    <span>50 days</span>
  </div> 
  <div className="divider lg:divider-horizontal py-8" ></div>
  <div className="flex-grow h-16  lg:h-32 card rounded-box flex flex-col justify-center items-center">
    <p className='font-bold'>Pending</p>
    <span>50 days</span>
  </div>
  <div className="divider lg:divider-horizontal py-8" ></div>
  <div className="flex-grow h-16  lg:h-32 card rounded-box flex flex-col justify-center items-center">
    <p className='font-bold'>Rejected</p>
    <span>50 days</span>
  </div>
</div>

        </div>
    );
};

export default Overview;