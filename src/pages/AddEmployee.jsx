import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextInput from "../components/InputFields/TextInput";
import Button from "../components/Button";
import DateInput from "../components/InputFields/DateInput";
import RadioInput from "../components/InputFields/RadioInput";
import RadioGroup from "@mui/material/RadioGroup";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import SelectInput from "../components/InputFields/SelectInput"; 
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import employee from "../services/employee";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router-dom";
import { convertToIsoString } from "../utils/FormateDate";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ShowSnackbar from "../components/ShowSnackbar";
import { useContext } from "react";
import { UserContext } from "../context api/Context";
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const AddEmployee = () => {
  const navigate = useNavigate();
  const { openSnackBar, handleSnackBarClose, setOpenSnackbar } =
    useContext(UserContext);
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
  const [imageURL, setImageURL] = useState(null);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [designationsList, setDesignationsList] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [openOtherDepartments, setOpenOtherDepartments] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);

  // let roleOptions = [
  //   {
  //     id: 1,
  //     role: "Admin",
  //   },
  //   {
  //     id: 2,
  //     role:"HR" ,
  //   },
  //   {
  //     id: 3,
  //     role:"Team Lead" ,
  //   },
  //   {
  //     id: 4,
  //     role: "Employee",
  //   },
  // ];

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
      setDepartmentsList(departments);  // Setting departmentList here
      
      setDesignationsList(designations);
    };
    fetchData();  // Calling fetchData here
}, []);  // useEffect dependency



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageURL(url);
  };
  

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
 const hashedPassword = bcrypt.hashSync(addEmployeeForm.password,'$2a$10$CwTycUXWue0Thq9StjUM0u');
// console.log({...logInData,password:hashedPassword});
// console.log(logInData);
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
    // Submit the updated form data
    let timestamp = convertToIsoString(
      updatedFormData?.joining_date,
      "6:00 PM"
    );
    let res = { ...updatedFormData, joining_date: timestamp };
    // console.log(res); 
    let result = await employee.addEmployee(res);
    setAddEmployeeForm(initialFormState);
    if (result.success == true) {
      setOpenSnackbar(true);
      //  setTimeout(()=>{
      //   navigate('/dashboard/manage-employee')
      //  },600)
    }
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
console.log(departmentsList);
  return (
    <Box className="">
      {
        <ShowSnackbar
          open={openSnackBar}
          handleClose={handleSnackBarClose}
          text={"Employee Added SuccessFully"}
        />
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
        gap-5 lg:gap-20 lg:mt-6 lg:pl-4"
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
          <div className="flex flex-col gap-5 w-[100%] md:w-[60%] lg:w-[40%]">
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
              value={addEmployeeForm?.role}
              getSelectedValue={handleInputChange}
              name={"role"}
              variant="standard"
              required={true}
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
                required={true}
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
                required={true}
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
                  btnText={"Add Department"}
                  textColor={"blue"}
                  fontWeight={"bold"}
                  btnIcon={"AddOutlinedIcon"}
                ></Button>
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
              backgroundColor={hasSubmit ? "bg-blue-light" : "bg-gray"}
              padding={"p-3"}
              textColor={"white"}
              width={"1/2"}
              cursor={hasSubmit ? "cursor-pointer" : "cursor-not-allowed"}
              onClick={handleSubmit}
              disable={hasSubmit?false:true}
            ></Button>
          </div>
        </Box>
      </form>
    </Box>
  );
};

export default AddEmployee;
