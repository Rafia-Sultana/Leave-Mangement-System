import React, { useContext } from "react";
import InputField from "../components/InputField.jsx";
import Button from "../components/Button.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import authJWT from "../services/auth.jsx";
import Cookies from 'js-cookie';
import { UserContext } from "../context api/Context.jsx";

const Login = () => {
  const {setUserInfo}= useContext(UserContext);
const navigate = useNavigate();
const { enqueueSnackbar } = useSnackbar();

   const initialState= {
    email:'',
    password:''
   }
   const [logInData,setLogInData] = useState(initialState);
   const handleChange = (event) =>{
    const {name,value} = event.target;
    setLogInData((prevFormData)=> ({...prevFormData, [name]:value}))
  }

  const {email,password}=logInData;
   const handleSubmit = async (event) => {

    event.preventDefault();
    // localStorage.setItem('email',JSON.stringify(email));
    // navigate('/dashboard')
    let data = await authJWT.login(logInData);
     let {token, userInfo} = data;
     
     if(userInfo){
      localStorage.setItem('userInfo',JSON.stringify(userInfo));
    //  setUserInfo((prev)=>[...prev, userInfo]);
      setUserInfo(userInfo);
      enqueueSnackbar('Logged In Succesfully!',{variant:'success'})

      setTimeout(() => {
         navigate('/dashboard')
      }, 500);
   }
   else{
     console.error('email does not exist');
   }
 
     if(token){
      Cookies.set('accessToken', token);
     }
     else{
      // navigate('/')
      console.error(console.error());
     }

  };

useEffect(()=>{
// localStorage.setItem('email',JSON.stringify(email));
// console.log(logInData);
},[logInData]);

// const handleSubmitClick=()=>{


// }

function getGreetings() {
  const currentTime = new Date();
  const currentHour =  currentTime.getHours();
 if(currentHour >= 5 && currentHour<12){
  return 'Morning'
 }
 else if(currentHour>=12 && currentHour<18){
return 'Afternoon'
 }
 else{
  return 'Evening'
 }
}



  return (
    <div className="">
   
      <div className="bg-[#dff1e0] h-screen w-full flex flex-col   justify-center items-center relative">
        <div className="bg-green  w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
          <div className=" md:w-1/2 hidden md:flex flex-col justify-center  text-white pl-4">
          <p className="text-2xl font-semibold">Good {getGreetings()}...
          <br/>
          Manage Your Leave Effortlessly!
          
          </p>

            <p className="text-3xl font-bold"></p>
          </div>
          <div className="bg-white w-full    md:w-1/2 flex flex-col items-center py-32 px-8 ">
            <h3 className="text-3xl font-bold text-green-300 mb-4">LOGIN</h3>

   <form action="#" className="w-full flex flex-col justify-center gap-5" 
        onSubmit={handleSubmit}    
            
            >
              <InputField 
              type="email"
              name='email'
              id='email'
              placeholder="Email"
              
              onChange={handleChange}
            
              />
         

              <InputField 
              type="password"
              name='password'
              placeholder="Password" 
              onChange={handleChange}
              
              />

              <Button
               
                fontSize="bold"
                textColor="white"
                btnText="Submit"
                width="full"
                type='submit'
                bg="green"
                // onClick={handleSubmitClick}
              />
            
            </form>
  
          </div>
        </div>
        <p className="absolute bottom-5">Legal and policies 2024 Tiller. All rights Reserved.</p>
      </div>

    </div>
  );
};

export default Login;
