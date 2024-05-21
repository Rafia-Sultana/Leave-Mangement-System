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
  console.error(error, errorMessage);
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
    const response = await axiosInstance.put(url,data,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
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
 changePassword: async (userPassInfo) => {
    return putRequest(
      `/auth/change-password`,userPassInfo,
      "Error fetching user Password info:"
    );
  },

  employeeInfo:async (userId) => {
    return getRequest(
      `/employee/${userId}`,
      "Error fetching employee info:"
    );
  },

  leaveRequestSummary: async (userId) => {
    return getRequest(
      `/employee/leave/stat/${userId}`,
      "Error fetching leave request summary:"
    );
  },

  calenderHoilday: async () => {
    return getRequest("/holiday/weekly", "Error fetching calendar holiday:");
  },

  leaveDates: async (userId) => {
    return getRequest(
      `/employee/leave/taken/dates/${userId}`,
      "Error fetching leave dates data:"
    );
  },

  leaveDatesByMonth: async (userId, monthId) => {
    return getRequest(
      `/employee/leave/taken/dates/${userId}?month=${monthId}`,
      "Error fetching leave dates by month data:"
    );
  },

  getLeaveTypes: async () => {
    return getRequest("/list/leave-types", "Error fetching leave types:");
  },
  
  getEmployeeLeaveChart: async () => {
    return getRequest("/employee/leave/chart", "Error fetching employee leave chart");
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
    // console.log('leaveInfo',leaveInfo);
    return postRequest(
      `/employee/leave/apply`,
      leaveInfo,
      "Error fetching to post leave infos Of User:"
    );
  },
  ///employee/leave/application/withdrawn/:leave_id
  putLeaveApplicationWithDrwan: async (appId) => {
  return putRequest(
      `/employee/leave/application/withdrawn/${appId}`,
       {},
      "Error fetching to put  leave application withdrawn"
    );
  },


  // http://ip:4040/api/leave/emp_history/{userId} http://IP:4040/api/leave/history/emp/{UserId}
  getEmployeeRequestHistory: async (userId) => {
    return getRequest(
      `/employee/leave/history/${userId}`,
      "Error Fetching to get employee request history"
    );
  },

  
  //http://ip:4040/api/leave/editapplication/{applicationID}
  editLeaveApplication: async(applicationID,updateInfo) =>{
   return putRequest(`/employee/leave/application/edit/${applicationID}`,updateInfo,"Error updating leave application");
    },

  //http://ip:4040/api/leave/logs/%7BApplication%20Id%7D%7D
  getLog: async (applicationId) => {
    return getRequest(
      `/employee/leave/application/log/${applicationId}`,
      "Error Fetching to get employee log"
    );
  },

  // ----------------------- Team Lead ----------------------------

  // http://ip:4040/api/leave/pendingapplication?for=teamLead
  getLeaveRequestOfTeamByTeamLead: async () => {
    return getRequest(
      `/team/leave/pending-application`,
      "Error Fetching to get Leave Request Of Team By TeamLead"
    );
  },
  //http://ip:4040/api/leave/history/team
  getLeaveHistroryOfTeam: async () => {
    return getRequest(
      `/team/leave/teams-history`,
      "Error Fetching to get Leave Request Of Team By TeamLead"
    );
  },
  //http://ip:4040/api/leave/decision?by=teamLead
  postDecisionByTeamLead: async (decison) => {
    return postRequest(
      `/team/leave/application/decision`,
      decison,
      "Error Fetching to get decision By TeamLead"
    );
  },

  getTeamRequestHistory: async (userId) => {
    return getRequest(
      `/team/leave/members-history/${userId}`,
      "Error Fetching to get employee request history"
    );
  },

  // ----------------------- HR ----------------------------

  // http://ip:4040/api/leave/decision?by=hr
  postDecisionByHR: async (decison) => {
    console.log(decison);
    return postRequest(
      `/hr/leave/application/decision`,
      decison,
      "Error Fetching to get decision By HR"
    );
  },

  //http://ip:4040/api/leave/pendingapplication?for=hr

  getLeaveRequestOfEmployeesByHR: async () => {
    return getRequest(
      `/hr/leave/pending-application`,
      "Error Fetching to get Leave Request Of Employee By HR"
    );
  },

  ///api/departments
  getDepartmentList: async () =>{
    return getRequest(`/list/departments`,
    "Error Fetching to get departments"
    )
  },

    ///api/designations
  getDesignationList: async () =>{
    return getRequest(`/list/designations`,
    "Error Fetching to get designations")
  },
  getRoleList: async () =>{
    return getRequest(`/list/roles`,
    "Error Fetching to get roles")
  },


  //http://ip:4040/api/employee/add
  addEmployee: async (employeeInfo) =>{
   return postRequest(`/hr/add-employee`,employeeInfo,"Error Fetching to add employee by hr")
  },
  //body{
// "status" : "active" / "inactive"
// }				
//  editLeaveApplication: async(applicationID,updateInfo) =>{
//   return putRequest(`/leave/editapplication/${applicationID}`,updateInfo,"Error updating leave application");
// },
// http://IP:4040/api/employee/activity/{employee_id}
  
inActiveEmployee:async(employeeId,status) =>{
  return putRequest(`/hr/employee-activity/${employeeId}`,
status,
  "Error when inactive employee")
},

//"/calender/weekly-holiday"
officeHoliday:async(holidayInfo)=>{

return postRequest("/holiday/office",holidayInfo,"Error for posting holidayInfo")
},
///holiday/office/{holiday_id}
putOfficeHoliday:async(holidayId,holidayInfo)=>{
  
return putRequest(`/holiday/office/${holidayId}`,holidayInfo,"Error for posting holidayInfo")
},

getOfficeHoliday:async()=>{
return getRequest("/holiday/office","Error for posting holidayInfo")
},


getOfficeHolidayList:async()=>{
  return getRequest("/holiday/office?count=true","Error for posting holidayInfo")
  },

//http://ip:4040/api/employee/all
getAllEmployee:async()=>{
  return getRequest("/hr/employee-list","Error for getting all employee Info");
},

getAllEmployeeLeaveHistoryByHR: async()=>{
  return getRequest("/hr/leave/all-history","Error for getting all employee  Info from hr side")
},
///hr/leave/members-history/:empId

getEachEmployeeLeaveHistoryByHR: async(empId)=>{
  return getRequest(`/hr/leave/members-history/${empId}`,"Error for getting all employee  Info from hr side")
},
};

export default employee;
