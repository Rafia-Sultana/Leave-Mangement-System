import AccordionInput from "../components/Accordion";
import AddEmployee from "../pages/AddEmployee";
import {Employee_Leave_Request } from "../pages/Employee_Data";
import { HR_Leave_Request, HR_others_leave_history } from "../pages/HR_Data";
import Leave_Application from "../pages/Leave_Application";
import ManageEmployeeTable from "../pages/ManageEmployeeTable";
import ManageHoliday from "../pages/ManageHoliday";
import { Edit_Leave_Application, Manager_Leave_Request, Manager_Team_Leave_Info, Manager_View_Each_TeamMember_Leave_Info } from "../pages/Manager_Data";
import OnLeave from "../pages/OnLeave";
import Settings from "../pages/Settings";

import ViewAddEmpDetails from "../pages/ViewAddEmpDetails";


const createRoute = (path, element) =>{
    return {path:path , element:element}
}

const routes = [
  createRoute("leave-application", Leave_Application),
  createRoute("request-history", Employee_Leave_Request),
  createRoute("hr-leave-request", HR_Leave_Request),
  createRoute("hr_others_leave_history", HR_others_leave_history),
  createRoute("hr-add-employee", AddEmployee),
  createRoute("hr-add-holiday", ManageHoliday),
  createRoute("manage-employee",ManageEmployeeTable),
  createRoute("view-add-emp/:empId",ViewAddEmpDetails),
  createRoute("manager_team_leave_info", Manager_Team_Leave_Info),
  createRoute("view-teamMember-leave-info/:empId", Manager_View_Each_TeamMember_Leave_Info),
  createRoute("manager_edit_leave_application", Edit_Leave_Application),
  createRoute("manager-leave-request", Manager_Leave_Request),
  createRoute("settings/:id",Settings),
  createRoute("hr-add-accordion-form",AccordionInput),
  createRoute("hr-view-on-leave",OnLeave),
  
];

  export default routes;