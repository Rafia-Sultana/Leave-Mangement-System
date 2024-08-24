import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState ,useEffect} from "react";
import AddEmployee from "../pages/HR/Managment/AddEmployee";
import Stepper from "./Stepper";
import { Box } from "@mui/material";
import employee from "../services/employee";

const BreadCumb = ({ label, component,color, onClick }) => {
  return (
    <Stack direction={"row"} spacing={1} onClick={onClick}>
      <Typography color={color} className="cursor-pointer">{label}</Typography>
      {<NavigateNextIcon />}
    </Stack>
  );
};

const BreadCumbs = () => {
  const [currentTab, setCuurentTab] = useState(0);

  const handleTabChange = (idx) => {
    setCuurentTab(idx);
  };

  const breadcrumbs = [
    { label: "Add New Employee", component: <AddEmployee /> },
    { label: "Application Steps", component: <Stepper /> },
  ];



  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" spacing={2}>
        {breadcrumbs.map((bcumb, idx) => (
          <BreadCumb
            key={idx}
            label={bcumb.label}
            component={idx === currentTab ? bcumb.component : null}
            color={idx === currentTab ? 'blue' : ''}
            onClick={() => handleTabChange(idx)}
          />
        ))}
      </Stack>
      <Box sx={{ mt: 3 }}>{breadcrumbs[currentTab].component}</Box>
    </Box>
  );
};

export default BreadCumbs;
