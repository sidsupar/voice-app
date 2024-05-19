//User
import express from "express";
import { UserSignUp, UserSignIn, userSignIn, userSignUp } from "@repo/types";
import { StatusCodes } from "@repo/types";
import { registerUser } from "../model/registration";
import { loginUser } from "../model/login_user";
import { checkUserLogin } from "../middleware/checkUserLogin";
import { generateToken } from "../model/generateToken";
import jwt from "jsonwebtoken";
import { checkRefreshToken } from "../middleware/checkRefreshToken";
import { generateRefreshToken } from "../model/generateRefreshToken";
import prisma from "@repo/db/config";

const router = express.Router();

//api/v1/user/auth

//Signing up user
router.post("/signup",async (req, res)=>{

    try{

        const bodyData = userSignUp.safeParse(req.body);
        if(!bodyData.success){
            const errCode = StatusCodes.invalidInput;
            throw new Error(bodyData.error.toString(), {cause:errCode});
        }
        const body: UserSignUp = bodyData.data;
        //calling model registerUser
        const user = await registerUser(body);

        if("code" in user && "message" in user){
            switch(user.code){
                case "P2002": 
                    throw new Error("A user with same credentials already exists");
                    break;
                default: throw new Error("Something went wrong in registerUser"+user?.message);
            }
        }
        console.log("user: ");
        console.log(user);

        res.status(StatusCodes.created).json({
            user,
            msg:"User registered successfully"
        });

    }catch(err: any){
        if(err.message == StatusCodes.invalidInput.toString()){
            console.log(err.message);
            res.status(StatusCodes.invalidInput).send({
                error:err.message
            });
        }else if(err.message == StatusCodes.serviceUnavailable.toString()){
            console.log(err.message);
            res.status(StatusCodes.serviceUnavailable).json({
                error:err.message
            });            
        }else{
            console.log(err.message);
            res.status(StatusCodes.serviceUnavailable).json({
                error:err.message
            });
        }        
    }

});

//Logging in the user
router.post("/signin",async (req, res)=>{

    try{
        const bodyData = userSignIn.safeParse(req.body);

        if(!bodyData.success){
            const errCode = StatusCodes.invalidInput;
            throw new Error(bodyData.error.toString(), {cause:errCode});
        }

        const body: UserSignIn = bodyData.data;

        //calling model loginUser
        const user = await loginUser(body);

        if("code" in user && "message" in user){
            switch(user.code){
                default: throw new Error("Something went wrong in registerUser"+user?.message);
            }
        }

        console.log("user: ");
        console.log(user);
        const userData = {...user};
        //@ts-ignore
        req.session.userData = userData;

        const token = await generateToken(userData);
        const refreshToken = await generateRefreshToken({id: userData.id});
        res.cookie("voiceRefreshToken", refreshToken);
        res.cookie("voiceToken", token);
        res.status(StatusCodes.accepted).json({
            user,
            token,
            msg:"User logged In successfully"
        });

    }catch(err: any){
        if(err.message == StatusCodes.invalidInput.toString()){
            console.log(err.message);
            res.status(StatusCodes.invalidInput).send({
                error:err.message
            });
        }else if(err.message == StatusCodes.serviceUnavailable.toString()){
            console.log(err.message);
            res.status(StatusCodes.serviceUnavailable).json({
                error:err.message
            });            
        }else{
            console.log(err.message);
            res.status(StatusCodes.serviceUnavailable).json({
                error:err.message
            });
        }      
    }
});

//Generating refresh token
router.post("/refreshToken", checkRefreshToken, async (req, res)=>{

    try{
        // const refreshToken = req.headers?.refreshToken as string;
        const refreshToken = req.cookies.voiceRefreshToken;
        const refreshTokenData = jwt.decode(refreshToken) as object;

        console.log(`refreshTokenData = ${Object.entries(refreshTokenData)}`);
        console.log(`refreshTokenData = ${Object.entries(refreshTokenData)}`);
        console.log(`user with id ${refreshTokenData?.id} requested new token`);
        const relevantTokenData: {id:number} = {
            id:refreshTokenData?.id
        }

        //setting up new token data
        let newToken = "";
        try{
            const user = await prisma.user.findFirst({
                where:{
                    id: relevantTokenData?.id
                },
                select:{
                    id:true,
                    mob:true,
                    email:true,
                    address:true,
                    name:true
                }
            });
            // console.log("User refreshToken data fetched : ")
            // console.log(user);
            if(!(user != null && "id" in user)){
                throw new Error("Tampered user id in refresh token",{cause:StatusCodes.forbidden});
            }
            const userData = {...user, mob:Number(user.mob)}

            newToken = await generateToken(userData);
            res.cookie("voiceToken", newToken);
        }catch(err:any){
            console.log(err.message);
            throw new Error(err.message, {cause:err.cause});
        }
        
        const newRefreshToken = await generateRefreshToken(relevantTokenData);
        //@ts-ignore
        req.session.userData = relevantTokenData;
        res.cookie("voiceRefreshToken", newRefreshToken);
        res.status(StatusCodes.accepted).json({
            newToken,
            newRefreshToken,
            msg:"User Token generated successfully"
        });

    }catch(err: any){
        if(err.message == StatusCodes.invalidInput.toString()){
            console.log(err.message);
            res.status(StatusCodes.invalidInput).send({
                error:err.message
            });
        }else if(err.message == StatusCodes.serviceUnavailable.toString()){
            console.log(err.message);
            res.status(StatusCodes.serviceUnavailable).json({
                error:err.message
            });            
        }else{
            console.log(err.message);
            res.status(StatusCodes.serviceUnavailable).json({
                error:err.message
            });
        }        
    }

});

router.get("/logout", async (req, res) => {

    try{

        req.session.destroy(()=>{
            res.cookie("voiceToken", null);
            res.cookie("voiceRefreshToken", null);
            res.status(StatusCodes.accepted).json({
                status:"success",
                message:"Logout successful"
            })
        });

    }catch(err:any){
        res.status(StatusCodes.serviceUnavailable).json({
            status:"error",
            error:err.message,
            message:"Not able to logyou out. Please try again"
        })
    }

})
export default router;
