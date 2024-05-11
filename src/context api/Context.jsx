
import { createContext,useState } from "react";

export const UserContext = createContext('');

export const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState([]);
    const [openSnackBar, setOpenSnackbar]= useState(false);
    
    const handleSnackBarClose=(reason)=>{
        if(reason=='clickaway'){
          return;
        }
        setOpenSnackbar(false);
      }

return (
    <UserContext.Provider value={{userInfo, setUserInfo,openSnackBar,setOpenSnackbar, handleSnackBarClose}} >
     {children}
    </UserContext.Provider> 
)
}


