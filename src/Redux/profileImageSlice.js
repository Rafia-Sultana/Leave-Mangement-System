import { createSlice } from "@reduxjs/toolkit";

const profileImageSlice = createSlice({
    name: "profileImage",
    initialState: {
        profileImage: null,
   
    },
    reducers: {
        setProfileImage: (state, action) => {
        state.profileImage = action.payload;
        }
    }
});

export const {setProfileImage} = profileImageSlice.actions;
export default profileImageSlice.reducer;