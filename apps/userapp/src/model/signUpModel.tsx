import { StatusCodes, UserSignUp } from "@repo/types"
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USER_ROUTE = import.meta.env.VITE_USER_ROUTE;

export default async function signUpMethod(userData: UserSignUp): Promise<{status:string, message:string}>{
    console.log("SignUp called");
    console.log(`making call to ${BASE_URL}/${USER_ROUTE}/signup`)
    try{
        const res = await axios.post(`${BASE_URL}/${USER_ROUTE}/signup`, userData,{
            //Won't throw error on getting responses in this range
            validateStatus: status => (status >= 200 && status < 600)
        });
        
        await new Promise((res) => {
            setTimeout(()=> {
                res(true);
            },2000);
        })

        if(res.status != StatusCodes.created){
            console.log(res.status)
            if(res.status == StatusCodes.invalidInput){
                const errMessage=JSON.parse(res.data.error);
                console.log(errMessage)
                let errorMsg=""
                //@ts-ignore
                errMessage.map(msg => errorMsg += `[{${msg?.path}: ${msg?.message}]}, `);               
                throw new Error(errorMsg);
            }

            throw new Error(res.data.error.toString());
        }
        if("user" in res.data && "id" in res.data.user){
            return {status:"success", message:res.data.msg as string + "with userId: "+res.data.user?.id }
        }            
        
        return {status:"success",message:res.data.msg}

    }catch(err:any){
        console.log("Error occured in Signup hook: "+err.message);
        
        return {status:"error", message:err.message}
    }

}