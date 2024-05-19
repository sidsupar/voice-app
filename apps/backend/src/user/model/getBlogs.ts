import prisma from "@repo/db/config";
import { StatusCodes } from "@repo/types";

export default async function getBlogs(skip:number = 0, take:number = 10): Promise<{
                                                                        status:string,
                                                                        message:string,
                                                                        cause?:number
                                                                        posts?:object[]
                                                                    }>
{
    try{
        console.log(`getBlogs model called... skip=${skip} and take=${take}`);
        const blogs = await prisma.posts.findMany({
            where:{},
            orderBy:{
                publishDate:"desc"
            },
            skip:skip,
            take:take
        });

        if(blogs.length < 1){
            throw new Error("Not able to fetch posts", {cause:StatusCodes.notFound});
        }

        return {
            status:"success",
            message:"Fetched",
            posts:blogs
        }

    }catch(err:any){
        console.log(err.message);
        return {
            status:"error",
            message:err.message,
            cause:err.cause
        }
    }

}