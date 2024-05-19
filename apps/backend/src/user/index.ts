//User
import express from "express";
import  authRouter  from "./routes/auth";
import  blogRouter  from "./routes/blogs";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/blog", blogRouter);

export default router;
