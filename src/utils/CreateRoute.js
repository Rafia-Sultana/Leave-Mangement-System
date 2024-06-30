import AccordionInput from "../components/Accordion";
import AddEmployee from "../pages/HR/Managment/AddEmployee";
import {Employee_Leave_Request } from "../pages/Employee/Request";
import { HR_others_leave_history } from "../pages/HR/Team Leave/Leave History";
import { HR_Leave_Request} from "../pages/HR/Team Leave/Pending Request";
import Leave_Application from "../shared/Application/Leave_Application";
import {Edit_Leave_Application} from "../shared/Application/Edit Application";
import ManageEmployeeTable from "../pages/HR/Managment/ManageEmployeeTable";
import ManageHoliday from "../pages/HR/Holiday/ManageHoliday";
import {  Manager_Leave_Request } from "../pages/Team Lead/Pending Request";
import {  Manager_Team_Leave_Info} from "../pages/Team Lead/Team Info";
import { Manager_View_Each_TeamMember_Leave_Info } from "../pages/Team Lead/Team-member info";
import OnLeave from "../pages/HR/Todays Leave/OnLeave";
import Settings from "../shared/Settings/Settings";
import ViewAddEmpDetails from "../shared/Profile/ViewAddEmpDetails";
import ViewLog from "../shared/Log/ViewLog";
import TestFile from "../shared/Test"
import PDF_Viewer from "../Files/PDF Viewer";
import { Pending } from "../pages/Admin/Pending";
import { Teams_Leave_History } from "../pages/Admin/Teams Leave History";

const createRoute = (path, element) =>{
    return {path:path , element:element}
}

const routes = [
  createRoute("leave-application", Leave_Application),
  createRoute("request-history", Employee_Leave_Request),
  
  //manager routes
  createRoute("manager-team-leave-info", Manager_Team_Leave_Info),
  createRoute("manager-edit-leave-application", Edit_Leave_Application),
  createRoute("manager-leave-request", Manager_Leave_Request),
  createRoute("settings/:id", Settings),

  createRoute("view-teamMember-leave-info/:empId", Manager_View_Each_TeamMember_Leave_Info),
  createRoute("view-add-emp/:empId",ViewAddEmpDetails),
  createRoute("view-log/:empId",ViewLog),

  //hr routes
  createRoute("hr-leave-request", HR_Leave_Request),
  createRoute("hr-others-leave-history", HR_others_leave_history),
  createRoute("hr-add-employee", AddEmployee),
  createRoute("hr-add-holiday", ManageHoliday),
  createRoute("hr-add-accordion-form",AccordionInput),
  createRoute("hr-view-on-leave",OnLeave),
  createRoute("manage-employee",ManageEmployeeTable),
  createRoute("test",TestFile),

  //admin routes
  createRoute("admin-pending-request",Pending),
  createRoute("admin-others-leave-history",Teams_Leave_History)

  //files
  // createRoute("files/:fileId",PDF_Viewer),
];

  export default routes;