import { BlogType } from "@repo/types";
import { getBlogsModel } from "../model/getBlogs";
import { lazy, useEffect, useState } from "react";
const Blogs = lazy(() => import("../components/blogs"));

const dummyBlogs:Array<BlogType> = []

export default function Dashoboard(){

    const [loading, setLoading] = useState<boolean>();
    const [data, setData] = useState<Array<BlogType> | string>([]);
    const [error, showError] = useState<boolean>(false);
    
    useEffect(()=>{
        const getBlogs = async () => {
            setLoading(true);
            const { data, status } = await getBlogsModel();
            console.log(`calling getBlogsModel: status=${status}`);
            console.log(data);
            if(status){
                setLoading(false);
                setData(data.result.posts);
                showError(false)
            }else{
                setLoading(true);
                setData(data);
                showError(true)
            }
        }
        getBlogs();
    },[]);

    if(loading){
        return(
            <div>
                Loading...
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