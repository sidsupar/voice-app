import { StatusCodes, UserSignIn, UserSignUp } from "@repo/types";
import prisma from "@repo/db/config";

export async function loginUser(body:UserSignIn): Promise<object>{
    console.log("Logging in the user...");
    console.log(body);
    try{
        //Db call
        const user = await prisma.user.findFirst({
            //@ts-ignore
            where:body,
            select:{
                id:true,
                email:true,
                name:true,
                address:true,
                mob:true
            }
        });
        console.log(Object.entries(user ?? {}));

        if(!user?.id){
            throw new Error("Whoopsie!!, not able to log you in",{cause:StatusCodes.serviceUnavailable});
        }

        console.log("Logged In successfully")   ;
        console.log("userId: "+user?.id);
        return {...user, mob:Number(user.mob)};
    }catch(err:any){
        console.log("Error occured in Model login_user.ts "+err.message);
        throw new Error(err.message, {cause:err.cause});
    }
}