import { StatusCodes, UserSignUp } from "@repo/types";
import prisma from "@repo/db/config";

export async function registerUser(body:UserSignUp): Promise<object>{
    console.log("Registering user...");
    try{
        const user = await prisma.user.create({
            //@ts-ignore
            data:body,
            select:{
                id:true
            }
        });
        console.log("user in registration model: recieved: ");
        console.log(user);

        if(!user?.id){
            throw new Error("Not able to create user",{cause:StatusCodes.serviceUnavailable});
        }

        console.log("Registered successfully")   ;
        console.log("userId: "+user?.id);
        return user;
    }catch(err:any){
        console.log(`error in registering user... ${err.message}`);
        if("code" in err && err.code == "P2002"){
            throw new Error("A user with same credentials already exist", {cause:err.cause ?? StatusCodes.conflict});    
        }
        throw new Error(err.message, {cause:err.cause ?? StatusCodes.serviceUnavailable});
    }
}

