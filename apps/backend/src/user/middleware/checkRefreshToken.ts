import { StatusCodes } from "@repo/types";
import  jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function checkRefreshToken(req:any, res:any, next:(err?:any) => void){
    const secretPublicKey = process.env.TOKEN_PRIVATE_KEY as string;
    try{    
        // const token = req.headers.refreshToken.toString();
        const token = req.cookies?.voiceRefreshToken.toString();
        console.log(`checkRefreshToken middleware called... Checking ${token}`);
        // console.log(`refreshToken = ${token}`);
        //Checking user jwt
        jwt.verify(token, secretPublicKey);
        return next();
        
    }catch(err:any){
        console.log(err.message);
        //@ts-ignore
        res.status(StatusCodes.unauthorized).json({
            error:err.message
        });
        // next(err);
    }

}