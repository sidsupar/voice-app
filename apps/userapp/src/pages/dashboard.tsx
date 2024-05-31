import { BlogType } from "@repo/types";
import { getBlogsModel } from "../model/getBlogs";
import { lazy, useDeferredValue, useEffect, useState } from "react";
import ProgressBar from "../components/progressbar";
import setProgressStep from "../model/setProgressStepValue";
const Blogs = lazy(() => import("../components/blogs"));

// const dummyBlogs:Array<BlogType> = []

export default function Dashoboard(){
    const [loading, setLoading] = useState<boolean>();
    const [data, setData] = useState<Array<BlogType> | string>([]);
    const [error, showError] = useState<boolean>(false);
    const [progress, setProgress] = useState<{step:number, totalSteps:number}>({step:0, totalSteps:0});
    
    useEffect(()=>{
        const getBlogs = async () => {
            setLoading(true);
            await setProgressStep(0, 4, 100, setProgress);
            await setProgressStep(1, 4, 100, setProgress);
            const { data, status } = await getBlogsModel();
            await setProgressStep(2, 4, 100, setProgress);
            await setProgressStep(3, 4, 100, setProgress);
            
            console.log(`calling getBlogsModel: status=${status}`);
            
            console.log(data);
            if(status){
                setData(data.result.posts);
                showError(false)
                await setProgressStep(4, 4, 100, setProgress);
                await new Promise((res)=>setTimeout(() => res(true),100));
                setLoading(false);
            }else{
                await setProgressStep(4, 4, 100, setProgress);
                await new Promise((res)=>setTimeout(() => res(true),100));

                setLoading(true);
                setData(data);
                showError(true)
            }
            
        }
        getBlogs();
    },[]);

    if(loading){
        
        return(
            <div className="flex justify-center items-center">
                <div className="w-[80%] h-[5vh]">
                    <ProgressBar step={progress.step} totalSteps={progress.totalSteps} />
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                {!error ?
                    <div className="">
                        <Blogs blogs={data}/>
                    </div>:
                    <div className="text-red-500">
                        <div>
                            Error Occured:
                        </div>
                        <div>
                            {JSON.stringify(data)}
                        </div>
                    </div>
                }
            </div>
        </>
    )
}