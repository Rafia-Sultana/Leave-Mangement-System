import React, { useContext } from "react";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import authJWT from "../services/auth.jsx";
import { UserContext } from "../context api/Context.jsx";
import { getYear } from "../utils/FormateDate.js";
import gif from '../assets/Deadline.gif'



const Login = () => {
  const { setUserInfo } =
  useContext(UserContext);
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
        setUserInfo(userInfo);
        enqueueSnackbar(`loggedIn Successfully`, {
          variant: "success",
        });
        navigate("/dashboard");
   
      } 
  
    } catch (error) {
      localStorage.removeItem("acccessToken");
      console.error("Error logging in:", error);
      enqueueSnackbar(`${error.response.data.error}`, {
        variant: "error",
      });
    }
  };

  return (
    <div className="">

      <div className="bg-[#DCF3FF] h-screen w-full flex  justify-center items-center relative">
        {/* <div className=" w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded"> */}
          {/* <div className=" md:w-1/2 hidden md:flex flex-col justify-center  text-white pl-4">
            <p className="text-2xl font-semibold">
              Manage Your Leave Effortlessly!
            </p>

            <p className="text-3xl font-bold"></p>
          </div> */}
          <img src={gif} alt="" className="h-1/2 hidden md:block  w-[25%]"/>
          <div className="bg-[#b7def4] h-1/2  w-[25%] flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold text-green-300 mb-4">LOGIN</h3>

            <form
              action="#"
              className="w-3/4 space-y-5"
              onSubmit={handleSubmit}
            >
              <InputField
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
              />

              <InputField
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />

              <Button
                fontWeight="bold"
                textColor="white"
                btnText="Submit"
                width="full"
                type="submit"
                backgroundColor={"bg-blue-lightest"}
                padding={"p-3"}
              />
            </form>
          </div>
        </div>
        <p className="absolute bottom-5">
          Copyright © {getYear(new Date())} Tiller | All rights Reserved.
        </p>
     
    </div>
  );
};

export default Login;
