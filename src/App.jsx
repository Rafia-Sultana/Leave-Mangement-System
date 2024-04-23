import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import No_Match from "./pages/No_Match";
import Overview from "./pages/Overview";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./context api/Context.jsx";
import routes from "./utils/CreateRoute.js";

function App() {
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
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={<route.element />}
                  ></Route>
                ))}
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
