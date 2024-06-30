import { createContext,useState } from "react";
export const profileImageContext = createContext("");


export const ProfileImageProvider = ({})=>{
    const [profileImgp, setProfileImgp] = useState(null);
    return(
        <profileImageContext.Provider value={{profileImgp,setProfileImgp}}>
            {children}
        </profileImageContext.Provider>
    )
}