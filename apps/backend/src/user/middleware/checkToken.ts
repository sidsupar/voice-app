import { StatusCodes } from "@repo/types";
import dotenv from "dotenv";
import  jwt from "jsonwebtoken";

dotenv.config();

export async function checkToken(req:any, res:any, next:(err?:any) => void){
    const secretPublicKey = process.env.TOKEN_PRIVATE_KEY as string;
    try{
        const token = req.cookies?.voiceToken;
        console.log(`checkToken middleware called... Checking ${token}`);
        // console.log(`token recieved from cookie = ${token} + secretKey=${secretPublicKey}`);
        //Checking user jwt
        jwt.verify(token, secretPublicKey);
        return next();
        
    }catch(err:any){
        console.log(err.message);
        //@ts-ignore
        res.status(StatusCodes.forbidden).json({
            error:err.message
        });
        next(err);
    }

}