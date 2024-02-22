const BASE_URL = "http://192.168.0.40:4040/api";
import axios from "axios";

const authJWT = {
  // login: async(user)=>{
  //     console.log('user,',user);
  //     return await fetch(`${BASE_URL}/employee/login`,{
  //         method:'POST',
  //         // credentials:'include',
  //         // mode:'cors',
  //         headers: { 'Content-Type': 'application/json' },
  //         body:{
  //             "email": "magfurrume.tiller@gmail.com",
  //             "password": "123456"
  //         },
  //     })
  //     .then(res=>console.log(res))
  //     .catch(err=> console.log(err));
  // }

  login: async (user) => {
    const data = await axios.post(
      "http://192.168.0.40:4040/api/employee/login",
    user
    );
    console.log(data);
  },
};
export default authJWT;
