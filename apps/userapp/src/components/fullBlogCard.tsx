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
        <div className="grid grid-cols-12">
            <div className="flex flex-col col-span-8">
                <div className="">
                    <BlogHeading heading={blog?.heading ?? "*&*"}/>
                </div>
                <div className="">
                    <ShortBlogMetaData blog={blog}/>
                </div>
                <div className="">
                    <Desc desc={blog?.desc ?? "*&&*"}/>
                </div>
            </div>
            <div className="col-span-1">

            </div>
            <div className="col-span-3">
                <div className="flex flex-col justify-center">
                    <div className="">
                        {blog?.author?.name}
                    </div>
                    <div className="">
                        {blog?.author?.email}
                    </div>
                </div>
            </div>            
        </div>
    )

}