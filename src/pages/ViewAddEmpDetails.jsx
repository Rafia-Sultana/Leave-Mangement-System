import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Avatars from "../components/Avatars";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Tabs } from "@mui/material";

const TabPanel = ({ children, value, index }) => {
  return (
    <div className="" role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const ViewAddEmpDetails = () => {
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  const {
    name,
    joining_date,
    status,
    role,
    primary_dept,
    primary_des,
    secondary_dept_1,
    secondary_des_1,
    secondary_dept_2,
    secondary_des_2,
    email,
  } = location.state;
  const [value, setValue] = React.useState(0); // State for managing tab value

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = ["General", "Additional"];

  return (
    <div>
      <div className="flex items-center">
        <ArrowBackIosNewOutlinedIcon
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="font-bold text-xl p-4">Employee Profile</h2>
      </div>
      <div className="flex items-center gap-5">
        <Avatars>{name}</Avatars>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-lg sm:text-xl">{name}</p>
            <p
              className={`${
              Boolean(status) ?  status === "Active" ? "bg-green-dark" : "bg-red-dark" : ''
              } w-3 h-3 rounded-full mr-2`}
            ></p>
          </div>
          <p className="text-gray    sm:text-lg">{primary_des}</p>
          <p className="text-gray  sm:text-lg">{primary_dept} {primary_dept.includes('Team') ? '':"Team"}</p>
        </div>
      </div>
      <Box
        sx={{
         width: {lg:"30%",md:'40%',sm:'60%'},
          typography: "body1",
          marginTop: "2%",

        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="space-y-2">
            <p className="whitespace-nowrap">Email: {email}</p>
           

            <p>Joined: {joining_date}</p>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
       {
        secondary_dept_1 ? 
        <div className="space-y-2">
        <p>
          <span className="text-[#6f6f6f]">Team </span>: {secondary_dept_1}
        </p>
        <p>
          <span className="text-[#6f6f6f]">Designation </span>:{" "}
          {secondary_des_1}
        </p>
        <p>
          <span className="text-[#6f6f6f]">Team </span>: {secondary_dept_2 || "---"}
        </p>
        <p>

          <span className="text-[#6f6f6f]">Designation </span>:{" "}
          {secondary_des_2 || "---"}
        </p>
      </div>
      :
      <p>No Additional Value Available.</p>
       }
        </TabPanel>
      </Box>
    </div>
  );
};

export default ViewAddEmpDetails;
