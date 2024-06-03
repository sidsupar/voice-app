import { BlogType, StatusCodes } from "@repo/types";
import axios from "axios";
import { getStoreState } from "../globalStates/store";
import StoreBlogInCache from "./storeBlogInCache";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BLOG_ROUTE = import.meta.env.VITE_BLOG_ROUTE;

interface Data {
    status?:string,
    message?:string,
    post?:BlogType
}

export async function getBlogById(id:number){
    console.log("getBlogById called")
    const blogs = getStoreState().blogs
    let data: Data = {};
    let status: boolean = true;

    try{
        const checkBlogInBlogs = blogs.find(blogObj => blogObj.id == id);
        console.log(checkBlogInBlogs)
        if(checkBlogInBlogs){
            console.log(`Blog with id ${id} is already in cache`);
            const result = {
                status:"success",
                message:"blog already in cache",
                post: checkBlogInBlogs
            }
            status=true;
            data = result;
        }else{
            console.log(`Making call to backend for blog with id ${id}`)
            const res = await axios.get(`${BASE_URL}/${BLOG_ROUTE}/getPost/${id}`);
            if(res.status != StatusCodes.ok){
                throw new Error("No blog found");
            }
            data = res.data.result;
            await StoreBlogInCache(data.post as BlogType);
            status = true;
        }
        
    }catch(err: any){
        console.log("Error occured in getBlogById model")
        status = false;
        data = err.message;
        console.log(err);
    }
    console.log("Returning status and data from getBlogById");
    return {status, data}
}