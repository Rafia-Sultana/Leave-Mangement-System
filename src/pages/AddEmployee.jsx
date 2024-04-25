import HeadLine from "../components/HeadLine";
import Box from "@mui/material/Box";
import TextInput from "../components/InputFields/TextInput";
import AutoComplete from "../components/InputFields/AutoComplete";
import Button from "../components/Button";
import DateInput from "../components/InputFields/DateInput";
import { useState } from "react";
import dayjs from "dayjs";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

const AddEmployee = () => {
  const intialFormState = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    joiningDate: dayjs(),
    status: "",
  };

  let genderOptions = [
    { id: 1, genderType: "Male" },
    { id: 2, genderType: "Female" },
  ];
  const [addEmployeeForm, setAddEmployeeForm] = useState(intialFormState);
  const handleGenderChange = (e, newValue) => {};

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setAddEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    console.log(date);
  };
  // console.log(addEmployeeForm);
  return (
    <Box className="">
      {/* <HeadLine text={"Add New Employee"} /> */}
      <h2 className="font-bold text-xl p-4  ">Add New Employee</h2>
      <form>
        <Box className="flex items-start gap-20 mt-10 px-10 ">
          <div className="bg-[#CCCCCC] rounded-full h-40 w-40 relative  shadow-md">
            {/* <TextInput type="file" name={"image"}></TextInput> */}
            
            <input type="file" id="imageInput" accept="image/*" style={{display:"none"}}  />
     <p for="imageInput" className="absolute left-7 top-16 ">Choose Picture</p>
     <CameraAltOutlinedIcon style={{position:"absolute", right:10,top:'7rem',
    backgroundColor:"#DDDDDD",borderRadius:'50%', padding:'4px',
    }} />
      <div id="previewContainer"></div>

          </div>
          <div className="flex flex-col gap-5 w-[40%]">
            <TextInput
              label={"First Name"}
              onchange={handleInputChange}
              variant="standard"
              name={"firstName"}
            />
            <TextInput
              label={"Middle Name"}
              onchange={handleInputChange}
              name={"middleName"}
              variant="standard"
            />
            <TextInput
              label={"Last Name"}
              onchange={handleInputChange}
              name={"lastName"}
              variant="standard"
            />
            <TextInput
              label={"Email"}
              type="email"
              onchange={handleInputChange}
              name={"email"}
              variant="standard"
            />
            <TextInput
              label={"Password"}
              type="password"
              onchange={handleInputChange}
              name={"password"}
              variant="standard"
            />

            {/* <AutoComplete
            options={genderOptions}
            label={"Gender"}
            handleInputChange={handleGenderChange}
            variant="standard"
          /> */}

    <div className="grid grid-cols-2 gap-10">
    <DateInput label={"joining date"}
          handleDateChange={handleDateChange}
          value={intialFormState.joiningDate}
          variant="standard"
          />
            <TextInput
              label={"Status"}
              onchange={handleInputChange}
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
