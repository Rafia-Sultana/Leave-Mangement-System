import {React,useState} from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import {leaveInfo} from '../utils/Dummy_Data.js'
const Leave_Approval = () => {
    const navigate = useNavigate();
    // console.log(leaveInfo);
    // console.log('object');
    
    const [showDetails, setShowDetails] = useState(false);
    const handleLeaveDetails = (e) =>{
        e.preventDefault();
setShowDetails(!showDetails);
navigate('/dashboard/leave-approval/view-details')
    }
    return (
        <div className="overflow-x-auto mt-10 ">
        {
            showDetails ? <Outlet/> :
            <table className="table">

          <thead>
            <tr className='font-semibold text-[0.95rem]'>
           
              <th>Emp_Id</th>
              <th>Name</th>
              <th>Type_of_leave</th>
              <th>Start Date</th>
              <th>End_Date</th>
              <th>Total_Days</th>
              <th>Leave Status</th>
              <th>Action</th>
              {/* <th>Attachment</th> */}
            </tr>
          </thead>
          <tbody>

            <tr>
             
              <td>
                01
              </td>
              <td>
             XYZ
              </td>
              <td>
                sick leave
              </td>
              <td>
                15-4-2024
               
              </td>
              <td>19-4-2024</td>
              <td>05</td>
              <td>pending</td>
              
      
              <td>
                <button className="border p-2 rounded"
                
                onClick={(e)=>handleLeaveDetails(e)}
                >View Details</button>
              </td>
            </tr>
      
          </tbody>
        
          
        </table>
        }
        
      </div>
    );
};

export default Leave_Approval;