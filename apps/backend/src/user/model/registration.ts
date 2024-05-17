import { StatusCodes, UserSignUp } from "@repo/types";
import prisma from "@repo/db/config";

export async function registerUser(body:UserSignUp): Promise<object>{
    console.log("Registering user...");
    try{
        const user = await prisma.user.create({
            data:body,
            select:{
                id:true
            }
        });
        console.log(Object.entries(user));
        if(!user?.id){
            throw new Error("Not able to create user",{cause:StatusCodes.serviceUnavailable});
        }

        console.log("Registered successfully")   ;
        console.log("userId: "+user?.id);
        return user;
    }catch(err:any){
        return err;
    }
}