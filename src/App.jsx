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
import { MyContext } from "./context api/Context";
import { useState } from "react";
import Employee_summary from "./pages/Employee_summary";
import Overview from "./pages/Overview";
import { SnackbarProvider } from "notistack";
import CommonTable from "./components/CommonTable";
import {Manager_Leave_History} from './pages/Manager_Data';
import {Manager_Team_Leave_Info} from './pages/Manager_Data';
function App() {
  const [allFormData, setAllFormData] = useState([]);
  return (
    <div className="">
      <Router>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={2000}
          maxSnack={3}
          dense={true}
        >
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />

              <Route
                path="leave-application"
                element={
                  <MyContext.Provider value={{ allFormData, setAllFormData }}>
                    <Leave_Application />
                  </MyContext.Provider>
                }
              />
              <Route
                path="request-history"
                element={
                  <MyContext.Provider value={{ allFormData }}>
                    <Request_History />
                    
                  </MyContext.Provider>
                }
              />
              <Route   path="manager_leave_history" element={<Manager_Leave_History/>} />
              <Route   path="manager_team_leave_info" element={<Manager_Team_Leave_Info/>} />
              <Route path="leave-approval" element={<Leave_Approval />}>
      <Route
                  path="view-details"
                  element={<Employee_summary />}
                ></Route>
              </Route>

              <Route
                path="view-employee-details"
                element={<Leave_Details />}
              ></Route>
            </Route>

            <Route path="*" element={<No_Match />}></Route>
            
          </Routes>
        </SnackbarProvider>
      </Router>
    </div>
  );
}

export default App;
