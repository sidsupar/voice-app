import { SearchBar } from "@repo/ui/search-bar";
import { getBlogsModel } from "../model/getBlogs";
import { BlogType } from "@repo/types";

export default function SearchBarComponent(){

    return(
        <div className="">
            <SearchBar take={5} skip={0} onInputHandler={(input:string, skip:number, take:number)
            :Promise<{
                status:boolean,
                data:string | Array<BlogType>
            }> => {return getBlogsModel(input,skip,take)}} />
        </div>            
    )
}