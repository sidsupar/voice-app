import { StatusCodes } from "@repo/types";

export async function checkUserLogin(req:Express.Request, res:Express.Response, next:(err?:any) => void){

    try{
        console.log(`checkUserLogin middleware called ...`);
        //Checking user sesson object
        if("userData" in req.session){
            console.log(`checking ${Object.entries(req.session?.userData ?? {})}`);
            return next();
        }
        throw new Error("User not logged in", {cause:StatusCodes.forbidden});
    }catch(err:any){
        console.log(err.message);
        //@ts-ignore
        res.status(StatusCodes.forbidden).json({
            error:err.message
        });
        // next(err);
    }

}