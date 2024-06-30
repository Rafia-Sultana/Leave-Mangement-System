import React from "react";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import authJWT from "../../services/auth.jsx";
import { getYear } from "../../utils/FormateDate.js";
import gif from "../../assets/Deadline.gif";
import tillerLogo from "../../assets/tiller-logo-black.png";
import Cookies from "js-cookie";
import TextInput from "../../components/InputFields/TextInput.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const initialState = {
    email: "",
    password: "",
  };

  const [logInData, setLogInData] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogInData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await authJWT.login(logInData);
      const { token, userInfo } = data;

      if (userInfo && token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        const shortToken = Cookies.get("shortToken");
        Cookies.remove("shortToken", { value: shortToken });

        enqueueSnackbar(`loggedIn Successfully`, {
          variant: "success",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      localStorage.removeItem("acccessToken");
      console.error("Error  logging in :", error);

      enqueueSnackbar(`${error.response.data.error}`, {
        variant: "error",
      });
    }
  };

  return (
    <div className="bg-[#DCF3FF]">
        <img
    src={tillerLogo}
    alt=""
    className="size-10 object-cover"
  />
        <div className=" h-screen w-full flex justify-center items-center relative">
      
<div className="flex justify-center items-center h-full w-full">
  {/* <img
    src={tillerLogo}
    alt=""
    className="h-1/2 hidden w-3/4 lg:block lg:w-[40%] xl:w-[25%] object-cover"
  /> */}

  <div className="bg-[#b7def4] h-1/2 w-3/4 lg:w-[40%] xl:w-[25%] flex flex-col justify-center items-center relative">
    <h3 className="text-3xl font-bold text-blue-lightest mb-4">LOGIN</h3>
    <form action="#" className="w-3/4 space-y-3 " onSubmit={handleSubmit}>
      {/* <InputField
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={handleChange}
      /> */}
      <TextInput    
       type="email"
       name="email"
       placeholder="Email"
       onchange={handleChange}
      
      />
      <TextInput
      type="password"
      name="password"
      placeholder="Password"
      onchange={handleChange}
      
      />
      {/* <InputField
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      /> */}
      <Button
        fontWeight="bold"
        btnText="Submit"
        width="full"
        type="submit"
        backgroundColor={"bg-blue-lightest"}
        padding={"p-3"}
      >
        SUBMIT
      </Button>
    </form>
  </div>
</div>

</div>
<p className="absolute bottom-[4%] left-1/2 transform -translate-x-1/2 ">
  Copyright © {getYear(new Date())} Tiller | All rights Reserved.
</p>
    </div>
  
  );
};

export default Login;
