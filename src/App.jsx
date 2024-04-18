import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Outlet,
} from "react-router-dom";
import Leave_Application from "./pages/Leave_Application";
import Request_History from "./pages/Request_History";
import Login from "./pages/Login";
import No_Match from "./pages/No_Match";
import Leave_Approval from "./pages/Leave_Approval";
import Leave_Details from "./pages/Leave_Details";
// import { MyContext } from "./context api/Context";
import { useState } from "react";
import Employee_summary from "./pages/Employee_summary";
import Overview from "./pages/Overview";
import { SnackbarProvider } from "notistack";
import CommonTable from "./components/CommonTable";
import { Edit_Leave_Application, Manager_Leave_History, Manager_View_Each_TeamMember_Leave_Info } from "./pages/Manager_Data";
import { HR_Leave_History, HR_Leave_Request } from "./pages/HR_Data";
import { Manager_Team_Leave_Info } from "./pages/Manager_Data";
import { Manager_Leave_Request } from "./pages/Manager_Data";
import { Employee_Leave_Request } from "./pages/Employee_Data";
import { Employee_Leave_History } from "./pages/Employee_Data";
import { UserProvider } from "./context api/Context.jsx";
import {HR_others_leave_history} from './pages/HR_Data.jsx'

function App() {
  // const [allFormData, setAllFormData] = useState([]);
  return (
    <div>

      <Router>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2000}
          maxSnack={3}
          dense={true}
        >
          <UserProvider>

            <Routes>
              <Route path="/" element={<Login />}></Route>

              <Route path="dashboard" element={<Dashboard />}>
                <Route index element={<Overview />} />

                <Route
                  path="leave-application"
                  element={
        
                    <Leave_Application />
        
                  }
                />
                <Route
                  path="request-history"
                  element={<Employee_Leave_Request />}
                >
                 
                  <Route
                    path="view-employee-details"
                    element={<Leave_Details />}
                  ></Route>
                </Route>

                <Route
                  path="manager_leave_history"
                  element={<Manager_Leave_History />}
                />
                <Route path="hr_leave_history" element={<HR_Leave_History />} />
                <Route path="hr-leave-request" element={<HR_Leave_Request />} />
                <Route path="hr_others_leave_history" element={<HR_others_leave_history />} />
                <Route
                  path="manager_team_leave_info"
                  element={<Manager_Team_Leave_Info />}
                />
                <Route
                  path="manager_view_each_teamMember_leave_info"
                  element={<Manager_View_Each_TeamMember_Leave_Info />}
                />
                <Route
                  path="manager_edit_leave_application"
                  element={<Edit_Leave_Application  />}
                />
                <Route
                  path="manager-leave-request"
                  element={<Manager_Leave_Request />}
                />
                <Route
                  path="employee-leave-history"
                  element={<Employee_Leave_History />}
                />
                <Route
                  path="leave-approval"
                  element={<Leave_Approval />}
                ></Route>
              </Route>

              <Route path="*" element={<No_Match />}></Route>
            </Routes>
          </UserProvider>
        </SnackbarProvider>
      </Router>
    </div>
  );
}

export default App;
