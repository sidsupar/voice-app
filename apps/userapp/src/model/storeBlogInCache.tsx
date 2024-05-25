import { BlogType } from "@repo/types";
import { storeBlog } from "../globalStates/blogsSlice";
import { store } from "../globalStates/store";

export default async function StoreBlogInCache(blog:BlogType){

    try{
        await store.dispatch(storeBlog(blog));
    }catch(err){
        console.log(err);
    }

}