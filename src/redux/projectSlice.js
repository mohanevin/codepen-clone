import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name:"projects",
    initialState:null,
    reducers:{
        addProjects:(state,action)=>{
            return action.payload
        },
        removeProjects:(state,action)=>{
            return null
        }
    }
})

export const {addProjects,removeProjects}=projectSlice.actions

export default projectSlice.reducer;