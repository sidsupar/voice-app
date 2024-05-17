//User
import express from "express";
import { UserSignUp, UserSignIn, userSignIn, userSignUp } from "@repo/types";
import { StatusCodes } from "@repo/types";
import { registerUser } from "./model/registration";
const router = express.Router();

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

})

export default router;
