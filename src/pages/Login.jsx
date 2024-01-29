import InputField from "../components/InputField";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
const navigate = useNavigate();

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
   const handleSubmit = (event) => {

    event.preventDefault();
 
    if(email && password){
      navigate('/dashboard')
   }
   else{
     console.error('email does not exist');
   }
  };

useEffect(()=>{
localStorage.setItem('email',JSON.stringify(email));

},[logInData]);

// const handleSubmitClick=()=>{


// }
  return (
    <div>
      <div className="bg-gradient-to-tr from-green-200 to-green-400 h-screen w-full flex justify-center items-center">
        <div className="bg-green-300 w-full sm:w-1/2 md:w-9/12 lg:w-1/2 shadow-md flex flex-col md:flex-row items-center mx-5 sm:m-0 rounded">
          <div className="w-full md:w-1/2 hidden md:flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl">Hello</h1>
            <p className="text-5xl font-extrabold">Welcome!</p>
          </div>
          <div className="bg-white w-full md:w-1/2 flex flex-col items-center py-32 px-8">
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
                bgColor="green-300"
                fontSize="bold"
                textColor="white"
                btnText="submit"
                width="full"
                type='submit'
                // onClick={handleSubmitClick}
              />
          
            </form>
  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
