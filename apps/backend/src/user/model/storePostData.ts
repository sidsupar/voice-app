import prisma from "@repo/db/config";
import { PostBody, StatusCodes, UserSignUp } from "@repo/types";

export default async function storePostData(blog:Partial<PostBody>, userData:Partial<UserSignUp>): Promise<{
                message:string,
                blogId?:number,
                blogHeading?:string,
                status:string,
                error?:string,
                cause?:number,
}>{

    try{
        if("id" in userData){
            const blogData = {
                ...blog,
                likes:0,
                dislikes:0,
                publishDate:new Date(Date.now()),
                authorId:userData?.id 
            }
            const res = await prisma.posts.create({
                //@ts-ignore
                data: blogData,
                select:{
                    id:true,
                    heading:true
                }
            });
            return {
                message:"Blog created successfully",
                blogId:res.id,
                blogHeading: res.heading ?? undefined,
                status:"success"
            }
        }
        throw new Error("Id not found in userData: ", {cause:StatusCodes.forbidden})
    }catch(err:any){
        console.log(err.message);
        return {
            message:"Blog not created",
            status:"error",
            error:err.message,
            cause:err.cause
        }
    }

}