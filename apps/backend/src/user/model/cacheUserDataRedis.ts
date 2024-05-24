import { StatusCodes } from "@repo/types";
import { redisClient } from "../..";

export default async function cacheData(key:string, data:string ){

    try{
        return await redisClient.set(key, data, {
            EX:300,
            NX:true
        });
    }catch(err: any){
        throw new Error(err.message, {cause:StatusCodes.serviceUnavailable});
    }

}