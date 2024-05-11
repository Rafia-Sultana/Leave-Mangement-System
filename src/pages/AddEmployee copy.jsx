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
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import FormateDate, { convertToIsoString } from "../utils/FormateDate";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import ShowSnackbar from "../components/ShowSnackbar";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContext } from "react";
import { UserContext } from "../context api/Context";

const AddEmployee = () => {
  const navigate = useNavigate();
  const {openSnackBar,handleSnackBarClose,setOpenSnackbar}=useContext(UserContext);
  const initialFormState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "Male",
    joining_date: null,
    dept_des: {
      primary: {
        dept_id: 0,
        des_id: 0,
      },
      secondary: [
        {
          dept_id: 0,
          des_id: 0,
        },
        {
          dept_id:0,
          des_id: 0,
        },
      ],
    },
    role: 0,
  };

  const [addEmployeeForm, setAddEmployeeForm] = useState(initialFormState);
  const [imageURL, setImageURL] = useState(null);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [designationsList, setDesignationsList] = useState([]);
  const [openOtherDepartments, setOpenOtherDepartments]=useState(false);

  let roleOptions = [
   {
      id: 1,
      role: "Employee",
    },
    {
      id: 2,
      role: "Team Lead",
    },
    {
      id: 3,
      role: "HR",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddEmployeeForm((prev) => ({
      
      ...prev,
      [name]: value,

    }));
  };

  const handleDateChange = (date, label) => {
let timestamp = convertToIsoString(date, "6:00 PM");
    setAddEmployeeForm((prev) => ({
      ...prev,
      ["joining_date"]:timestamp,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const departments = await employee.getDepartmentList();
      const designations = await employee.getDesignationList();
      setDepartmentsList(departments);
      setDesignationsList(designations);
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageURL(url);

  };

  const setDepartment = (value, field, index = null) => {
    let dept_id = departmentsList.find((x) => x.department === value)?.id;
    let des_id = designationsList.find((x) => x.designation === value)?.id;

    setAddEmployeeForm((prev) => {
      const updatedForm = { ...prev };
      if (index === null) {
        updatedForm.dept_des.primary[field] =
          field === "dept_id" ? dept_id : des_id;
      } else {
        updatedForm.dept_des.secondary[index][field] =
          field === "dept_id" ? dept_id : des_id;
      }
      return updatedForm;
    });
  };

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    let roleId = roleOptions?.find((x) => x.role == value)?.id;
    setAddEmployeeForm((prev) => ({ ...prev, [name]: roleId }));
  };
  const handleAddDepartmentClick = () =>{
    setOpenOtherDepartments(!openOtherDepartments)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
   let result = await employee.addEmployee(addEmployeeForm);
   setAddEmployeeForm(initialFormState); 
  if(result.success == true){
   setOpenSnackbar(true);
  //  setTimeout(()=>{
  //   navigate('/dashboard/manage-employee')
  //  },600)
}
};


useEffect(()=>{
console.log(addEmployeeForm);
},[addEmployeeForm])

  return (
    <Box className="">
      {
      <ShowSnackbar open={openSnackBar} handleClose={handleSnackBarClose} text={'SuccessFully Employee Added '} />
      }
      <div className="flex items-center ">
        <ArrowBackIosNewOutlinedIcon
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
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
                name={"first_name"}
                value={addEmployeeForm?.first_name}
              />
              <TextInput
                label={"Last Name"}
                onchange={handleInputChange}
                name={"last_name"}
                variant="standard"
                value={addEmployeeForm?.last_name}
              />
            </div>
        

            <SelectInput
              options={roleOptions.map((role) => role.role)}
              placeholder="Role"
              // value={roleOptions.find(role=>role.id === addEmployeeForm?.role)?.role}
              value={addEmployeeForm?.role}
              getSelectedValue={handleRoleChange}
              name={"role"}
              variant="standard"
            />

            <TextInput
              label={"Email"}
              // type="email"
              onchange={handleInputChange}
              name={"email"}
              value={addEmployeeForm?.email}
              variant="standard"
            />
            <TextInput
              label={"Password"}
              // type="password"
              onchange={handleInputChange}
              name={"password"}
              variant="standard"
            />

       

            <DateInput
              label={"joining date"}
              handleDateChange={handleDateChange}
               value={addEmployeeForm?.joining_date}
              variant="standard"
            />

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
              {/* <SelectInput
                options={departmentsList.map(
                  (department) => department.id
                )}
                placeholder="Department"
                // value={
                //   departmentsList.find(
                //     (x) =>
                //       x.department == addEmployeeForm.dept_des.primary.dept_id
                //   )?.department
                // }
                value={addEmployeeForm.dept_des.primary.dept_id}
                getSelectedValue={(e) =>
                  setDepartment(e.target.value, "dept_id")
                }
                variant="standard"
              /> */}
              <SelectInput
  options={departmentsList.map((department) => department.department)}
  placeholder="Department"
  value={addEmployeeForm?.dept_des?.primary.dept_id}
  getSelectedValue={(e) => setDepartment(e.target.value, "dept_id")}
  variant="standard"
/>

              <SelectInput
                options={designationsList.map(
                  (designation) => designation.designation
                )}
                placeholder="Designation"
                value={
                  designationsList.find(
                    (x) =>
                      x.designation == addEmployeeForm.dept_des.primary.des_id
                  )?.designation
                }
                getSelectedValue={(e) =>
                  setDepartment(e.target.value, "des_id")
                }
                variant="standard"
              />
            </div>
            <div>
              <div className="flex gap-2 cursor-pointer" onClick={handleAddDepartmentClick} >
               {openOtherDepartments?<RemoveOutlinedIcon/>:<AddOutlinedIcon/>}  
                <Button
                  btnText={"Add Department"}
                  textColor={"blue"}
                  fontWeight={"bold"}

                  btnIcon={"AddOutlinedIcon"}
                ></Button>
                <p className="text-blue">(if any)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
                {openOtherDepartments &&  addEmployeeForm.dept_des.secondary.map((_, index) => (
                  <div key={index}>
                    <SelectInput
                      options={departmentsList.map(
                        (department) => department.department
                      )}
                      placeholder={`Department ${index + 1}`}
                      value={
                        departmentsList.find(
                          (x) =>
                            x.id ==
                            addEmployeeForm.dept_des.secondary[index].dept_id
                        )?.department
                      }
                      getSelectedValue={(e) =>
                        setDepartment(e.target.value, "dept_id", index)
                      }
                      variant="standard"
                    />
                    <SelectInput
                      options={designationsList.map(
                        (designation) => designation.designation
                      )}
                      placeholder={`Designation ${index + 1}`}
                      value={
                        designationsList.find(
                          (x) =>
                            x.designation ==
                            addEmployeeForm.dept_des.secondary[index].des_id
                        )?.designation
                      }
                      getSelectedValue={(e) =>
                        setDepartment(e.target.value, "des_id", index)
                      }
                      variant="standard"
                    />
                  </div>
                ))}
              </div>
            </div>

               
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
            <Button
              btnText={"SUBMIT"}
              backgroundColor={"bg-blue-light"}
              padding={"p-3"}
              textColor={"white"}
              width={"1/2"}
              onClick={handleSubmit}
            ></Button>
          </div>
        </Box>
      </form>
    </Box>
  );
};

export default AddEmployee;
