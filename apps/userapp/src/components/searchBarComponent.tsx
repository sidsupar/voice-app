import { SearchBar } from "@repo/ui/search-bar";
import { getBlogsModel } from "../model/getBlogs";
import { BlogType } from "@repo/types";
import { useNavigate } from "react-router";

export default function SearchBarComponent(){

    const navigate = useNavigate();
    function onClickHandler(searchName:string){
        navigate(`/auth/paginatedBlogs/${searchName}`);
    }

    return(
        <div className="">
            <SearchBar onClickHandler={onClickHandler} take={5} skip={0} onInputHandler={(input:string, skip:number, take:number)
            :Promise<{
                status:boolean,
                data:string | Array<BlogType>
            }> => {return getBlogsModel(input,skip,take)}} />
        </div>            
    )
}