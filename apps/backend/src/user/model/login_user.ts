import { StatusCodes, UserSignIn, UserSignUp } from "@repo/types";
import prisma from "@repo/db/config";
import cacheData from "./cacheUserDataRedis";
import { redisClient } from "../..";
import { RedisClientType } from "redis";

export async function loginUser(body:UserSignIn): Promise<object>{
    console.log("Logging in the user...");
    console.log(body);
    try{
        let userDataFromCache: object = {};
        let user: object = {};
        //Checking for user already in cache
        if("email" in body){
            const userDataFromCacheFetched = await redisClient.get("userData:"+body.email);
            userDataFromCache = JSON.parse(userDataFromCacheFetched ?? "{}");
        }else if("mob" in body){
            const userDataFromCacheFetched = await redisClient.get("userData:"+body.mob);
            userDataFromCache = JSON.parse(userDataFromCacheFetched ?? "{}");
        }
        console.log("userDataFromCache = ")
        console.log(userDataFromCache);
        //Calling DB only if user is not in cache
        if(!("id" in userDataFromCache)){
                //Db call
            console.log("Db callling for user signin check")                
            const userFetched = await prisma.user.findFirst({
                //@ts-ignore
                where:{
                    OR:[{mob:Number(body.mob) ?? -1},
                        {email:body.email ?? ""}]
                },
                select:{
                    id:true,
                    email:true,
                    name:true,
                    address:true,
                    mob:true,
                    password:true
                }
            });

            console.log(Object.entries(userFetched ?? {}));
            user = {...userFetched, mob:Number(userFetched?.mob)}
            if(userFetched != null && !("id" in userFetched)){
                throw new Error("User not found",{cause:StatusCodes.notFound});
            }

            if("id" in user && "email" in user && "mob" in user){
                await cacheData("userData:"+("mob" in body ? user.mob : user.email), JSON.stringify(user));
                //@ts-ignore
                const userData = await JSON.parse(await redisClient.get("userData:"+("mob" in body ? user.mob : user.email)));
                console.log("Data from redis cleint")
                console.log(userData);
                if(userData.password != body.password){
                    throw new Error("Incorrect passwrod", {cause:StatusCodes.unauthorized});
                }
            }
        }else{
            user = userDataFromCache;
        }
        
        if("password" in user && "id" in user){
            console.log("Logged In successfully");
            console.log("userId: "+user?.id);
            const {password, ...userWithoutPass} = user;
            return {...userWithoutPass, mob:Number("mob" in userWithoutPass ?  userWithoutPass.mob : -1)};
        }
        throw new Error("Something went wrong while logging you in", {cause:StatusCodes.serviceUnavailable});
    }catch(err:any){
        console.log("Error occured in Model login_user.ts "+err.message);
        throw new Error(err.message, {cause:err.cause});
    }
}