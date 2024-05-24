import { BlogType } from "@repo/types";
import AvatarComponent from "./avatarComponent";
import { useState } from "react";
import AuthorDetailsCard from "./authorDetailsCard";
import ShortBlogMetaData from "./shortBlogMetaData";
import ShortBlogData from "./shortBlogData";

export default function ShortBlogCard({blog}: {blog:BlogType}){
    const [showAuthorDetails, setShowAuthorDetails] = useState<boolean>(false);

    function showAuthorDetailsHandler(){
        setShowAuthorDetails(true);
    }

    function hideAuthorDetailsHandler(){
        setShowAuthorDetails(false);
    }

    return(
        <div className="flex flex-col items-start p-2 relative
                        border-[2px] w-full rounded-md mt-[1vh] 
                        shadow sm:w-[50vw] dark:border-sky-600
                        "
        >
            <div onMouseLeave={hideAuthorDetailsHandler} 
                 onMouseOver={showAuthorDetailsHandler} 
                 className="relative w-fit h-fit"
            >
                <AvatarComponent image="" 
                                 name={blog.author.name as string} 
                                 backgroundColor="gray" color="white" 
                                 fontStyle="serif" 
                                 size={32}/>
                {showAuthorDetails ? 
                    <div className="absolute bottom-[10vh] left-[2vw] "> 
                        <AuthorDetailsCard author={blog.author}/> 
                    </div> : null}
            </div>
            <div className="w-fit border-[2px] p-1 flex flex-col
                            justify-start rounded-md md:gap-2
                            shadow
                            dark:border-sky-600 ">
                <div className="">
                    <ShortBlogData heading={blog.heading as string} desc={blog.desc as string}/>
                </div>
                <div className="flex flex-col justify-center md:w-[50%]">
                    <div className="flex flex-col justify-center">
                        <ShortBlogMetaData blog={blog}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

