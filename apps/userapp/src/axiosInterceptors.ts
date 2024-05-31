import { StatusCodes } from "@repo/types";
import axios from "axios";
import { redirect } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const USER_ROUTE = import.meta.env.VITE_USER_ROUTE;

// axios.interceptors.response.clear();

export const refreshInterceptor = axios.interceptors.response.use(function (response){
    return response;
},
async function (error) {
const originalRequest = error.config
console.log("Error, trying refreshing your credentials------------------------------");
console.log(error)
console.log(`retry in originalrequest = ${originalRequest._retry}`);
if(error.response.status == StatusCodes.forbidden && !originalRequest._retry){
  try{    
    console.log("Calling refresh interceptor request");
    originalRequest._retry = true;
    const res = await axios.post(`${BASE_URL}/${USER_ROUTE}/refreshToken`,{
                                    validateStatus: (status:number) => (status >= 200 && status < 600)
                      });              
    console.log("res in iterceptor---------------------******************_----------------------");
    console.log(res);
    console.log("res in iterceptor---------------------******************_----------------------");
    if("status" in res){
      if(res?.status != StatusCodes.accepted){
        console.log("redirecting you to auth route")
        redirect("/auth");
        location.reload();
        throw new Error("Your login credentials has expired");
        // return axios(res);
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




/*
fetch("http://localhost:3449/api/v1/user/auth/refreshToken", {
  "headers": {
    "accept": "application/json, text/plain, ",
    "accept-language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6,eo;q=0.5,az;q=0.4,af;q=0.3,he;q=0.2",
    "content-type": "application/json",
    "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "cookie": "_ga=GA1.1.866957898.1712933543; _ga_3Z2X5XN9DG=GS1.1.1712944958.2.1.1712946529.0.0.0; g_state={\"i_l\":0}",
    "Referer": "http://localhost:5173/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{}",
  "method": "POST"
});
*/