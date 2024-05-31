import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatusCodes } from "@repo/types";
import axios from "axios";
import { AppDispatch, RootState } from "./store";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USER_ROUTE = import.meta.env.VITE_USER_ROUTE;

type ThunkApiConfig = {
    state: RootState,
    dispatch: AppDispatch
}

//thunk to chek login status
export const checkUserLoginStatusThunk:AsyncThunk<ReturnType<any>, string, ThunkApiConfig>= createAsyncThunk("user/loginStatus", async () => {

    try{
        const res = await axios.get(`${BASE_URL}/${USER_ROUTE}/loginStatus`);
        if(!(res.status == StatusCodes.ok)){
            throw new Error("User not logged In");
        }
        return true;
    }catch(err:any){
        return false;
    }

});

type UserDetails = {
    mob?: string
    name?: string | undefined
    email?: string | undefined
    address?: string | undefined
    loginStatus?:boolean | undefined
}

const initialState:UserDetails = {
    mob: "",
    name: "",
    email: "",
    address: "",
    loginStatus:false
}

const userDataSlice = createSlice({
    name:"UserDetails",
    initialState,
    reducers:{
        setUserDetails: (state, action) => {
            const payload = action.payload;
            state.address = payload.address;
            state.mob = payload.mob;
            state.email = payload.email;
            state.name = payload.name;
            state.loginStatus = payload.loginStatus;
        }
    },
    extraReducers:(Builder) => {
        Builder.addCase(checkUserLoginStatusThunk.pending, (state, action) => {
            state.loginStatus = action.payload
        }),
        Builder.addCase(checkUserLoginStatusThunk.fulfilled, (state, action) => {
            state.loginStatus = action.payload
        }),
        Builder.addCase(checkUserLoginStatusThunk.rejected, (state, action) => {
            state.loginStatus = action.payload as boolean;
        })
    }
});

export const { setUserDetails } = userDataSlice.actions;
export const userReducer = userDataSlice.reducer;
export const setUserDetailsState = (state:RootState) => state.userDetails;