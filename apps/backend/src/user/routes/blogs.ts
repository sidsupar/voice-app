//User
import express from "express";
import { StatusCodes, UserSignUp, postBody } from "@repo/types";
import { checkUserLogin } from "../middleware/checkUserLogin";
import prisma from "@repo/db/config";
import jwt from "jsonwebtoken";
import getBlogs from "../model/getBlogs";
import { checkToken } from "../middleware/checkToken";
import { PostBody } from "@repo/types";
import storePostData from "../model/storePostData";
import getBlogById from "../model/getBlogById";
const router = express.Router();
//api/v1/user/blog
//All routes int this handler are authenticated routes
router.use(checkUserLogin, checkToken);

router.post("/writePost" , async(req, res) => {

    try{
        const token = req.cookies?.voiceToken;
        const userData = jwt.decode(token);
        const blogData = postBody.safeParse(req.body);

        if(!blogData.success){
            throw new Error("Invalid blog formatting", {cause:StatusCodes.invalidInput});
        }
        const blog = blogData.data;

        const result = await storePostData(blog, userData as UserSignUp);

        // if(result.status =="error" && "error" in result){
        //     throw new Error(result.message + " : " + result.error, {cause:result.cause});
        // }

        res.status(StatusCodes.created).json({
            blogId:result.blogId,
            blogHeading:result.blogHeading
        });

    }catch(err: any){
        console.log(err.message);
        res.status(err.cause).json({
            error:err.message
        });
    }

});


router.get("/getPosts/:searchInput?/:skip?/:take?", async (req, res) => {

    try{
        console.log(`searchName=${req.params?.searchInput} skip=${req.params?.skip} take=${req.params?.take}`)
        const skip = ("skip" in req.params) && (req.params.skip != undefined) ? Number(req.params.skip) : 0;
        const take = ("take" in req.params) && (req.params.take != undefined) ? Number(req.params.take): 10;
        const searchName = ("searchInput" in req.params) && (req.params.searchInput != undefined) ? String(req.params.searchInput) : "";
        console.log(`searchName=${searchName} skip=${skip} take=${take}`)
        const result = await getBlogs(searchName, skip, take);

        // if(result.status == "error" || "cause" in result){
        //     throw new Error(result.message, {cause:result.cause});
        // }

        res.status(StatusCodes.ok).json({
            result
        });        

    }catch(err: any){
        res.status(err.cause).json({
            error:err.message
        });       
    }

});

router.get("/getPost/:id", async (req, res) => {

    try{
        const blogId = Number(req.params.id);
        console.log(`blog with id:${blogId} requested`);
        const result = await getBlogById(blogId);

        // if(result.status == "error" || "cause" in result){
        //     throw new Error(result.message, {cause:result.cause});
        // }

        res.status(StatusCodes.ok).json({
            result
        });        

    }catch(err: any){
        res.status(err.cause).json({
            error:err.message
        });       
    }

});


export default router;
