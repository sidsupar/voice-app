import { StatusCodes } from "@repo/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USER_ROUTE = import.meta.env.VITE_USER_ROUTE;

export default async function updateDislikeMethod(blogId:number, operation: "inc" | "dec"){

    try{
        const res = await axios.get(`${BASE_URL}/${USER_ROUTE}/dislikeBlog/${blogId}/${operation}`);

        if(res.status == StatusCodes.conflict){
            throw new Error("Not able to like");
        }
    }catch(err:any){
        console.log("Error occured in updateLikeModel")
        console.log(err.message)
    }

}