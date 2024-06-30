import { configureStore } from "@reduxjs/toolkit";
import profileImageReducer from "../Redux/profileImageSlice";



const store = configureStore({
    reducer:{
        profileImage: profileImageReducer
    }
    },

);
export default store;