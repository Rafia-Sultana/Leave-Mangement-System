import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import TextInput from "../../../components/InputFields/TextInput";
import Button from "../../../components/Button";
import DateInput from "../../../components/InputFields/DateInput";
import RadioInput from "../../../components/InputFields/RadioInput";

import SelectInput from "../../../components/InputFields/SelectInput";
import employee from "../../../services/employee";
import { convertToIsoString } from "../../../utils/FormateDate";
import { UserContext } from "../../../context api/Context";

import bcrypt from "bcryptjs";
import { useSnackbar } from "notistack";
import './../../../assets/styles/Stepper.css';
import HeadLine from "../../../components/HeadLine";
import Stepper from "../../../components/Stepper";
import BreadCumbs from "../../../components/BreadCumbs";



const AddEmployee = () => {
  const navigate = useNavigate();

  // const location = useLocation();
  // const employeeId = location.state.employeeId;
  // console.log(location.state);

  const { enqueueSnackbar } = useSnackbar();

  const initialFormState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "Male",
    joining_date: null,
    dept_des: {
      primary: {
        dept_id: "",
        des_id: "",
      },
      secondary: [
        {
          dept_id: "",
          des_id: "",
        },
        {
          dept_id: "",
          des_id: "",
        },
      ],
    },
    role: "",
  };

  const [addEmployeeForm, setAddEmployeeForm] = useState(initialFormState);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [designationsList, setDesignationsList] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [openOtherDepartments, setOpenOtherDepartments] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, label) => {
    setAddEmployeeForm((prev) => ({
      ...prev,
      [label]: date,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const departments = await employee.getDepartmentList();
      const roleOptions = await employee.getRoleList();
      const designations = await employee.getDesignationList();

      setRoleOptions(roleOptions);
      setDepartmentsList(departments);

      setDesignationsList(designations);
    };
    fetchData();
  }, []);

  const setDepartment = (value, field, index = null) => {
    setAddEmployeeForm((prev) => {
      const updatedForm = { ...prev };
      if (index === null) {
        updatedForm.dept_des.primary[field] = value;
      } else {
        updatedForm.dept_des.secondary[index][field] = value;
      }
      return updatedForm;
    });
  };

  const handleAddDepartmentClick = () => {
    setOpenOtherDepartments(!openOtherDepartments);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map department name to department ID
    const primaryDepartment = departmentsList.find(
      (department) =>
        department.department === addEmployeeForm?.dept_des.primary.dept_id
    );
    const primaryDeptId = primaryDepartment ? primaryDepartment.id : null;

    // Map designation name to designation ID
    const primaryDesignation = designationsList.find(
      (designation) =>
        designation.designation === addEmployeeForm?.dept_des.primary.des_id
    );
    const primaryDesId = primaryDesignation ? primaryDesignation.id : null;

    // Map role name to role ID
    const selectedRole = roleOptions.find(
      (role) => role.role === addEmployeeForm?.role
    );
    const roleId = selectedRole ? selectedRole.id : null;

    // Update the form data with IDs
    const updatedSecondaryDeptDes = addEmployeeForm.dept_des.secondary.map(
      (secondaryDept) => ({
        dept_id: secondaryDept.dept_id
          ? departmentsList.find(
              (department) => department.department === secondaryDept.dept_id
            ).id
          : 0,
        des_id: secondaryDept.des_id
          ? designationsList.find(
              (designation) => designation.designation === secondaryDept.des_id
            ).id
          : 0,
      })
    );
    let secondary = updatedSecondaryDeptDes.filter(
      (secondaryDept) => secondaryDept.dept_id !== 0
    );
    let updatedFormData;
    if (secondary.length == 0) {
      updatedFormData = {
        ...addEmployeeForm,
        dept_des: {
          primary: {
            dept_id: primaryDeptId,
            des_id: primaryDesId,
          },
        },
        role: roleId,
      };
    } else {
      updatedFormData = {
        ...addEmployeeForm,
        dept_des: {
          primary: {
            dept_id: primaryDeptId,
            des_id: primaryDesId,
          },
          secondary: secondary,
        },
        role: roleId,
      };
    }

    let timestamp = convertToIsoString(
      updatedFormData?.joining_date,
      "6:00 PM"
    );
    let res = { ...updatedFormData, joining_date: timestamp };

    // let result = await employee.addEmployee(res);
    // setAddEmployeeForm(initialFormState);
    // if (result.success == true) {
    //   // setOpenSnackbar(true);
    //   enqueueSnackbar(`Employee Added SuccessFully`, {
    //     variant: "success",
    //   });
    // }
    // else{
    //   enqueueSnackbar(`Something went wrong!!`, {
    //     variant: "error",
    //   });
    // }
    try {
      let result = await employee.addEmployee(res);
      setAddEmployeeForm(initialFormState);
      if (result.success == true) {
        enqueueSnackbar(`Employee Added SuccessFully`, {
          variant: "success",
        });
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (error) {
      enqueueSnackbar("Something went wrong!!", {
        variant: "error",
      });
    }

    //  navigate("/dashboard/hr-add-application-steps")
  };

  useEffect(() => {
    // Check if all required fields are filled
    const isPrimaryDeptDesFilled =
      addEmployeeForm.dept_des.primary.dept_id !== "" &&
      addEmployeeForm.dept_des.primary.des_id !== "";
    const isJoiningDateFilled = addEmployeeForm.joining_date !== null;
    const isFilled =
      isPrimaryDeptDesFilled &&
      isJoiningDateFilled &&
      Object.values(addEmployeeForm).every((val) => val !== "");
    setHasSubmit(isFilled);
  }, [addEmployeeForm]);
  departmentsList;


  return (
    <Box className="mt-5">
     
      {/* <HeadLine text={"Add New Employee"}/> */}
      {/* <BreadCumbs/> */}
      <div className="grid md:grid-cols-2  gap-10">
       
          <section className="space-y-5">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
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
              value={addEmployeeForm?.role}
              getSelectedValue={handleInputChange}
              name={"role"}
              variant="standard"
              // required={true}
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
              value={addEmployeeForm?.password}
              onchange={handleInputChange}
              name={"password"}
              variant="standard"
            />

            <DateInput
              label={"joining_date"}
              handleDateChange={handleDateChange}
              value={addEmployeeForm?.joining_date}
              variant="standard"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
              <SelectInput
                options={departmentsList.map(
                  (department) => department.department
                )}
                placeholder="Department"
                value={addEmployeeForm?.dept_des.primary.dept_id}
                getSelectedValue={(e) =>
                  setDepartment(e.target.value, "dept_id")
                }
                variant="standard"
                // required={true}
              />

              <SelectInput
                options={designationsList.map(
                  (designation) => designation.designation
                )}
                placeholder="Designation"
                value={addEmployeeForm?.dept_des.primary.des_id}
                getSelectedValue={(e) =>
                  setDepartment(e.target.value, "des_id")
                }
                variant="standard"
                // required={true}
              />
            </div>
            <div>
              <div
                className="flex gap-2 cursor-pointer"
                onClick={handleAddDepartmentClick}
              >
                {openOtherDepartments ? (
                  <RemoveOutlinedIcon />
                ) : (
                  <AddOutlinedIcon />
                )}
                <Button
                  // btnText={"Add Department"}
                  textColor={"blue"}
                  fontWeight={"bold"}
                  btnIcon={"AddOutlinedIcon"}
                >
                  Add Department
                </Button>
                <p className="text-blue">(if any)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
                {openOtherDepartments &&
                  addEmployeeForm.dept_des.secondary.map((_, index) => (
                    <div key={index}>
                      <SelectInput
                        options={departmentsList.map(
                          (department) => department.department
                        )}
                        placeholder={`Department ${index + 1}`}
                        value={
                          addEmployeeForm?.dept_des.secondary[index].dept_id
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
                          addEmployeeForm?.dept_des.secondary[index].des_id
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
        

   
            <Button
              backgroundColor={hasSubmit ? "bg-blue-light" : "bg-gray"}
              padding={"p-3"}
              width={"full"}
              cursor={hasSubmit ? "cursor-pointer" : "cursor-not-allowed"}
              onClick={handleSubmit}
              disable={hasSubmit ? false : true}
            >
              SUBMIT
            </Button>
          </section>

        
     
      </div>
    </Box>
  );
};

export default AddEmployee;
