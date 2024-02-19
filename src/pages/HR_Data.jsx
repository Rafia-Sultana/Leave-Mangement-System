import React from 'react';
import { HR_leave_data } from "../utils/Dummy_Data";
import CommonTable from '../components/CommonTable';

export const HR_Leave_History = () => {
    const { my } = HR_leave_data;
  
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
        //   format: (value) => value.toFixed(0),
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
    const rows = my.leave_details.map(
      ({ leaveType, from, to, total, status }) => ({
        leaveType,
        from,
        to,
        total,
        status,
      })
    );
  
    return (
      <div>
        <p>hello HR_Leave_History</p>
        <CommonTable columns={columns} rows={rows} />
      </div>
    );
  };