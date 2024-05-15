export const BASE_URL = "http://118.179.197.118:4043/api";
import axios from "axios";

const authJWT = {
  login: async (user) => {
    const loginData = await axios.post(`${BASE_URL}/auth/login`, user);
    return loginData.data;
  },
};

export default authJWT;
