import { useNavigate } from "react-router-dom";

    const userInfoData = JSON.parse(localStorage.getItem("userInfo"));
  const navigate =  useNavigate();

// if(userInfoData){
//     return userInfoData;
// }else{
// navigate('/login')
// }
 export  const userId = userInfoData?.emp_id;
 export  const role = userInfoData?.role;