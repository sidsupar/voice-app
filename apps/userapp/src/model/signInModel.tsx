import { StatusCodes, UserSignUp } from "@repo/types"
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USER_ROUTE = import.meta.env.VITE_USER_ROUTE;

type UserDataSignIn = {
    username:string,
    password:string
}

export default async function signInMethod(userData: UserDataSignIn): Promise<{status:string, message:string, user?:Partial<UserSignUp>}>{
    console.log("SignIn called");
    console.log(`making call to ${BASE_URL}/${USER_ROUTE}/signup`);
    let signinBody:{
        mob?:string,
        email?:string,
        password?:string
    } = {};
    if(userData.username.match(/^[0-9]+$/ig)){
        signinBody = {...userData, mob:userData.username}
    }else{
        signinBody = {...userData, email:userData.username}
    }
    try{
        const res = await axios.post(`${BASE_URL}/${USER_ROUTE}/signin`, signinBody,{
            //Won't throw error on getting responses in this range
            validateStatus: status => (status >= 200 && status < 600)
        });
        
        await new Promise((res) => {
            setTimeout(()=> {
                res(true);
            },2000);
        })

        if(res.status != StatusCodes.accepted){
            throw new Error(res.data.error);
        }
        if("user" in res.data && "id" in res.data.user){
            return {status:"success", user:res.data?.user, message:res.data.msg as string + "with userId: "+res.data.user?.id }
        }            
        
        return {status:"success",message:res.data.msg, user:res.data?.user}

    }catch(err:any){
        console.log("Error occured in SignIn hook: "+err.message);
        
        return {status:"error", message:err.message}
    }

}