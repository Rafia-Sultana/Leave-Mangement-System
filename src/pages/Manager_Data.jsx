import CommonTable from "../components/CommonTable";
import { manager_leave_data } from "../utils/Dummy_Data";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "../components/Button";

export const Manager_Leave_History = () => {
  const { my } = manager_leave_data;
  //    console.log('object',Object.keys(my.leave_details[0]));
  //    const columns = Object.keys(my.leave_details[0]).filter((col)=>  col!=='id' && col!=='delegatedFor' && col!=='reasonsForLeave' )
  //   const rows =[];

  //    for (let index = 0; index < my.leave_details.length; index++) {
  //     const element1 = my.leave_details[index];
  //     rows.push(createData(...(Object.values(element1))));

  //    }
  //    function createData(name, type_of_leave, start_date, end_date,total_days,leave_status) {
  //     return { name, type_of_leave, start_date, end_date,total_days,leave_status };
  //    }
  //   console.log('object,', rows);
  // for (let index = 0; index < columns.length; index++) {
  //     const element2 = columns[index];

  // }
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
      <p>hello Manager_Leave_History</p>
      <CommonTable columns={columns} rows={rows} />
    </div>
  );
};
export const Manager_Team_Leave_Info = () => {
  const [id, setId] = useState(0);
  const { team } = manager_leave_data;

  const columns = [
    { id: "emp_id", label: "Emp_Id", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "position", label: "Position", minWidth: 170 },
    { id: "department", label: "Department", minWidth: 170 },

    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];
  const columns2 = [
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
      id: "delegatedFor",
      label: "Delegated For",
      minWidth: 170,
      align: "right",
    },
    {
      id: "reasonsForLeave",
      label: "Reasons For Leave",
      minWidth: 170,
      align: "right",
    },
    {
      id: "application_Date",
      label: "Application Date",
      minWidth: 170,
      align: "right",
    },
    {
      id: "status",
      label: "Leave Status",
      minWidth: 170,
      align: "right",
    },
  ];
  const handleViewDetails = (id) => {
    setId(id);
  };
  const handleGoBack = () => {
    setId(0);
  };
  const extractBasicDetails = (team) => {
    return team.map((employee) => {
      let emp_id = employee.emp_id;
      const { name, position, department } = employee.details;
      return { emp_id, name, position, department };
    });
  };
  return (
    <div>
      <p>hello Manager_Team_Leave_History</p>

      {id === 0 ? (
        <CommonTable
          columns={columns}
          rows={extractBasicDetails(team)}
          viewDetails={handleViewDetails}
        />
      ) : (
        <>
          <button
            onClick={handleGoBack}
            className="text-blue font-bold text-lg"
          >
            Go back
          </button>
          <CommonTable
            columns={columns2}
            rows={team.find((emp) => emp.emp_id === id)?.leave_details ?? []}
          />
          <Manager_Leave_Approval />
        </>
      )}
    </div>
  );
};

export const Manager_Leave_Request = () => {
  return <div></div>;
};
export const Manager_Leave_Approval = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const controlProps = (item) => ({
    onChange: handleChange,
    checked: selectedValue === item,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  return (
    <div className="flex flex-col gap-5">
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Leave</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className="flex gap-20"
        >
          <FormControlLabel
            control={<Radio {...controlProps("approved")} color="success" />}
            label="Approved"
          ></FormControlLabel>
          <FormControlLabel
            control={
              <Radio
                {...controlProps("request_more_information")}
                color="warning"
              />
            }
            label="Request More Information"
          ></FormControlLabel>
          <FormControlLabel
            control={<Radio {...controlProps("rejected")} color="error" />}
            label="Rejected"
          ></FormControlLabel>
        </RadioGroup>
      </FormControl>
      <TextField
          id="outlined-multiline-static"
      multiline
          rows={4}
          fullWidth
          placeholder="add comment"/>
           <Button
              fontSize="bold"
              textColor="white"
              btnText="SUBMIT"
              width="full"
              type="submit"
              bg="green"
            ></Button>
    </div>
  );
};
