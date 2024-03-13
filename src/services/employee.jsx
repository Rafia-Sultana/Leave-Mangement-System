import { BASE_URL } from "./auth";
import axios from "axios";
import Cookies from "js-cookie";


const getToken = ()=>{
  return  localStorage.getItem('accessToken');
}

// Reusable Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
},
});



// Error handling function
const handleRequestError = (error, errorMessage) => {
  console.error(errorMessage, error);
  throw error;
};

// Function to make GET requests
const getRequest = async (url, errorMessage) => {
  try {
    const token = getToken(); 
    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error == "Token expired") {
    } else handleRequestError(error, errorMessage);
  }
};
const postRequest = async (url, params,errorMessage) => {
  try {
    const token = getToken(); 
    const response = await axiosInstance.post(url, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
 handleRequestError(error, errorMessage);
  }
};

const employee = {
  basicInfo: async (userId) => {
    return getRequest(
      `/employee/basic/${userId}`,
      "Error fetching basic info:"
    );
  },

  leaveRequestSummary: async (userId) => {
    return getRequest(
      `/leave/stat/${userId}`,
      "Error fetching leave request summary:"
    );
  },

  calenderHoilday: async () => {
    return getRequest("/calender/holiday", "Error fetching calendar holiday:");
  },

  leaveDates: async (userId) => {
    return getRequest(
      `/leave/dates/${userId}`,
      "Error fetching leave dates data:"
    );
  },

  leaveDatesByMonth: async (userId, monthId) => {
    // console.log(monthId);
    return getRequest(
      `/leave/dates/${userId}?month=${monthId}`,
      "Error fetching leave dates by month data:"
    );
  },

  getLeaveTypes: async () => {
    return getRequest("/leave/types", "Error fetching leave types:");
  },


  // http://192.168.0.40:4040/api/auth/logout
  logOut: async () => {
   return postRequest("/auth/logout",{}, "Error Fetching while log out ");
  },

  // http://ip:4040/api/employee/teammembers/{userId}
  getTeamMembersOfUser: async (userId) => {
    return getRequest(
      `/employee/teammembers/${userId}`,
      "Error fetching get Team Members Of User:"
    );
  },

  postLeaveApplication: async(leaveInfo) =>{
    // console.log('leaveInfo',leaveInfo);
    return postRequest(
      `/leave/apply`,  leaveInfo, "Error fetching to post leave infos Of User:" 
    )
  }
,

  // http://ip:4040/api/leave/emp_history/{userId}
  getEmployeeRequestHistory: async(userId)=>{
    
  return getRequest(`/leave/emp_history/${userId}`,"Error Fetching to get employee request history")
  }

};

export default employee;
