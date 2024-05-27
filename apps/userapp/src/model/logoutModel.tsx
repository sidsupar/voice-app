import { StatusCodes } from "@repo/types";
import axios from "axios"
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL
const USER_ROUTE = import.meta.env.VITE_USER_ROUTE

export default async function logoutModel(): Promise<[boolean, boolean]>{
    let loading = true;
    let status = false;
    try{
        const response = await axios.get(`${BASE_URL}/${USER_ROUTE}/logout`);
        if(!(response.status == StatusCodes.accepted)){
            throw new Error("Not able to log you out");
        }
        
        await new Promise((res) => {
                setTimeout(()=>{
                    res(true)
                },2000);
        })

        loading = (false);
        status = true
        
        return [loading, status]
    }catch(err:any){
        console.log(err.message);
        return [false, false];
    }

}