import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextInput from "../components/InputFields/TextInput";
import Button from "../components/Button";
import DateInput from "../components/InputFields/DateInput";
import RadioInput from "../components/InputFields/RadioInput";
import dayjs from "dayjs";
import RadioGroup from "@mui/material/RadioGroup";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SelectInput from "../components/InputFields/SelectInput"; // Import your custom component here
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import employee from "../services/employee";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "Male",
    joiningDate: dayjs(),
    status: "",
    department: [],
    designation: [],
  };

  const [addEmployeeForm, setAddEmployeeForm] = useState(initialFormState);
  const [imageURL, setImageURL] = useState(null);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [designationsList, setDesignationsList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddEmployeeForm((prev) => ({
      ...prev,
      [name]: Array.isArray(value)?[...value]:value,
    }));
  };

  const handleDateChange = (date) => {
    console.log(date);
  };





  useEffect(() => {
    const fetchData = async () => {
      const departments = await employee.getDepartmentList();
      const designations = await employee.getDesignationList();

      setDepartmentsList(
        departments.map((department) => department.department)
      );
      setDesignationsList(
        designations.map((designation) => designation.designation)
      );
    };
    fetchData();
  }, []);

  // const departmentList = ["Planning", "Software Development", "Admin"];
  // const designationList = [
  //   {
  //     Planning: [
  //       "Senior Urban Planner",
  //       "Associate Urban Planner",
  //       "Junior Urban Planner",
  //     ],
  //   },
  //   {
  //     "Software Development": [
  //       "Senior Software Engineer",
  //       "Software Engineer",
  //       "Junior Software Engineer",
  //     ],
  //   },
  //   { Admin: ["Senior Executive", "Manager", "Finance/Account"] },
  // ];
console.log(addEmployeeForm);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageURL(url);
    // console.log(file);
  };

  return (
    <Box className="">
<div className="flex items-center ">
<ArrowBackIosNewOutlinedIcon className='cursor-pointer'   onClick={()=>navigate(-1)}/>
      <h2 className="font-bold text-xl p-4">Add New Employee</h2>
</div>
      <form>
        <Box
          className="flex flex-col lg:flex-row justify-center  items-center lg:justify-start lg:items-start
        gap-5 lg:gap-20 lg:mt-10 lg:pl-4"
        >
          <div className="bg-[#CCCCCC] rounded-full h-40 w-40 relative  shadow-md ">
            {/* Your file input and camera icon */}
            {imageURL ? (
              <img
                src={imageURL}
                alt="new user image"
                className="rounded-full h-40 w-40"
              />
            ) : (
              <>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  style={{ display: "none", marginTop: "4rem" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="imageInput" className="absolute left-7 top-16 ">
                  Choose Picture
                </label>
                <label htmlFor="imageInput">
                  <CameraAltOutlinedIcon
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "7rem",
                      backgroundColor: "#DDDDDD",
                      borderRadius: "50%",
                      padding: "4px",
                    }}
                  />
                </label>
              </>
            )}
          </div>
          <div className="flex flex-col gap-5 w-[70%] lg:w-[40%]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
              <TextInput
                label={"First Name"}
                onchange={handleInputChange}
                variant="standard"
                name={"firstName"}
              />
              <TextInput
                label={"Last Name"}
                onchange={handleInputChange}
                name={"lastName"}
                variant="standard"
              />
            </div>

            {/* Your other input fields */}
            <SelectInput
              options={departmentsList}
              placeholder="Department"
              value={addEmployeeForm?.department}
              getSelectedValue={handleInputChange}
              variant="standard"
              name={"department"}
              multiple={true}
    
            />
            <SelectInput
              // options={
              //   designationList.find((item) => item[addEmployeeForm?.department])?.[
              //     addEmployeeForm?.department
              //   ] || []
              // }
              options={addEmployeeForm.department.length!=0?designationsList:[]}
              placeholder="Designation"
              value={addEmployeeForm?.designation}
              getSelectedValue={handleInputChange}
              variant="standard"
              name={"designation"}
              multiple={true}
        
            />

            <TextInput
              label={"Email"}
              // type="email"
              onchange={handleInputChange}
              name={"email"}
              variant="standard"
            />
            <TextInput
              label={"Password"}
              // type="password"
              onchange={handleInputChange}
              name={"password"}
              variant="standard"
            />

            {/* Remaining input fields */}
            <>
              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <RadioInput
                    label={"Male"}
                    onchange={handleInputChange}
                    value={"Male"}
                    selectedValue={addEmployeeForm?.gender}
                    name={"gender"}
                  ></RadioInput>
                  <RadioInput
                    label={"Female"}
                    onchange={handleInputChange}
                    value={"Female"}
                    selectedValue={addEmployeeForm?.gender}
                    name={"gender"}
                  ></RadioInput>
                </RadioGroup>
              </FormControl>
            </>

            <div className="grid grid-cols-1   md:grid-cols-2 gap-5 lg:gap-10">
              <DateInput
                label={"joining date"}
                handleDateChange={handleDateChange}
                value={initialFormState.joiningDate}
                variant="standard"
              />

              <SelectInput
                options={["Active", "Inactive"]}
                placeholder="Status"
                value={addEmployeeForm.status}
                getSelectedValue={handleInputChange}
                name={"status"}
                variant="standard"
              />
            </div>
            <Button
              btnText={"SUBMIT"}
              backgroundColor={"bg-blue-light"}
              padding={"p-3"}
              textColor={"white"}
              width={"1/2"}
            ></Button>
          </div>
        </Box>
      </form>
    </Box>
  );
};

export default AddEmployee;
