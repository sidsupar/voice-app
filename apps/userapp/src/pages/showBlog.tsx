import { BlogType } from "@repo/types";
import { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router"
import { getBlogById } from "../model/getBlogById";
import setProgressStep from "../model/setProgressStepValue";
import ProgressBar from "../components/progressbar";
const FullBlogCard = lazy(() => import("../components/fullBlogCard"));

export default function ShowBlog(){
    const [blog, setBlog] = useState<BlogType>();
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();
    const [progress, setProgress] = useState({step:0, totalSteps:0});
    const {blogId:id} = location.state;
    console.log(`blog with blogId = ${id} requested in location object = ${location.state.blodId}`);

    console.log("ShowBlog called");

    useEffect(function ( ){
        setLoading(true);
        setProgressStep(0,6, 0, setProgress);
        console.log("calling getBlogById from showBlog--------------------------")
        setProgressStep(1,6, 0, setProgress);

        const getBlog = async ()=>{
            try{
                const {status, data} = await getBlogById(id);
                setProgressStep(3, 6 , 0, setProgress);
                console.log(data)
                console.log(data.post)
                setProgressStep(4, 6, 0, setProgress);
                if(!status){
                    throw new Error("Not able to fetch blog")    
                }                
                if("post" in data){
                    setProgressStep(5,6, 0, setProgress);
                    setBlog(data.post)
                    setProgressStep(6,6, 0, setProgress);
                    setLoading(false)
                }
            }catch(err){
                setProgressStep(6,6, 0, setProgress);
                setLoading(false);
            }            
        }
        setProgressStep(2,7, 0, setProgress);
        getBlog();
    },[id]);

    if(loading){
        return(
            <div>
                <ProgressBar step={progress.step} totalSteps={progress.totalSteps} />
            </div>
        )
    }

    return(
        <div>
            <FullBlogCard blog={blog as BlogType}/>
        </div>
    )
}