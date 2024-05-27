import { BlogType, PostBody, StatusCodes } from "@repo/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BLOG_ROUTE = import.meta.env.VITE_BLOG_ROUTE;

export default async function writePost(blog:string, heading:string){
    const postBody:PostBody = {
        desc:blog,
        heading:heading,
        dislikes:0,
        images:"",
        likes:0
    }
    /*
                message:"Blog created successfully",
                blogId:res.id,
                blogHeading: res.heading ?? undefined,
                status:"success"
    */
    try{
        const res = await axios.post(`${BASE_URL}/${BLOG_ROUTE}/writePost`, postBody);

        if(res.status == StatusCodes.created){
            return res
        }
        throw new Error(res.data)
    }catch(err){
        console.log(err)
        return err;
    }

}