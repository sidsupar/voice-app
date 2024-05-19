import { StatusCodes, UserSignUp } from "@repo/types"
import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function signUpMethod(userData: UserSignUp): Promise<{loading:boolean, message:string}>{
    let loading = false;
    console.log("SignUp called")
    try{

        const res = await axios.post(`${BASE_URL}/api/v1/user/signup`, userData,{
            //Won't throw error on getting responses in this range
            validateStatus: status => (status >= 200 && status < 600)
        });
        if(res.status != StatusCodes.created){
            throw new Error(res.data.error);
        }
        if("user" in res.data && "id" in res.data.user){
            return {loading, message:res.data.msg as string + "with userId: "+res.data.user?.id }
        }            
        loading = true;
        
        return {loading, message:res.data.msg}

    }catch(err:any){
        console.log("Error occured in Signup hook: "+err.message);
        loading=false;
        return {loading, message:err.message}
    }

}