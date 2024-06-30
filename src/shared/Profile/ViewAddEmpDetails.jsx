import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Tabs } from "@mui/material";

import Avatars from "../../components/Avatars";
import HeadLine from "../../components/HeadLine";

import employee from "../../services/employee";
import { UserContext } from "../../context api/Context";
import LottiePlayers from "../../components/LottiePlayers";

const TabPanel = ({ children, value, index }) => {
  return (
    <div className="" role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const ViewAddEmpDetails = () => {
  const location = useLocation();
  const [profileDetails, setProfileDetails] = useState({});
  // const {  setLoading } = useContext(UserContext);
  const [ loading, setLoading]= useState(true)
  const { empId } = useParams();
  const navigate = useNavigate();
  // const {
  //   name,
  //   joining_date,
  //   status,
  //   role,
  //   primary_dept,
  //   primary_des,
  //   secondary_dept_1,
  //   secondary_des_1,
  //   secondary_dept_2,
  //   secondary_des_2,
  //   email,
  // } = location.state;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = ["General", "Additional"];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let employeeInfo = await employee.employeeInfo(empId);
        setProfileDetails(employeeInfo);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [empId]);

  const {
    emp_id,
    first_name,
    middle_name,
    last_name,
    email,
    joining_date,
    status,
    dept_des,
    role,
    gender,
  } = profileDetails;

  const concatNames = (...names) => {
    return names.filter(Boolean).join(" ");
  };

  let name = concatNames(first_name, middle_name, last_name);
  let primary_dept = dept_des?.primary?.dept_name;

  let primary_des = dept_des?.primary?.des_name;
  let secondary_dept_1 = dept_des?.secondary[0]?.dept_name;
  let secondary_des_1 = dept_des?.secondary[0]?.des_name;

  let secondary_dept_2 = dept_des?.secondary[1]?.dept_name;
  let secondary_des_2 = dept_des?.secondary[1]?.des_name;

  return (
    <div>
      { Object.keys(profileDetails).length>0? (
        <div>
          <HeadLine text={"Employee Profile"} />

          <div className="flex items-center gap-5 ">
         <div className="w-32 h-32">
         <Avatars width={"128px"} height={"128px"} />
         </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg sm:text-xl">{name}</p>
                <p
                  className={`${
                    Boolean(status)
                      ? status === "active"
                        ? "bg-green-dark"
                        : "bg-red-dark"
                      : ""
                  } w-3 h-3 rounded-full mr-2`}
                ></p>
              </div>
              <p className="text-gray    sm:text-lg">{primary_des}</p>
              <p className="text-gray  sm:text-lg">{primary_dept}</p>
            </div>
          </div>
          <Box
            sx={{
              width: { lg: "30%", md: "40%", sm: "60%" },
              typography: "body1",

              marginLeft: "8%",
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
              {secondary_dept_1 ? (
                <div className="space-y-2">
                  <p>
                    <span className="text-[#6F6F6F]">Team </span>:{" "}
                    {secondary_dept_1}
                  </p>
                  <p>
                    <span className="text-[#6F6F6F]">Designation </span>:{" "}
                    {secondary_des_1}
                  </p>
                  <p>
                    <span className="text-[#6F6F6F]">Team </span>:{" "}
                    {secondary_dept_2 || "---"}
                  </p>
                  <p>
                    <span className="text-[#6F6F6F]">Designation </span>:{" "}
                    {secondary_des_2 || "---"}
                  </p>
                </div>
              ) : (
                <p>No Additional Value Available.</p>
              )}
            </TabPanel>
          </Box>
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          {/* <p className='loading loading-dots'>loading...........</p> */}
          <LottiePlayers src="https://lottie.host/1a4165a8-80b0-4ddc-a267-4517694bc515/7pIEzJlIzw.json" />
        </div>
      )}
    </div>
  );
};

export default ViewAddEmpDetails;
