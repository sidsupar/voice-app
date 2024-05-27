import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router"
import { getBlogsModel } from "../model/getBlogs";
import { BlogType } from "@repo/types";
import Blogs from "../components/blogs";

export default function PaginatedBlogs(){

    const [blogs, setBlogs] = useState<Array<BlogType>>();
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<{
        page:number,
        skip:number
    }>({
        page:1,
        skip:0
    });
    // const [page, setPage] = useState<number>(1);
    // const location = useLocation();
    const params = useParams();
    let searchName = ""
    if("searchName" in params){
         searchName = params.searchName as string;
    }
    // console.log(`in paginatedBlogs`);
    // console.log(params)
    // console.log(location.state.searchName)

    useEffect(()=>{
        const gettingBlogsForSearch = async ()=>{
            setLoading(true);
            try{
                const result = await getBlogsModel(searchName ?? "", show.skip, 5);

                if(result.status === false){
                    throw new Error("Not able get blogs from getBlogsModel in PaginatedBlogs effect");
                }
                if(result.data != undefined && "posts" in result?.data){
                    console.log("Setting blogs inside PaginatedBlogs after fetch");
                    setBlogs(result?.data?.posts);
                }
                setLoading(false);
            }catch(err:any){
                setLoading(false);
                console.log("Error occured in effect of PaginatedBlogs: "+err.message);
            }
        }
        gettingBlogsForSearch();
    },[show.skip, searchName]);

    function onClickNext(e:React.SyntheticEvent){
        const tgt = e.target as HTMLInputElement;
        console.log("next")
        setShow((sh:{page:number, skip:number}) => {    
                                                        return {...sh, 
                                                                page:(sh.page + 1), 
                                                                skip:(sh.page)*5
                                                            }
                                                }
        );
    }   
    function onClickPrev(e:React.SyntheticEvent){
        console.log("prev")
        const tgt = e.target as HTMLInputElement;
        setShow((sh:{page:number, skip:number}) => {
                                                        let newPage = sh.page;
                                                        let newSkip = sh.skip;
                                                        if(sh.page - 1 <= 1){
                                                            newPage = 1;
                                                            newSkip = (newPage - 1) * 5;
                                                        }else{
                                                            newPage = sh.page - 1;
                                                            newSkip = (newPage - 1) * 5;
                                                        }
                                                         return {...sh,
                                                                page:newPage,
                                                                skip:newSkip
                                                            }
                                                }
        )
    }
    if(loading){
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div className="flex flex-col items-center">
            <div>
                <Blogs blogs={blogs as BlogType[]}/>
            </div>
            <div className="flex justify-between w-[10%]">
                <div onClick={onClickPrev}  className="p-2 cursor-pointer shadow 
                                focus:ring-offset-2 focus:ring-2 
                                border-[2px] rounded-md 
                                bg-gray-800 dark:bg-sky-600 text-white
                                ">
                    prev                        
                </div>
                <div className="shadow p-2 focus:ring-offset-2 
                                focus:ring-2 border-[2px] 
                                rounded-md bg-gray-800 text-white
                                dark:bg-sky-600">
                    page:{show.page}
                </div>
                <div onClick={onClickNext} className="cursor-pointer p-2 shadow 
                                focus:ring-offset-2 
                                focus:ring-2 border-[2px] 
                                rounded-md bg-gray-800 text-white
                                dark:bg-sky-600">
                    next
                </div>
            </div>
        </div>
    )
}