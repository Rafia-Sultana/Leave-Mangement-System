import { BASE_URL } from "./auth";
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("accessToken");
};

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

// Function to make GET requests http://ip:4040/api/leave/logs/%7BApplication%20Id%7D%7D
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
const postRequest = async (url, params, errorMessage) => {
  try {
    const token = getToken();
    const response = await axiosInstance.post(url, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;
  } catch (error) {
    handleRequestError(error, errorMessage);
  }
};

const putRequest = async(url,data,errorMessage) =>{
  try {
    const token = getToken();
    const response = await axiosInstance.put(url,data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleRequestError(error, errorMessage);
  }
}

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
    return getRequest("/calender/weekly-holiday", "Error fetching calendar holiday:");
  },

  leaveDates: async (userId) => {
    return getRequest(
      `/leave/dates/${userId}`,
      "Error fetching leave dates data:"
    );
  },

  leaveDatesByMonth: async (userId, monthId) => {
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
    return postRequest("/auth/logout", {}, "Error Fetching while log out ");
  },

  // http://ip:4040/api/employee/teammembers/{userId}
  getTeamMembersOfUser: async (userId) => {
    return getRequest(
      `/employee/teammembers/${userId}`,
      "Error fetching get Team Members Of User:"
    );
  },

  postLeaveApplication: async (leaveInfo) => {
    // ('leaveInfo',leaveInfo);
    return postRequest(
      `/leave/apply`,
      leaveInfo,
      "Error fetching to post leave infos Of User:"
    );
  },
  // http://ip:4040/api/leave/emp_history/{userId} http://IP:4040/api/leave/history/emp/{UserId}
  getEmployeeRequestHistory: async (userId) => {
    return getRequest(
      `/leave/history/emp/${userId}`,
      "Error Fetching to get employee request history"
    );
  },

  
  //http://ip:4040/api/leave/editapplication/{applicationID}
  editLeaveApplication: async(applicationID,updateInfo) =>{

    return putRequest(`/leave/editapplication/${applicationID}`,updateInfo,"Error updating leave application");
    },

  //http://ip:4040/api/leave/logs/%7BApplication%20Id%7D%7D
  getLog: async (applicationId) => {
    return getRequest(
      `/leave/log/${applicationId}`,
      "Error Fetching to get employee log"
    );
  },

  // ----------------------- Team Lead ----------------------------

  // http://ip:4040/api/leave/pendingapplication?for=teamLead
  getLeaveRequestOfTeamByTeamLead: async () => {
    return getRequest(
      `/leave/pendingapplication?for=teamLead`,
      "Error Fetching to get Leave Request Of Team By TeamLead"
    );
  },
  //http://ip:4040/api/leave/history/team
  getLeaveHistroryOfTeam: async () => {
    return getRequest(
      `/leave/history/team/count`,
      "Error Fetching to get Leave Request Of Team By TeamLead"
    );
  },
  //http://ip:4040/api/leave/decision?by=teamLead
  postDecisionByTeamLead: async (decison) => {
    return postRequest(
      `/leave/decision?by=teamLead`,
      decison,
      "Error Fetching to get decision By TeamLead"
    );
  },

  getTeamRequestHistory: async (userId) => {
    return getRequest(
      `/leave/history/team/${userId}`,
      "Error Fetching to get employee request history"
    );
  },

  // ----------------------- HR ----------------------------

  // http://ip:4040/api/leave/decision?by=hr
  postDecisionByHR: async (decison) => {
    (decison);
    return postRequest(
      `/leave/decision?by=hr`,
      decison,
      "Error Fetching to get decision By HR"
    );
  },

  //http://ip:4040/api/leave/pendingapplication?for=hr

  getLeaveRequestOfEmployeesByHR: async () => {
    return getRequest(
      `/leave/pendingapplication?for=hr`,
      "Error Fetching to get Leave Request Of Employee By HR"
    );
  },

  ///api/departments
  getDepartmentList: async () =>{
    return getRequest(`/departments`,
    "Error Fetching to get departments"
    )
  },

    ///api/designations
  getDesignationList: async () =>{
    return getRequest(`/designations`,
    "Error Fetching to get designations")
  },


  //http://ip:4040/api/employee/add
  addEmployee: async (employeeInfo) =>{
   return postRequest(`/employee/add`,employeeInfo,"Error Fetching to add employee by hr")
  },
  //body{
// "status" : "active" / "inactive"
// }				
//  editLeaveApplication: async(applicationID,updateInfo) =>{
//   return putRequest(`/leave/editapplication/${applicationID}`,updateInfo,"Error updating leave application");
// },
// http://IP:4040/api/employee/activity/{employee_id}
  
inActiveEmployee:async(employeeId,status) =>{
  (employeeId);
  return putRequest(`/employee/activity/${employeeId}`,
status,
  "Error when inactive employee")
}
,



//"/calender/weekly-holiday"
officeHoliday:async(holidayInfo)=>{
return postRequest("/calender/office-holiday",holidayInfo,"Error for posting holidayInfo")
},

//http://ip:4040/api/employee/all
getAllEmployee:async()=>{
  return getRequest("/employee/all","Error for getting all employee Info");
},

};

export default employee;
