import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function generateToken(userData:object){

    const privateSecretKey = process.env.TOKEN_PRIVATE_KEY as string;

    try{
        const token = jwt.sign(userData, privateSecretKey, {expiresIn:"10m"});
        console.log(`generateToken model called... Checking ${token}`);
        return token;
    }catch(err:any){
        console.log(err.message);
        return new Error(err.message);
    }

}