import { BlogType, StatusCodes } from "@repo/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BLOG_ROUTE = import.meta.env.VITE_BLOG_ROUTE;

interface Data {
    status?:string,
    message?:string,
    post?:BlogType
}

export async function getBlogById(id:number){

    let data: Data = {};
    let status: boolean = true;

    try{
        const res = await axios.get(`${BASE_URL}/${BLOG_ROUTE}/getPost/${id}`);
        if(res.status != StatusCodes.ok){
            throw new Error("No blog found");
        }
        data = res.data.result;
        
        status = true;
    }catch(err: any){
        status = false;
        data = err.message;
        console.log(err);
    }
    return {status, data}
}