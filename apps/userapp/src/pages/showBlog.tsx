import { BlogType } from "@repo/types";
import { lazy, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useLocation } from "react-router"
import { getBlogById } from "../model/getBlogById";
const FullBlogCard = lazy(() => import("../components/fullBlogCard"));

export default function ShowBlog(){
    const [blog, setBlog] = useState<BlogType>();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const {blogId:id} = location.state;
    console.log(`blog with blogId = ${id} requested in location object = ${location.state.blodId}`);

    console.log("ShowBlog called");

    useEffect(function ( ){
        setLoading(true);
        console.log("calling getBlogById--------------------------")
        const getBlog = async ()=>{
            try{
                const {status, data} = await getBlogById(id);
                console.log(data)
                console.log(data.post)
                if(!status){
                    throw new Error("Not able to fetch blog")    
                }                
                if("post" in data){
                    setBlog(data.post)
                    setLoading(false)
                }
            }catch(err){
                setLoading(false);
            }            
        }
        getBlog();
    },[id]);

    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }

    return(
        <div>
            <FullBlogCard blog={blog as BlogType}/>
        </div>
    )
}