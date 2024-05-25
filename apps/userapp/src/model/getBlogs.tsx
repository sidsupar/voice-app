import { BlogType } from "@repo/types";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BLOG_ROUTE = import.meta.env.VITE_BLOG_ROUTE;

export async function getBlogsModel(searchName?:string, skip?:number, take?:number){

    let data: Array<BlogType> | string = [];
    let status: boolean = true;
    console.log(`searchName=${searchName} skip=${skip} take=${take}`)
    try{
        if("recentFeed" in localStorage){

        }
        if((searchName == undefined || searchName == null) && take == undefined){
            console.log("Calling for blogs in bulk");
            const res = await axios.get(`${BASE_URL}/${BLOG_ROUTE}/getPosts`);
            if(res.data.length < 0){
                throw new Error("No blogs fetched");
            }
            data = res.data;
            status = true;
        }else{
            console.log("Calling selected seacrh for blogs in bulk");
            const res = await axios.get(`${BASE_URL}/${BLOG_ROUTE}/getPosts/${searchName}/${skip}/${take}`);
            if(res.data.length < 0){
                throw new Error("No blogs fetched");
            }
            data = res.data.result;
            status = true;
        }
        
    }catch(err: any){
        status = false;
        data = err.message;
        console.log(err);
    }
    return {status, data}
}