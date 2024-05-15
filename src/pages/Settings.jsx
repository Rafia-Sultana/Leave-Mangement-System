import React, { useContext, useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../components/InputFields/TextInput";
import Button from "../components/Button";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { UserContext } from "../context api/Context";
import ShowSnackbar from "../components/ShowSnackbar";
import Person2Icon from '@mui/icons-material/Person2';

const Settings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {openSnackBar,setOpenSnackbar, handleSnackBarClose} = useContext(UserContext);
  const initialState ={
    current:'',
    new:'',
    confirm:''
  }
  const [show, setShow] = useState(true);
  const [changePass,setChangePass]= useState(initialState);
  const handleChange = (e) =>{
  const {name,value}=e.target;
  setChangePass((prev)=>({
    ...prev,
    [name]:value
  }))
  }
  const handleResetButton =()=>{
    if(changePass.confirm !== changePass.new){
        setOpenSnackbar(true);
    }
}
  return (
    <div>
        
{
        <ShowSnackbar
          open={openSnackBar}
          handleClose={handleSnackBarClose}
          text={"Password Did Not Match!!"}
          severity={"error"}
        />
      }
      <div className="flex items-center">
        <ArrowBackIosNewOutlinedIcon
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="font-bold text-xl p-4">Settings</h2>
      </div>
    <div className="flex items-center gap-2">
    <SettingsApplicationsIcon  sx={{ fontSize: 25}}/>
      <p className="text-blue cursor-pointer" onClick={()=>setShow(!show)}>Change Password</p>
    </div>
  {
    show &&
    <div className="space-y-3">
    <TextInput
        label={"Current Password"}
        name={"current"}
        onChange={onchange}
        width={'35ch'}
        type={"password"}
        variant={"standard"}
        onchange={handleChange}
      />
      <TextInput
        label={"New Password"}
        name={"new"}
        onChange={onchange}
      width={'35ch'}
        type={"password"}
        variant={"standard"}
        onchange={handleChange}
      />
      <TextInput
        label={"Confirm Password"}
        name={"confirm"}
        onChange={onchange}
         width={'35ch'}
        type={"password"}
        variant={"standard"}
        onchange={handleChange}
      />
   <div className="w-24">
   <Button
      btnText={'Reset'}
      width={24}
      textColor={'white'}
      backgroundColor={'bg-blue'}
      padding={'p-2'}
      onClick={handleResetButton}
      ></Button>
   </div>
    </div>
  } 

  <div className="flex space-x-2 items-center mt-5">
  <Person2Icon  sx={{ fontSize: 25}}/>
  <p className="text-blue cursor-pointer" >Add Profile Picture</p>
  </div>
    </div>
  );
};

export default Settings;
