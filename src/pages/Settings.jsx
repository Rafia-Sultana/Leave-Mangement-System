import React, { useContext, useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../components/InputFields/TextInput";
import Button from "../components/Button";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { UserContext } from "../context api/Context";
import ShowSnackbar from "../components/ShowSnackbar";
import Person2Icon from "@mui/icons-material/Person2";
import employee from "../services/employee";
// import validator from "validator";

const Settings = () => {
  const { id } = useParams();
  const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfoData?.emp_id;
  const navigate = useNavigate();
  const { openSnackBar, setOpenSnackbar, handleSnackBarClose } =
    useContext(UserContext);
  const initialState = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const [show, setShow] = useState(true);
  const [changePass, setChangePass] = useState(initialState);
  const [error, setError] = useState("");
  const [match, setMatch] = useState("");

  const validate = (value) => {
    if (value.length >= 6) {
    
      setError("");
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
        const { confirm_password, ...changePassWithoutConfirm } = changePass;

        const res = await employee.changePassword({
          ...changePassWithoutConfirm,
          userId: userId,
        });

        localStorage.setItem("accessToken", token);
        setChangePass(initialState);
        setOpenSnackbar(true);
      } catch (error) {}
    }
  };
  return (
    <div>
      {
        <ShowSnackbar
          open={openSnackBar}
          handleClose={handleSnackBarClose}
          text={"Password Changed SuccessFully!"}
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
          {/*    {error && <p className="text-red">{error.characterValidation}</p>} */}
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
              btnText={"Reset"}
              width={24}
              textColor={"white"}
              backgroundColor={"bg-blue"}
              padding={"p-2"}
              onClick={handleResetButton}
            ></Button>
          </div>
        </div>
      )}

      <div className="flex space-x-2 items-center mt-5">
        <Person2Icon sx={{ fontSize: 25 }} />
        <p className="text-blue cursor-pointer">Add Profile Picture</p>
      </div>
    </div>
  );
};

export default Settings;
