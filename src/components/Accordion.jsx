import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeadLine from "./HeadLine";
import TextInput from "./InputFields/TextInput";
import Button from "./Button";
import employee from "../services/employee";
import { useContext } from "react";
import { UserContext } from "../context api/Context";
import ShowSnackbar from "./ShowSnackbar";

const AccordionInput = () => {
  const { openSnackBar, handleSnackBarClose, setOpenSnackbar } =
    useContext(UserContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const addProperty = ["Department", "Designation", "Role"];
  const initialState = {
    department: "",
    designation: "",
    role: "",
  };
  const [formData, setFormData] = React.useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const submitFunctions = {
      department: employee.postDepartmentByHR,
      designation: employee.postDesignationByHR,
      role: employee.postRoleByHR,
    };

    for (const [key, value] of Object.entries(formData)) {
      if (value) {
        let res = await submitFunctions[key](value);
        if (res.success === true) {
          setOpenSnackbar(true);
        }
      }
    }
    setFormData(initialState);
  };
  return (
    <div>
      <HeadLine text={"Add Others"}></HeadLine>

      {
        <ShowSnackbar
          open={openSnackBar}
          handleClose={handleSnackBarClose}
          text={"Added SuccessFully"}
          duration={3000}
        />
      }

      {addProperty.map((x, index) => (
        <Accordion
          expanded={expanded === index}
          onChange={handleChange(index)}
          key={index}
          sx={{ backgroundColor: "#DCF3FF" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>{x}</Typography>
          </AccordionSummary>
          <AccordionDetails className="space-y-5">
            <TextInput
              placeholder={`Add New ${x}`}
              width={350}
              onchange={handleInputChange}
              name={x.toLowerCase()}
              value={formData[x.toLowerCase()]}
            />

            <Button
              btnText={"ADD"}
              backgroundColor={"bg-blue-light"}
              padding={"p-3"}
              textColor={"white"}
              width={"1/4"}
              cursor={"cursor-pointer"}
              onClick={handleSubmit}
            ></Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionInput;
