import { TextAreaSizeable } from "@repo/ui/texte-area-sizeable";
import React, { useEffect, useState } from "react";
import writePost from "../model/writePost";
import { InputSizeable } from "@repo/ui/input-sizeable";
import { useNavigate } from "react-router";
import { StatusCodes } from "@repo/types";

export default function WriteComponent(){

    const [blog, setBlog] = useState<string>();
    const [heading, setHeading] = useState<string>();
    const [clicked, setClicked] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(clicked){
            const writePostMethod = async () => {
                if(blog != undefined && blog?.length > 0 && heading != undefined && heading?.length > 0){
                    console.log("Calling writePost");
                    const res = await writePost(blog, heading);
                    //@ts-ignore
                    if("status" in res && res?.status == StatusCodes.created){
                        console.log("Written successfully");
                        //@ts-ignore
                        console.log(res.data.id);
                        navigate("/auth/dashboard");
                    }else{
                        console.log(res)
                    }
                    
                    setClicked(false);
                }
            }
            writePostMethod()
        }
    },[clicked])

    function onClickHandler(e:React.SyntheticEvent){
        const tgt = e.target as HTMLInputElement;
        console.log(tgt);
        setClicked((val:boolean) => !val);
    }

    function onInputDescHandler(e:React.SyntheticEvent){
        const tgt = e.target as HTMLInputElement;
        setBlog(tgt.value);
    }

    function onInputHeadingHandler(e:React.SyntheticEvent){
        const tgt = e.target as HTMLInputElement;
        setHeading(tgt.value);
    }

    console.log(blog);

    return(
        <div className="flex flex-col gap-2 mt-5 items-center">
            <div className="">
                <InputSizeable bgColor={"bg-white dark:bg-gray-600"}
                               onInputHandler={onInputHeadingHandler} width={"80vw"} padding="5"  
                               type="text" 
                />
            </div>
            <div className="w-fit h-fit">
                <TextAreaSizeable bgColor={"bg-white dark:bg-gray-600"} padding={"5px"} width={"80vw"} height={"60vh"} onInputHandler={onInputDescHandler}/>
            </div>
            <div className="">
                <button onClick={onClickHandler} className="rounded-md pl-4 pr-4 pt-2 pb-2 bg-green-700 cursor-pointer text-white">
                    post
                </button>
            </div>
        </div>
    )
}