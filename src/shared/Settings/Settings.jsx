import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";


import Button from "../../components/Button.jsx";
import Avatars from "../../components/Avatars.jsx";
import HeadLine from "../../components/HeadLine.jsx";
import TextInput from "../../components/InputFields/TextInput.jsx";

import employee from "../../services/employee.jsx";
import { setProfileImage } from "../../Redux/profileImageSlice.js";


const Settings = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const userInfoData = localStorage.getItem("userInfo");
  const parsedUserInfo = JSON.parse(userInfoData);
  const userId = parsedUserInfo?.emp_id;


  // const proImg = useSelector((state)=>state.profileImage.profileImage);
  const dispatch = useDispatch();

  const initialState = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const [show, setShow] = useState(true);
  const [changePass, setChangePass] = useState(initialState);
  const [error, setError] = useState("");
  const [match, setMatch] = useState("");
  const [currentPassError, setCurrentPassError] = useState("");
 


  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file.size / 1024 >= 500) {
      enqueueSnackbar("Image file must be less than 500kb!", {
        variant: "error",
      });
      return;
    } else {

      const formData = new FormData();
      formData.append("profile_img", file);

      let res = await employee.sendProfilePicture(formData);
      if (res.success) {
        let employeeInfo = await employee.basicInfo(userId);
       
      const newProfileImgUrl = `https://tillerbd.com:4040${employeeInfo.profile_img}?timestamp=${Date.now()}`
      dispatch(setProfileImage(newProfileImgUrl));
      enqueueSnackbar("Profile picture updated successfully!", {
          variant: "success",
        });
      }
    }
  
  };

  const validate = (value) => {
    if (value.length >= 6) {
      setError("");
      setCurrentPassError("");
      return value;
    } else {
      setError("password must contain minimum 6 length");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePass((prev) => ({
      ...prev,
      [name]: name === "new_password" ? validate(value) : value,
    }));
  };

  const handleResetButton = async () => {
    if (changePass.new_password !== changePass.confirm_password) {
      setMatch("password did not match!");
      return;
    } else {
      setMatch("");

      try {
        setCurrentPassError("");
        const { confirm_password, ...changePassWithoutConfirm } = changePass;

        const res = await employee.changePassword({
          ...changePassWithoutConfirm,
          userId: userId,
        });
         
        localStorage.setItem("accessToken", res.token);
        if(res.token){
          enqueueSnackbar("Password Changed SuccessFully!", {
            variant: "success",
          });
        }
        setChangePass(initialState);
        setSnack({
          severity: "success",
          text: "Password Changed SuccessFully!",
        });
        // setOpenSnackbar(true);
      } catch (error) {
       if(error){
        setCurrentPassError(error.response.data.error);
        enqueueSnackbar("Something went wrong!", {
          variant: "error",
        });
       }
      }
    }
  };



  return (
    <div>
 

      <HeadLine text={"Settings"}></HeadLine>

      <div className="flex items-center gap-4 mt-5">
        <div className="relative h-32 w-32 ">
 
          <Avatars width={120} height={120}/>

          <input
            type="file"
            id="imageInput"
            accept="image/*"
            style={{ display: "none", marginTop: "4rem" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Profile Picture</p>
          <p className="text-sm">PNG, JPG upto 500Kb.</p>
          <Button
          
            textColor={"blue"}
            fontWeight={"bold"}
            onClick={() => {
              document.getElementById("imageInput").click();
            }}
          >Update</Button>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-8">
        <SettingsApplicationsIcon sx={{ fontSize: 25 }} />
        <p className="text-blue cursor-pointer" onClick={() => setShow(!show)}>
          Change Password
        </p>
      </div>
      {show && (
        <div className="space-y-3">
          <TextInput
            label={"Current Password"}
            name={"current_password"}
            onChange={onchange}
            width={"35ch"}
            type={"password"}
            variant={"standard"}
            onchange={handleChange}
            value={changePass.current_password}
          />
          {currentPassError === "" ? null : (
            <span className="text-red-dark font-bold">{currentPassError}</span>
          )}
          <TextInput
            label={"New Password"}
            name={"new_password"}
            onChange={onchange}
            width={"35ch"}
            type={"password"}
            variant={"standard"}
            onchange={handleChange}
            value={changePass.new_password}
          />
          {error === "" ? null : (
            <span className="text-red-dark font-bold">{error}</span>
          )}

          <TextInput
            label={"Confirm Password"}
            name={"confirm_password"}
            onChange={onchange}
            width={"35ch"}
            type={"password"}
            variant={"standard"}
            onchange={handleChange}
            value={changePass.confirm_password}
          />
          {match === "" ? null : (
            <span className="text-red-dark font-bold">{match}</span>
          )}
          <div className="w-24">
            <Button
        
              width={24}
         
              backgroundColor={"bg-blue"}
              padding={"p-2"}
              onClick={handleResetButton}
            >Reset</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
