import prisma from "@repo/db/config";
import { StatusCodes } from "@repo/types";

export default async function getBlogs(searchName:string = "", skip:number = 0, take:number = 10): Promise<{
                                                                        status:string,
                                                                        message:string,
                                                                        cause?:number
                                                                        posts?:object[]
                                                                    }>
{
    try{
        console.log(`getBlogs model called... skip=${skip} and take=${take}`);
        const blogs = await prisma.posts.findMany({
            where:{
                OR:[
                    {
                        heading:{
                            contains:searchName,
                            mode:"insensitive"
                        }
                    },
                    {
                        desc:{
                            contains:searchName,
                            mode:"insensitive"
                        }
                    }
                ]
            },
            select:{
                author:{
                    select:{
                        email:true,
                        id:true,
                        name:true
                    }      
                },
                authorId:true,
                desc:true,
                heading:true,
                dislikes:true,
                id:true,
                images:true,
                publishDate:true,
                likes:true
            },
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
        throw new Error(err.message, {cause:err.cause ?? StatusCodes.serviceUnavailable });
    }

}