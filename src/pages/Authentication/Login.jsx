import React, { useEffect } from "react";
import InputField from "../../components/InputField.jsx";
import Button from "../../components/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import authJWT from "../../services/auth.jsx";
import { getYear } from "../../utils/FormateDate.js";
import gif from "../../assets/Deadline.gif";
import camera from "../../assets/camera.png";
import tillerLogo from "../../assets/tiller-logo-black.png";
import Cookies from "js-cookie";
import TextInput from "../../components/InputFields/TextInput.jsx";


const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const images = [gif, camera, tillerLogo]

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

      enqueueSnackbar(`${error.message}`, {
        variant: "error",
      });
    }
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 10000); // Change the interval duration as needed

  //   return () => clearInterval(interval);
  // }, [images]);
  return (
    <div className="bg-[#DCF3FF] h-screen flex flex-wrap items-center justify-center">
      <div className="bg-[#b7def4] h-1/2 w-3/4 lg:w-[40%] xl:w-[25%] flex flex-col justify-center items-center 
      relative">
        <h3 className="text-2xl font-bold text-blue-lightest absolute top-5">LOGIN</h3>

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

      <div className="absolute bottom-5">
        <div className="flex flex-wrap items-center justify-center gap-[1.2%] space-y-2">
          <img src={tillerLogo} alt="" className="size-5 object-cover" />
          <p className="font-semibold text-sm">Tiller</p>
        </div>
        <p className="text-xs">
          Copyright © {getYear(new Date())} Tiller | All rights Reserved.
        </p>

        <div className="">
   
        


      </div>
      </div>


      
    </div>
  );
};

export default Login;
