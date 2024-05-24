import { StatusCodes } from "@repo/types";
import axios from "axios";
import { redirect } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const USER_ROUTE = import.meta.env.VITE_USER_ROUTE;

export const refreshInterceptor = axios.interceptors.response.use(function (response){
    return response
}, async function (error) {
const originalRequest = error.config
if(error.response.status == StatusCodes.forbidden && !originalRequest._retry){
  try{
    console.log("Calling refresh interceptor");
    originalRequest._retry = true;
    const res = await axios.post(`${BASE_URL}/${USER_ROUTE}/refreshToken`,{
                                    validateStatus: (status:number) => (status >= 200 && status < 600)
                      });              
    if("status" in res){
      if(res?.status != StatusCodes.accepted){
        redirect("/auth");
        location.reload();
        throw new Error("Your login credentials has expired");
      }else{
        console.log("Credentials refreshed");
      }
    }
    await new Promise((res)=>{
        setTimeout(()=>{
            res(true);
        },2000);
    })
    return axios(originalRequest);
  }catch(err){
    redirect("/auth");
    location.reload();
    console.log(err);
  }
}    
});
