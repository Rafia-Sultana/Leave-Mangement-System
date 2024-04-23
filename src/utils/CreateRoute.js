import { Employee_Leave_History, Employee_Leave_Request } from "../pages/Employee_Data";
import { HR_Leave_History, HR_Leave_Request, HR_others_leave_history } from "../pages/HR_Data";
import Leave_Application from "../pages/Leave_Application";
import Leave_Approval from "../pages/Leave_Approval";
import { Edit_Leave_Application, Manager_Leave_History, Manager_Leave_Request, Manager_Team_Leave_Info, Manager_View_Each_TeamMember_Leave_Info } from "../pages/Manager_Data";


const createRoute = (path, element) =>{
    return {path:path , element:element}
}

const routes = [
  createRoute("leave-application", Leave_Application),
  createRoute("request-history", Employee_Leave_Request),
  createRoute("manager_leave_history", Manager_Leave_History),
  createRoute("hr_leave_history", HR_Leave_History),
  createRoute("hr-leave-request", HR_Leave_Request),
  createRoute("hr_others_leave_history", HR_others_leave_history),
  createRoute("manager_team_leave_info", Manager_Team_Leave_Info),
  createRoute("manager_view_each_teamMember_leave_info", Manager_View_Each_TeamMember_Leave_Info),
  createRoute("manager_edit_leave_application", Edit_Leave_Application),
  createRoute("manager-leave-request", Manager_Leave_Request),
  createRoute("employee-leave-history", Employee_Leave_History),
  createRoute("leave-approval", Leave_Approval)
];

  export default routes;