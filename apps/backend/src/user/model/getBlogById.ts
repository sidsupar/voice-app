import prisma from "@repo/db/config";
import { StatusCodes } from "@repo/types";

export default async function getBlogById(id: number){
    try{
        console.log(`getBlogById model called... id=${id}`);
        const blog = await prisma.posts.findFirst({
            where:{
                id:id
            },
            select:{
                heading:true,
                authorId:true,
                desc:true,
                dislikes:true,
                likes:true,
                images:true,
                publishDate:true,
                id:true,
                author:{
                    select:{
                        email:true,
                        name:true,                        
                    }
                }
            }
        });

        if(blog == null){
            throw new Error("Not able to fetch post", {cause:StatusCodes.notFound});
        }

        return {
            status:"success",
            message:"Fetched",
            post:blog
        }

    }catch(err:any){
        console.log(err.message);
        throw new Error(err.message, {cause:err.cause ?? StatusCodes.serviceUnavailable });
    }

}