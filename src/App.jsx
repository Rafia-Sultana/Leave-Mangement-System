import "./App.css";
import Layout from "./shared/Layout/Layout.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login.jsx";
import No_Match from "./shared/Not Found/No_Match.jsx";
import Overview from "./shared/Dashboard/Overview.jsx";
import { SnackbarProvider } from "notistack";
import { UserProvider } from "./context api/Context.jsx";
import routes from "./utils/CreateRoute.js";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import PDF_Viewer from "./Files/PDF Viewer.jsx";
import { useState } from "react";
import { CssBaseline, Switch, ThemeProvider, createTheme } from "@mui/material";

function App() {
  // const[toggleDarkMode, setToggleDarkMode] = useState(true);
  // const toggleDarkTheme = () =>{
  //   setToggleDarkMode(!toggleDarkMode);
  // }
  
  // const darkTheme = createTheme({
  //   palette :{
  //     mode: toggleDarkMode ? "light" : "dark",
  //     primary: {
  //       main: '#90caf9',
  //     },
  //     secondary: {
  //       main: '#131052',

  //     },
  //   }
  // })
  return (
    <div>
      <Router>
        {/* <ThemeProvider theme={darkTheme}> */}
  {/* <CssBaseline/> */}
  {/* <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} /> */}



  <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          maxSnack={3}
          dense={true}
        >
          {/* <UserProvider> */}
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/files/:fileId" element={<PDF_Viewer />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Layout />}>
                  <Route index element={<Overview />} />
                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.element />}
                    ></Route>
                  ))}
                </Route>
              </Route>
              <Route path="*" element={<No_Match />}></Route>
            </Routes>
          {/* </UserProvider> */}
        </SnackbarProvider>
        {/* </ThemeProvider> */}
     
      </Router>
    </div>
  );
}

export default App;
