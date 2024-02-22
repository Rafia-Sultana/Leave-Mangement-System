import CommonTable from "../components/CommonTable";

import { useState } from "react";

import { employee_data } from "../utils/Dummy_Data";
import Leave_Details from "./Leave_Details";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SelectInput from "../components/InputFields/SelectInput";


export const Employee_Leave_Request = () => {
  const [id, setId] = useState(0);


  const columns = [
    { id: "leaveType", label: "Leave Type", minWidth: 100 },
    {
      id: "from",
      label: "Start Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "to",
      label: "End Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "total",
      label: "Total Days",
      minWidth: 170,
      align: "right",
    },
    {
      id: "status",
      label: "Leave Status",
      minWidth: 170,
      align: "right",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];
  const columns2 = [
    { id: "sender", label: "Sender", minWidth: 100 },
    {
      id: "date",
      label: "Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "right",
    },
    {
      id: "comments",
      label: "Comments",
      minWidth: 170,
      align: "right",
    },
    // {
    //   id: "action",
    //   label: "Action",
    //   minWidth: 170,
    //   align: "center",
    // }
  ];
  const rows = employee_data.leave_details;
  const handleViewDetails = (id) => {
    setId(id);
  };
  const handleGoBack = () => {
    setId(0);
  };

  return (
    <div>
      {id === 0 ? (
       <>
     
       <h2 className="text-2xl text-center font-semibold text-gray-darker underline decoration-2  decoration-green-dark underline-offset-8 mt-5 mb-10">
       Employee Request History
        </h2>
        <CommonTable
          columns={columns}
          rows={rows}
          viewDetails={handleViewDetails}
        />
       </>
      ) : (
        <>
          <button
            onClick={handleGoBack}
            className="text-blue font-bold text-lg mt-5 mb-3"
          >
            <KeyboardBackspaceIcon />
          </button>
          <Leave_Details
            info={rows.find((emp_leave) => emp_leave.leave_id === id)}
          />
          <CommonTable
            columns={columns2}
            rows={
              rows.find((emp_leave) => emp_leave.leave_id === id)?.logs ?? []
            }
            // viewDetails={handleViewEmpDetails}
          />
        </>
      )}
    </div>
  );
};

export const Employee_Leave_History = () =>{
    const [id, setId] = useState(0);


  const columns = [
    { id: "leaveType", label: "Leave Type", minWidth: 100 },
    {
      id: "from",
      label: "Start Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "to",
      label: "End Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "total",
      label: "Total Days",
      minWidth: 170,
      align: "right",
    },
    {
      id: "status",
      label: "Leave Status",
      minWidth: 170,
      align: "right",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];

  const rows = employee_data.leave_details;
  const handleViewDetails = (id) => {
    setId(id);
  };
  const handleGoBack = () => {
    setId(0);
  };


//filter 
const leaveStatusOptions = [
    'pending','approved','rejected' 
]
const leaveTypesOptions = [
   "Sick Leave" ,
   "Maternity/Paternity Leave" ,
   "Parental Leave" ,
   "Bereavement Leave" ,
   "Personal Leave" ,
   "Study/Exam Leave" ,
 "Unpaid Leave" ,
   "Other" ,
];
const getSelectedStatus= (selected) => {
// console.log(selected);
}
const getSelectedType= (selected) => {
// console.log(selected);
}
  return (
    <div>
      {id === 0 ? (
     <>
        <h2 className="text-2xl text-center font-semibold text-gray-darker underline decoration-2  decoration-green-dark underline-offset-8 mt-5 mb-2">
       Employee Leave History
        </h2>
<div className="flex">
<SelectInput options={leaveStatusOptions} placeholder={'filter by status'} getSelectedValue={getSelectedStatus} />
        <SelectInput options={leaveTypesOptions} placeholder={'filter by type'}  getSelectedValue={getSelectedType} />
</div>
        <CommonTable
          columns={columns}
          rows={rows}
          viewDetails={handleViewDetails}
        />
     </>
      ) : (
        <>
          <button
            onClick={handleGoBack}
            className="text-blue font-bold text-lg mt-5 mb-3"
          >
            <KeyboardBackspaceIcon />
          </button>



          <Leave_Details
            info={rows.find((emp_leave) => emp_leave.leave_id === id)}
          />
        
        </>
      )}
    </div>
  );
}
