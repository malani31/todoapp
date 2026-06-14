import {createSlice} from '@reduxjs/toolkit';   

// we have foure state that will be used all over the website
const intialState={
    user:null,
    userId:null,
    token:null,
    picture:null
}

const userSlice=createSlice({
    name:"user",
    initialState:intialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setUserId:(state,action)=>{
            state.userId=action.payload;
        },
        setToken:(state,action)=>{
            state.token=action.payload;
        },
        setPicture:(state,action)=>{
            state.picture=action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.userId = null;
            state.token = null;
            state.picture = null;
        }
       
       
    }
})

export const {setUser,setPicture,setToken,setUserId,clearUser}=userSlice.actions;
export default userSlice.reducer;