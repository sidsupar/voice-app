import { BlogType } from "@repo/types";
import axios from "axios";
import { useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BLOG_ROUTE = import.meta.env.VITE_BLOG_ROUTE;

export async function getBlogsModel(){

    let data: Array<BlogType> | string = [];
    let status: boolean = true;

    try{
        const res = await axios.get(`${BASE_URL}/${BLOG_ROUTE}/getPosts`);
        if(res.data.length < 0){
            throw new Error("No blogs fetched");
        }
        data = res.data;
        status = true;
    }catch(err: any){
        status = false;
        data = err.message;
        console.log(err);
    }
    return {status, data}
}