// export const BASE_URL = "http://118.179.197.118:4043/api";
 //export const BASE_URL = "http://192.168.0.40:4040/api";
export const BASE_URL = "https://tillerbd.com:4040/api";
import axios from "axios";

const authJWT = {
  login: async (user) => {
    const loginData = await axios.post(`${BASE_URL}/auth/login`, user);
    return loginData.data;
  },

};

export default authJWT;
