import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { StatusCodes } from "@repo/types";

dotenv.config();

export async function generateRefreshToken(userData:object){

    const privateSecretKey = process.env.TOKEN_PRIVATE_KEY as string;

    try{
        const token = jwt.sign(userData, privateSecretKey, {expiresIn:"10d"});
        console.log(`generateRefreshToken model called... Checking ${token}`);
        // console.log(`refreshToken while signing in = ${token}`)
        return token;
    }catch(err:any){
        console.log(`error occured in generating refreshToken:${err.message}`);
        throw new Error(err.message);
    }

}