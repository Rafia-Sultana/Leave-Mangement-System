import { createContext,useState } from "react";
export const UserContext = createContext('');

export const UserProvider = ({children}) => {
    const [loading, setLoading] = useState(true); 
    // const [profileImg, setProfileImg] = useState(null);


    const delayedLoading = (value) =>{
        setLoading(value);
        if(value === false){
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }
   return (
    <UserContext.Provider 
    value={{loading, setLoading:delayedLoading }} >
     {children}
    </UserContext.Provider> 
)
}


