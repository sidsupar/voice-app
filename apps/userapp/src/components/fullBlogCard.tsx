import { BlogType } from "@repo/types";
import ShortBlogMetaData from "./shortBlogMetaData";

function BlogHeading({heading}:{heading:string}){

    return(
        <div className="">
            {heading}
        </div>
    )
}

function Desc({desc}:{desc:string}){

    return(
        <pre className="whitespace-pre-wrap">
            {desc}
        </pre>
    )
}

export default function FullBlogCard({blog}:{blog:BlogType}){


    return(
        <div className="p-2 grid grid-cols-12 gap-5 w-screen">
            <div className="bg-gray-200 flex flex-col items-center gap-5 rounded-md col-span-12 sm:col-span-8 shadow dark:bg-sky-950">
                <div className=" p-2 rounded-md font-sans font-bold text-xl border-b border-gray-900 dark:border-white dark:border-b ">
                    <BlogHeading heading={blog?.heading ?? "*&*"}/>
                </div>
                <div className="">
                    <Desc desc={blog?.desc ?? "*&&*"}/>
                </div>
            </div>
            
            <div className="col-span-12 sm:col-span-4 flex flex-col items-center justify-center h-[50vh]">
                <div className="p-1 shadow-lg rounded-md flex flex-col justify-center gap-2 bg-gray-200 dark:bg-sky-950">
                    <div className="font-sans text-sm flex flex-col items-center gap-2">
                        <div className="border-b w-full flex justify-center font-bold">
                            <div>
                                author                                                    
                            </div>
                        </div>
                        <div>
                            {blog?.author?.name}
                        </div>
                    </div>
                    <div className="font-sans text-sm flex flex-col items-center">
                        {blog?.author?.email}
                    </div>
                    <div className="">
                        <ShortBlogMetaData blog={blog}/>
                    </div>
                </div>
            </div>            
        </div>
    )

}