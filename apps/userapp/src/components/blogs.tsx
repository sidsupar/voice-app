import { BlogType } from "@repo/types";
import ShortBlogCard from "./shortBlogCard";
import { Link } from "react-router-dom";

export default function Blogs({blogs}: {blogs:Array<BlogType>}){

    return(
        <div className="grid grid-cols-12">
            <div className="col-span-2">

            </div>
            <div className="col-span-8 w-full flex flex-col
                            items-center mt-[1vh] 
                            mb-[1vh] border-[2px] rounded-md shadow
                            md:p-2 dark:border-sky-600">
                {blogs.map((blog:BlogType, index)=>{

                    return(
                        <div key={"blogCard-"+index}>
                            <Link to={`/auth/blog`} 
                                  state={{
                                    blogId:blog?.id
                                  }}
                            >
                                <div className="">
                                    <ShortBlogCard blog={blog}/>
                                </div>
                            </Link>                                    
                        </div>    
                    )
                })}
            </div>
            <div className="col-span-2">
                
            </div>
        </div>
    )
}